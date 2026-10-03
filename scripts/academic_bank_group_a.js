const { getGroupAQuestions } = require('./build_academic_group_a');
const { getC2AndDiffQuestions } = require('./bank_group_a_c2_diff');
const { getGroupARestQuestions } = require('./bank_group_a_rest');
const { getNumAndStatsQuestions } = require('./bank_group_a_num_stats');
const { getPhysAndChemQuestions } = require('./bank_group_a_phys_chem');

function getAllGroupA() {
  const all = [
    ...getGroupAQuestions(),
    ...getC2AndDiffQuestions(),
    ...getGroupARestQuestions(),
    ...getNumAndStatsQuestions(),
    ...getPhysAndChemQuestions()
  ];
  return all;
}

module.exports = { getAllGroupA };
