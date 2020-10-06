import { serializeValue } from "./serialize-value";

declare function serialize(key: string, value: string): string;

export const toQueryParams = function (queryParams: any): string {
  const str = [];
  for (const p in queryParams) {
    const v = queryParams[p];
    str.push(
      v !== null && typeof v === "object"
        ? serialize(v, p)
        : encodeURIComponent(p) + "=" + serializeValue(v)
    );
  }
  return str.join("&");
};
