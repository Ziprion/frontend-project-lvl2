#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/gD.js';

const program = new commander.Command();
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2, program.opts().format);
    return console.log(result.replace('\r\n', '\n'));
  });
program.parse(process.argv);
