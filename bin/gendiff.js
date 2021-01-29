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
    const a = genDiff(filepath1, filepath2);
    console.log(a);
  });
program.parse(process.argv);
