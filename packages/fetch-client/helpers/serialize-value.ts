export const serializeValue = function (value: string | number | boolean): string {
  return value === null || typeof value === 'undefined' ? '' : encodeURIComponent(value);
};
