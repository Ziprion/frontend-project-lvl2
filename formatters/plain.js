import _ from 'lodash';

export default function plain(arras) {
  function formatPlain(array, path = '') {
    return array.map((item) => {
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
        return `Property '${newPath}' was removed`;
      }
      if (item.status === 'added') {
        return `Property '${newPath}' was added with value: ${newValue}`;
      }
      if (item.status === 'changed') {
        return `Property '${newPath}' was updated. From ${value} to ${newValue}`;
      }
      if (_.isObject(item.newValue) && item.status === 'unchanged') {
        const trigPath = '.';
        return formatPlain(item.newValue, newPath + trigPath);
      }
      return undefined;
    })
      .filter((node) => node !== undefined)
      .join('\n');
  }
  return formatPlain(arras);
}
