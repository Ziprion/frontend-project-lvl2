import fs from 'fs';
import genDiff from '../src/gD.js';

test('genDiff JSON check', () => {
  const expectString = fs.readFileSync('./__fixtures__/fortest.txt', 'utf8');
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toMatch(expectString);
});
test('genDiff YAML check', () => {
  const expectString = fs.readFileSync('./__fixtures__/fortest.txt', 'utf8');
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml')).toMatch(expectString);
});
test('genDiff JSON tree check', () => {
  const expectString = fs.readFileSync('./__fixtures__/fortest2.txt', 'utf8');
  expect(genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json')).toMatch(expectString);
});
