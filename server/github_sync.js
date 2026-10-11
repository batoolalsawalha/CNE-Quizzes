/**
 * CNE Quizzes - GitHub Persistence & Cloud Sync
 * Automatically persists data/database.json to the GitHub repository so no edits
 * are ever lost when Render or other ephemeral containers restart.
 */

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'database.json');

class GitHubSyncManager {
  constructor() {
    this.token = (process.env.GITHUB_TOKEN || '').trim();
    this.repo = (process.env.GITHUB_REPO || 'batoolalsawalha/CNE-Quizzes').trim();
    this.branch = (process.env.GITHUB_BRANCH || 'main').trim();

    this.status = this.token ? 'idle' : 'disabled';
    this.lastSync = null;
    this.lastError = null;
    this.debounceTimer = null;
    this.isSyncing = false;
  }

  isConfigured() {
    return Boolean(this.token);
  }

  getStatus() {
    return {
      enabled: this.isConfigured(),
      status: this.status,
      lastSync: this.lastSync,
      lastError: this.lastError,
      repo: this.repo,
      branch: this.branch
    };
  }

  getHeaders() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'User-Agent': 'CNE-Quizzes-Sync',
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    };
  }

  /**
   * Schedule debounced commit (waits 5 seconds after the last edit)
   */
  schedulePush(delayMs = 5000) {
    if (!this.isConfigured()) return;
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.status = 'pending';
    this.debounceTimer = setTimeout(() => {
      this.pushNow().catch(err => {
        console.error('[GitHubSync] Push failed:', err.message);
      });
    }, delayMs);
  }

  /**
   * Commits the current data/database.json directly to GitHub using Git Data API
   */
  async pushNow() {
    if (!this.isConfigured()) return { success: false, reason: 'not_configured' };
    if (this.isSyncing) return { success: false, reason: 'already_syncing' };

    this.isSyncing = true;
    this.status = 'syncing';
    this.lastError = null;

    try {
      if (!fs.existsSync(DB_PATH)) {
        throw new Error('Database file does not exist locally');
      }

      const fileContent = fs.readFileSync(DB_PATH, 'utf-8');

      // 1. Create Git Blob
      const blobRes = await fetch(`https://api.github.com/repos/${this.repo}/git/blobs`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          content: fileContent,
          encoding: 'utf-8'
        })
      });
      if (!blobRes.ok) {
        const err = await blobRes.json().catch(() => ({}));
        throw new Error(`Failed to create blob: ${err.message || blobRes.statusText}`);
      }
      const blobData = await blobRes.json();
      const blobSha = blobData.sha;

      // 2. Get latest commit SHA on branch
      const refRes = await fetch(`https://api.github.com/repos/${this.repo}/git/ref/heads/${this.branch}`, {
        headers: this.getHeaders()
      });
      if (!refRes.ok) {
        const err = await refRes.json().catch(() => ({}));
        throw new Error(`Failed to get ref: ${err.message || refRes.statusText}`);
      }
      const refData = await refRes.json();
      const latestCommitSha = refData.object.sha;

      // 3. Get tree of the latest commit
      const commitRes = await fetch(`https://api.github.com/repos/${this.repo}/git/commits/${latestCommitSha}`, {
        headers: this.getHeaders()
      });
      if (!commitRes.ok) {
        const err = await commitRes.json().catch(() => ({}));
        throw new Error(`Failed to get commit tree: ${err.message || commitRes.statusText}`);
      }
      const commitData = await commitRes.json();
      const baseTreeSha = commitData.tree.sha;

      // 4. Create new tree with updated database.json
      const treeRes = await fetch(`https://api.github.com/repos/${this.repo}/git/trees`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          base_tree: baseTreeSha,
          tree: [
            {
              path: 'data/database.json',
              mode: '100644',
              type: 'blob',
              sha: blobSha
            }
          ]
        })
      });
      if (!treeRes.ok) {
        const err = await treeRes.json().catch(() => ({}));
        throw new Error(`Failed to create tree: ${err.message || treeRes.statusText}`);
      }
      const treeData = await treeRes.json();
      const newTreeSha = treeData.sha;

      // 5. Create new commit with [skip render] [skip ci]
      const newCommitRes = await fetch(`https://api.github.com/repos/${this.repo}/git/commits`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          message: `chore(data): auto-sync database from admin panel [skip render] [skip ci]`,
          tree: newTreeSha,
          parents: [latestCommitSha]
        })
      });
      if (!newCommitRes.ok) {
        const err = await newCommitRes.json().catch(() => ({}));
        throw new Error(`Failed to create commit: ${err.message || newCommitRes.statusText}`);
      }
      const newCommitData = await newCommitRes.json();
      const newCommitSha = newCommitData.sha;

      // 6. Update reference on branch
      const updateRefRes = await fetch(`https://api.github.com/repos/${this.repo}/git/refs/heads/${this.branch}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify({
          sha: newCommitSha
        })
      });
      if (!updateRefRes.ok) {
        const err = await updateRefRes.json().catch(() => ({}));
        throw new Error(`Failed to update ref: ${err.message || updateRefRes.statusText}`);
      }

      this.status = 'synced';
      this.lastSync = new Date().toISOString();
      console.log(`[GitHubSync] Successfully synced database.json to ${this.repo}@${this.branch} (Commit: ${newCommitSha.substring(0, 7)})`);
      return { success: true, commitSha: newCommitSha };
    } catch (err) {
      this.status = 'error';
      this.lastError = err.message;
      console.error('[GitHubSync] Error syncing to GitHub:', err.message);
      return { success: false, error: err.message };
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Pulls latest database.json from GitHub if newer or if local is outdated
   */
  async pullLatest() {
    if (!this.isConfigured()) return false;
    try {
      console.log(`[GitHubSync] Checking latest database from ${this.repo}...`);
      const res = await fetch(`https://api.github.com/repos/${this.repo}/contents/data/database.json`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'User-Agent': 'CNE-Quizzes-Sync',
          'Accept': 'application/vnd.github.v3.raw'
        }
      });
      if (!res.ok) {
        console.warn('[GitHubSync] Could not fetch remote database.json:', res.statusText);
        return false;
      }
      const remoteJsonText = await res.text();
      const remoteData = JSON.parse(remoteJsonText);

      if (!remoteData || !Array.isArray(remoteData.subjects) || !Array.isArray(remoteData.questions)) {
        console.warn('[GitHubSync] Remote database invalid');
        return false;
      }

      // Check if remote data has valid structure and newer or equal
      let localData = null;
      if (fs.existsSync(DB_PATH)) {
        try {
          localData = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        } catch (_) {}
      }

      const remoteTime = remoteData.lastUpdated ? new Date(remoteData.lastUpdated).getTime() : 0;
      const localTime = localData && localData.lastUpdated ? new Date(localData.lastUpdated).getTime() : 0;

      if (!localData || remoteTime >= localTime) {
        fs.writeFileSync(DB_PATH, remoteJsonText, 'utf-8');
        this.status = 'synced';
        this.lastSync = new Date().toISOString();
        console.log(`[GitHubSync] Updated local database from remote (${remoteData.questions.length} questions, last updated: ${remoteData.lastUpdated})`);
        return true;
      }
      return false;
    } catch (err) {
      console.warn('[GitHubSync] Failed to pull from GitHub:', err.message);
      return false;
    }
  }
}

const githubSync = new GitHubSyncManager();
module.exports = githubSync;
