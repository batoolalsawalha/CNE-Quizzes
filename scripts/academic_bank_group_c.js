const { getCircuitsAndElectroQuestions } = require('./bank_group_c_circuits_electro');
const { getLogicSignalsControlQuestions } = require('./bank_group_c_logic_signals_control');
const { getTelecomNetCloudQuestions } = require('./bank_group_c_telecom_net_cloud');

function getAllGroupC() {
  const all = [
    ...getCircuitsAndElectroQuestions(),
    ...getLogicSignalsControlQuestions(),
    ...getTelecomNetCloudQuestions()
  ];
  return all;
}

module.exports = { getAllGroupC };
