import formatter from './default.js';
import formatPlain from './plain.js';

function whichformat(prevResult, format) {
  if (format === 'plain') { return `\r\n${formatPlain(prevResult).join('')}`; }
  if (format === 'default') { return `{\r\n${formatter(prevResult)}}\r\n`; }
  if (format === 'json') { return JSON.stringify(prevResult); }
  return console.log('error');
}
export default whichformat;
