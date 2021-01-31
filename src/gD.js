import _ from 'lodash';
import parser from './parsers.js';

export default function genDiff(filepath1, filepath2) {
  const fileOne = parser(filepath1);
  const fileTwo = parser(filepath2);
  const diffObj = (objOne, objTwo, count) => {
    const iterStr = '  ';
    const iter = count;
    const result = [];
    const mainObj = { ...objOne, ...objTwo };
    const keys = _.keys(mainObj).sort();
    keys.forEach((key) => {
      if (_.has(objOne, key) && !_.has(objTwo, key)) {
        if (_.isObject(objOne[key])) {
          result.push(`${iterStr.repeat(iter + 1)}- ${key}: {\r\n${diffObj(objOne[key], objOne[key], iter + 2)}\r\n${iterStr.repeat(iter + 2)}}`);
        } else {
          result.push(`${iterStr.repeat(iter + 1)}- ${key}: ${objOne[key]}`);
        }
      }
      if (!_.has(objOne, key) && _.has(objTwo, key)) {
        if (_.isObject(objTwo[key])) {
          result.push(`${iterStr.repeat(iter + 1)}+ ${key}: {\r\n${diffObj(objTwo[key], objTwo[key], iter + 2)}\r\n${iterStr.repeat(iter + 2)}}`);
        } else {
          result.push(`${iterStr.repeat(iter + 1)}+ ${key}: ${objTwo[key]}`);
        }
      }
      if (_.has(objOne, key) && _.has(objTwo, key) && typeof objOne[key] !== typeof objTwo[key]) {
        if (_.isObject(objOne[key])) {
          result.push(`${iterStr.repeat(iter + 1)}- ${key}: {\r\n${diffObj(objOne[key], objOne[key], iter + 2)}\r\n${iterStr.repeat(iter + 2)}}`);
        } else {
          result.push(`${iterStr.repeat(iter + 1)}- ${key}: ${objOne[key]}`);
        }
        if (_.isObject(objTwo[key])) {
          result.push(`${iterStr.repeat(iter + 1)}+ ${key}: {\r\n${diffObj(objTwo[key], objTwo[key], iter + 1)}\r\n${iterStr.repeat(iter)}}`);
        } else {
          result.push(`${iterStr.repeat(iter + 1)}+ ${key}: ${objTwo[key]}`);
        }
      }
      if (_.has(objOne, key) && _.has(objTwo, key) && objOne[key] === objTwo[key]) {
        if (_.isObject(objTwo[key])) {
          result.push(`${iterStr.repeat(iter + 2)}${key}: {\r\n${diffObj(objOne[key], objTwo[key], iter + 2)}\r\n${iterStr.repeat(iter + 2)}}`);
        } else {
          result.push(`${iterStr.repeat(iter + 2)}${key}: ${objOne[key]}`);
        }
      }
      if (_.has(objOne, key) && _.has(objTwo, key) && typeof objOne[key] === typeof objTwo[key]) {
        if (objOne[key] !== objTwo[key]) {
          if (_.isObject(objTwo[key])) {
            result.push(`${iterStr.repeat(iter + 2)}${key}: {\r\n${diffObj(objOne[key], objTwo[key], iter + 2)}\r\n${iterStr.repeat(iter + 2)}}`);
          } else {
            result.push(`${iterStr.repeat(iter + 1)}- ${key}: ${objOne[key]}`);
            result.push(`${iterStr.repeat(iter + 1)}+ ${key}: ${objTwo[key]}`);
          }
        }
      }
    });
    return result.join('\r\n');
  };

  const asd = diffObj(fileOne, fileTwo, 0);
  return `\r\n{\r\n${asd}\r\n}\r\n`;
}
