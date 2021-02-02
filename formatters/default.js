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
    const preStr = '{\r\n';
    const postStr = `${newTab}  }`;
    const resultValue = typeof item.value === 'object' ? preStr + value + postStr : value;
    const resultNewValue = newValue;
    if (value === newValue) {
      str += `${newTab}${status} ${item.name}: ${resultValue}\r\n`;
    } else {
      str += `${newTab}- ${item.name}: ${resultValue}\r\n`;
      str += `${newTab}+ ${item.name}: ${resultNewValue}\r\n`;
    }
    return true;
  });
  return str;
};
export default formatter;
