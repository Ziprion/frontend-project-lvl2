import _ from 'lodash';

const formatter = (array, inner = 1) => {
  const tab = '  ';
  const newTab = tab.repeat(inner);
  function getStatus(asd) {
    if (asd.status === 'deleted') {
      return '-';
    }
    if (asd.status === 'added') {
      return '+';
    }
    return ' ';
  }
  return array.map((item) => {
    const status = getStatus(item);
    const value = _.isObject(item.value) ? formatter(item.value, inner + 2) : item.value;
    const newValue = _.isObject(item.newValue) ? formatter(item.newValue, inner + 2)
      : item.newValue;
    const preStr = '{\n';
    const postStr = `${newTab}  }`;
    const resultValue = _.isObject(item.value) ? preStr + value + postStr : value;
    const resultNewValue = _.isObject(item.newValue) ? preStr + newValue + postStr : newValue;
    if (value === newValue) {
      return `${newTab}${status} ${item.name}: ${resultValue}\n`;
    }
    return `${newTab}- ${item.name}: ${resultValue}\n${newTab}+ ${item.name}: ${resultNewValue}\n`;
  })
    .join('');
};
export default formatter;
