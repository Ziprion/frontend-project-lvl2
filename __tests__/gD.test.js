import fs from 'fs';
import genDiff from '../src/gD.js';

test('genDiff check', () => {
  const expectString = fs.readFileSync('fortest.txt', 'utf8');
  expect(genDiff('file1.json', 'file2.json')).toMatch(expectString);
});
