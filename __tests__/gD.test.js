import fs from 'fs';
import genDiff from '../src/gD.js';

test('genDiff check', () => {
  const expectString = fs.readFileSync('./__fixtures__/fortest.txt', 'utf8');
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toMatch(expectString);
});
