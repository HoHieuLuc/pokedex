import path from 'node:path';

export function getPath(...filePath: Array<string>) {
  return path.join(process.cwd(), ...filePath).replace(/\\/g, '/');
}
