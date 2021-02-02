import fs from 'fs';
import genDiff from '../src/gD.js';

test('genDiff JSON tree check', () => {
  const expectString = fs.readFileSync('./__fixtures__/fortest2.txt', 'utf8');
  expect(genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json')).toMatch(expectString);
});
test('genDiff JSON plain check', () => {
  const expectString = fs.readFileSync('./__fixtures__/fortest3.txt', 'utf8');
  expect(genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json', 'plain')).toEqual(expectString);
});
