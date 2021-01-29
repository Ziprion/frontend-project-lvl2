import fs from 'fs';
import _ from 'lodash';

export default function genDiff(filepath1, filepath2) {
  const pathOfFileOne = filepath1;
  const pathOfFileTwo = filepath2;
  const dataOfFileOne = fs.readFileSync(pathOfFileOne);
  const dataOfFileTwo = fs.readFileSync(pathOfFileTwo);
  const fileOne = JSON.parse(dataOfFileOne);
  const fileTwo = JSON.parse(dataOfFileTwo);
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
    const ourArray = array;
    const newResult = ourArray.map((item) => {
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
  const sortedFormatResult = handlerToFormat(result.sort()).flat();
  const startStringResult = '{\r\n';
  const endStringResult = '\r\n}\r\n';
  const mainStringResult = sortedFormatResult.join('\r\n');
  const stringResult = startStringResult + mainStringResult + endStringResult;
  return stringResult;
}
