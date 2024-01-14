import fs from 'fs-extra';
import { getPath } from './get-path';
import { createLogger } from './logger';

const CACHE_DIR = getPath('scripts/.cache');
const logger = createLogger('cache');

const read = async <T>(path: string) => {
  const _path = `${CACHE_DIR}/${path}`;
  if (!fs.existsSync(_path)) {
    return null;
  }
  try {
    const file = (await fs.readJSON(_path)) as T;
    return file;
  } catch {
    return null;
  }
};

const write = async (path: string, data: unknown) => {
  const _path = `${CACHE_DIR}/${path}`;
  try {
    await fs.ensureFile(_path);
    await fs.writeJSON(_path, data, {
      spaces: 0,
      replacer: (key, value: unknown) => {
        if (key === 'url' || value === null) {
          return undefined;
        }
        return value;
      },
    });
  } catch (error) {
    logger.default.error(error);
  }
};

export default {
  read,
  write,
  CACHE_DIR,
};
