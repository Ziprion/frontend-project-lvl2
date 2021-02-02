import formatter from './default.js';
import formatPlain from './plain.js';

function whichformat(prevResult, format) {
  if (format === 'plain') { return `${formatPlain(prevResult)}`; }
  if (format === 'json') { return JSON.stringify(prevResult); }
  return `{\n${formatter(prevResult)}}`;
}
export default whichformat;
