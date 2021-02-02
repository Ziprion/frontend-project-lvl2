import _ from 'lodash';

const formatter = (array, inner = 1) => {
  const tab = '  ';
  const newTab = tab.repeat(inner);
  let str = '';
  array.map((item) => {
    function getStatus(asd) {
      if (asd.status === 'deleted') {
        return '-';
      }
      if (item.status === 'added') {
        return '+';
      }
      return ' ';
    }
    const status = getStatus(item);
    const value = _.isObject(item.value) ? formatter(item.value, inner + 2) : item.value;
    const newValue = _.isObject(item.newValue) ? formatter(item.newValue, inner + 2)
      : item.newValue;
    const preStr = '{\n';
    const postStr = `${newTab}  }`;
    const resultValue = _.isObject(item.value) ? preStr + value + postStr : value;
    const resultNewValue = _.isObject(item.newValue) ? preStr + newValue + postStr : newValue;
    if (value === newValue) {
      str += `${newTab}${status} ${item.name}: ${resultValue}\r`;
    } else {
      str += `${newTab}- ${item.name}: ${resultValue}\r`;
      str += `${newTab}+ ${item.name}: ${resultNewValue}\r`;
    }
    return true;
  });
  return str;
};
export default formatter;
