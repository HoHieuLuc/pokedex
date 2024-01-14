import { Signale } from 'signale';

export const createLogger = (scope: string) => {
  const normal =  new Signale({
    scope,
    types: {
      success: {
        badge: '✔',
        color: 'green',
        label: '',
      },
      error: {
        badge: '✖',
        color: 'red',
        label: '',
      },
      log: {
        badge: '-',
        color: 'white',
        label: '',
      }
    },
  });

  const interactive = new Signale({
    scope,
    types: {
      await: {
        badge: '+',
        color: 'yellow',
        label: '',
      },
    },
    interactive: true,
  });

  return {
    default: normal,
    interactive,
  };
};
