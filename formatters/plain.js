import _ from 'lodash';

const res = [];
const formatPlain = (array, path = '') => {
  array.map((item) => {
    const newPath = path + item.name;
    const getValue = (asd) => {
      if (_.isObject(asd.value)) {
        return '[complex value]';
      }
      if (typeof asd.value === 'string') {
        return `'${asd.value}'`;
      }
      return `${asd.value}`;
    };
    const getNewValue = (asd) => {
      if (_.isObject(asd.newValue)) {
        return '[complex value]';
      }
      if (typeof asd.newValue === 'string') {
        return `'${asd.newValue}'`;
      }
      return `${asd.newValue}`;
    };
    const value = getValue(item);
    const newValue = getNewValue(item);
    if (item.status === 'deleted') {
      res.push(`Property '${newPath}' was removed\r\n`);
    }
    if (item.status === 'added') {
      res.push(`Property '${newPath}' was added with value: ${newValue}\r\n`);
    }
    if (item.status === 'changed') {
      res.push(`Property '${newPath}' was updated. From ${value} to ${newValue}\r\n`);
    }
    if (_.isObject(item.newValue)) {
      const trigPath = '.';
      return formatPlain(item.newValue, newPath + trigPath);
    }
    return true;
  });
  return res;
};
export default formatPlain;
