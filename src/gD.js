import _ from 'lodash';
import parser from './parsers.js';

const addDifKeys = (file, anotherFile, mark, toArray) => {
  const arrayOfKeys = _.keysIn(file);
  arrayOfKeys.forEach((key) => {
    if (!_.has(anotherFile, key)) {
      toArray.push(`${key}: ${file[key]}  ${mark} `);
    }
  });
};
const handlerToFormat = (array) => {
  const newResult = array.map((item) => {
    if (_.isArray(item)) {
      return handlerToFormat(item);
    }
    const preString = item.slice(item.length - 4, item.length);
    const mainString = item.slice(0, item.length - 4);
    const newString = preString + mainString;
    return newString;
  });
  return newResult;
};
export default function genDiff(filepath1, filepath2) {
  const fileOne = parser(filepath1);
  const fileTwo = parser(filepath2);
  const result = [];
  addDifKeys(fileOne, fileTwo, '-', result);
  addDifKeys(fileTwo, fileOne, '+', result);
  _.keysIn(fileTwo).forEach((key) => {
    if (_.has(fileOne, key)) {
      if (fileOne[key] === fileTwo[key]) {
        result.push(`${key}: ${fileOne[key]}    `);
      } else {
        result.push([`${key}: ${fileOne[key]}  - `, `${key}: ${fileTwo[key]}  + `]);
      }
    }
  });
  const sortedFormatResult = handlerToFormat(result.sort()).flat().join('\r\n');
  return `\r\n{\r\n${sortedFormatResult}\r\n}\r\n`;
}
