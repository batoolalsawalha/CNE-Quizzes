# CNE Quizzes - Production Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Copy all application files
COPY server/ ./server/
COPY public/ ./public/
COPY data/ ./data/

# Create volume mount point for persistent data storage
VOLUME ["/app/data"]

# Expose server port
EXPOSE 3000

# Set environment
ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/stats || exit 1

# Start CNE Quizzes server
CMD ["node", "server/server.js"]
