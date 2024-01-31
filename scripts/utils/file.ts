import fs from 'fs-extra';

type Options = {
  encoding?: string | null | undefined;
  mode?: string | number | undefined;
  flag?: string | undefined;
  EOL?: string | undefined;
  spaces?: string | number | undefined;
  replacer?: ((key: string, value: unknown) => unknown) | undefined;
};

const writeJSON = async (file: string, data: unknown, options: Options = {}) => {
  await fs.writeJSON(file, data, {
    spaces: 0,
    replacer: (_key, value: unknown) => {
      if (value === null) {
        return undefined;
      }
      return value;
    },
    ...options,
  });
};

export default {
  writeJSON,
};
