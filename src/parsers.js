import fs from 'fs';
import path from 'path';
import YAML from 'js-yaml';

export default function parser(filepath) {
  const extFile = path.extname(filepath);
  if (extFile === '.json') {
    const file = JSON.parse(fs.readFileSync(filepath));
    return file;
  }
  if (extFile === '.yml') {
    const file = YAML.load(fs.readFileSync(filepath));
    return file;
  }
  return false;
}
