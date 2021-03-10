import {RouteParams} from '../router';

export function regExpResultToParams(match: RegExpMatchArray, names: string[]): RouteParams {
  if (names.length === 0) return null;
  if (!match) return null;
  return match.slice(1, match.length).reduce((params, value, index) => {
    params[names[index]] = decodeURIComponent(value);
    return params;
  }, {});
}
