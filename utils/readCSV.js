import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function readCSV(filename) {
  const filePath = path.resolve(__dirname, filename);
  const data = fs.readFileSync(filePath, 'utf-8');
  const [headerLine, ...lines] = data.trim().split('\n');
  const headers = headerLine.split(',');

  return lines.map(line => {
    const values = line.split(',');
    return headers.reduce((obj, key, i) => {
      obj[key.trim()] = values[i]?.trim() || '';
      return obj;
    }, {});
  });
}
