import fs from 'fs';
import _ from 'lodash';

export default function genDiff(filepath1, filepath2) {
  const fileOne = JSON.parse(fs.readFileSync(filepath1));
  const fileTwo = JSON.parse(fs.readFileSync(filepath2));
  const keysOfFileOne = _.keysIn(fileOne);
  const keysOfFileTwo = _.keysIn(fileTwo);
  const result = [];
  keysOfFileOne.forEach((key) => {
    if (!_.has(fileTwo, key)) {
      result.push(`${key}: ${fileOne[key]}  - `);
    }
  });
  keysOfFileTwo.forEach((key) => {
    if (!_.has(fileOne, key)) {
      result.push(`${key}: ${fileTwo[key]}  + `);
    }
  });
  keysOfFileTwo.forEach((key) => {
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
