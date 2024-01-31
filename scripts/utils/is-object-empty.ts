// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObjectEmpty = (obj: any) => {
  for (const key in obj) {
    if (obj[key] !== null && typeof obj[key] === 'object') {
      if (!isObjectEmpty(obj[key])) {
        return false;
      }
    } else if (obj[key] !== null) {
      return false;
    }
  }
  return true;
};

export default isObjectEmpty;
