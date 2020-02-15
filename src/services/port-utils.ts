export const normalizePort = (
  str: string | undefined,
  defaultValue: number
) => {
  if (str == null) {
    return defaultValue;
  }

  if (/\d+/.test(str)) {
    return parseInt(str, 10);
  }

  return defaultValue;
};
