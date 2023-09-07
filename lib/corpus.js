import moment from 'moment';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';


const __dirname = dirname(fileURLToPath(import.meta.url))
const parentPath = resolve(__dirname, '..')

export function loadCorpus(src) {
  const path = resolve(parentPath, src);
  const data = readFileSync(path, { encoding: 'utf-8' });
  return JSON.parse(data);
}

export function saveCorpus(title, article) {
  const outputDir = resolve(parentPath, 'output')
  const time = moment().format(' YYYY-MM-DD HH.mm.ss')
  const outputFile = resolve(outputDir, `${title}${time}.txt`)

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir)
  }

  const text = `${title}\n\n    ${article.join('\n    ')}`;
  writeFileSync(outputFile, text)
  return outputFile;
}