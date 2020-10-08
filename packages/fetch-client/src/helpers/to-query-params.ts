import { serializeValue } from "./serialize-value";

export const toQueryParams = function (queryParams: any): string {
  const str = [];
  for (const p in queryParams) {
    const v = queryParams[p];
    str.push(
      v !== null && typeof v === "object"
        ? `${encodeURIComponent(p)}=${JSON.stringify(v)}`
        : encodeURIComponent(p) + "=" + serializeValue(v)
    );
  }
  return str.join("&");
};
