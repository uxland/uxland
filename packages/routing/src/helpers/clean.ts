export const clean = (str: string | RegExp): string | RegExp => {
  if (!str) return undefined;
  if (str instanceof RegExp) return str;
  return str.replace(/\/+$/, "").replace(/^\/+/, "^/");
};
