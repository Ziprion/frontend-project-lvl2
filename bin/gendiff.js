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
    const path1 = filepath1;
    const path2 = filepath2;
    const dataPath1 = fs.readFileSync(path1);
    const dataPath2 = fs.readFileSync(path2);
    const file1 = JSON.parse(dataPath1);
    const file2 = JSON.parse(dataPath2);
    const keys1 = _.keysIn(file1);
    const keys2 = _.keysIn(file2);
    const asd = [];
    keys1.filter((item) => {
      if (!_.has(file2, item)) {
        asd.push(`${item} ${file1[item]}- `);
      }
    });
    keys2.filter((item) => {
      if (!_.has(file1, item)) {
        asd.push(`${item} ${file2[item]}+ `);
      }
    });
    keys2.filter((item) => {
      if (_.has(file1, item)) {
        if (file1[item] === file2[item]) {
          asd.push(`${item} ${file1[item]}  `);
        } else {
          asd.push([`${item} ${file1[item]}- `, `${item} ${file2[item]}+ `]);
        }
      };
    });
    const qwe = (array) => {
      const newArray = array;
      const newnewnew = newArray.map((item) => {
        if (_.isArray(item)) {return qwe(item)} else {const string = item.slice(item.length - 2, item.length);
          const newString = item.slice(0, item.length - 2);
          const otherString = string + newString;
          return otherString;}
      });
      return newnewnew;
    }
    const newNew = qwe(asd.sort());
   const h = newNew.map((item) => _.isArray(item) ? item.map((item) => item.trim()) : item.trim());
   const q = h.join(',');
   console.log('{');
   q.split(',').map((item) => console.log(item));
   console.log('}');
   return q;
  });
program.parse(process.argv);
