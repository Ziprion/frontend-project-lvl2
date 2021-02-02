import diffObj from './src/gD.js';
import whichformat from './formatters/index.js';
import parser from './src/parsers.js';

export default function genDif(filepath1, filepath2, format = 'default') {
  const fileOne = parser(filepath1);
  const fileTwo = parser(filepath2);
  const result = diffObj(fileOne, fileTwo);
  return whichformat(result, format);
}
