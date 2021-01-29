import fs from 'fs';
import _ from 'lodash';

export default function genDiff(filepath1, filepath2) {
  const fileOne = JSON.parse(fs.readFileSync(filepath1));
  const fileTwo = JSON.parse(fs.readFileSync(filepath2));
  const result = [];
  const addDifKeys = (file, anotherFile, mark) => {
    const arrayOfKeys = _.keysIn(file);
    arrayOfKeys.forEach((key) => {
      if (!_.has(anotherFile, key)) {
        result.push(`${key}: ${file[key]}  ${mark} `);
      }
    });
  };
  addDifKeys(fileOne, fileTwo, '-');
  addDifKeys(fileTwo, fileOne, '+');
  _.keysIn(fileTwo).forEach((key) => {
    if (_.has(fileOne, key)) {
      if (fileOne[key] === fileTwo[key]) {
        result.push(`${key}: ${fileOne[key]}    `);
      } else {
        result.push([`${key}: ${fileOne[key]}  - `, `${key}: ${fileTwo[key]}  + `]);
      }
    }
  });
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
  const sortedFormatResult = handlerToFormat(result.sort()).flat().join('\r\n');
  return `\r\n{\r\n${sortedFormatResult}\r\n}\r\n`;
}
