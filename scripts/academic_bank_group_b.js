const { getCppAndOopQuestions } = require('./bank_group_b_cpp_oop');
const { getDsAndAsmQuestions } = require('./bank_group_b_ds_asm');
const { getArchAiMachSkillsQuestions } = require('./bank_group_b_arch_ai');

function getAllGroupB() {
  const all = [
    ...getCppAndOopQuestions(),
    ...getDsAndAsmQuestions(),
    ...getArchAiMachSkillsQuestions()
  ];
  return all;
}

module.exports = { getAllGroupB };
