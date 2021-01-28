#!/usr/bin/env node
import commander from 'commander';
import fs from 'fs';
import _ from 'lodash';

const program = new commander.Command();
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
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
        result.push(`${key} ${fileOne[key]}- `);
      }
    });
    keysOfFileTwo.forEach((key) => {
      if (!_.has(fileOne, key)) {
        result.push(`${key} ${fileTwo[key]}+ `);
      }
    });
    keysOfFileTwo.forEach((key) => {
      if (_.has(fileOne, key)) {
        if (fileOne[key] === fileTwo[key]) {
          result.push(`${key} ${fileOne[key]}  `);
        } else {
          result.push([`${key} ${fileOne[key]}- `, `${key} ${fileTwo[key]}+ `]);
        }
      }
    });
    const handlerToFormat = (array) => {
      const ourArray = array;
      const newResult = ourArray.map((item) => {
        if (_.isArray(item)) {
          return handlerToFormat(item);
        }
        const preString = item.slice(item.length - 2, item.length);
        const mainString = item.slice(0, item.length - 2);
        const newString = preString + mainString;
        return newString.trim();
      });
      return newResult;
    };
    const sortedFormatResult = handlerToFormat(result.sort());
    const stringResult = sortedFormatResult.join(',');
    const handlerToOutput = (str) => {
      const string = str;
      const preStr = '{,';
      const postStr = ',{';
      const strResult = preStr + string + postStr;
      return strResult.split(',').map((item) => console.log(item));
    };
    return stringResult;
  });
program.parse(process.argv);
