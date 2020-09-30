/**
 * Returns a collection of parameter name and corresponding identifier in url.
 * @param match
 * @param names
 * @example
 *
 * const url = '/dummy/:id'
 * regExpResultToParams() //=> {id: ':id'}
 */

import { RouteParams } from "../router";

export function regExpResultToParams(
  match: RegExpMatchArray,
  names: string[]
): RouteParams {
  if (names.length === 0) return null;
  if (!match) return null;
  return match.slice(1, match.length).reduce((params, value, index) => {
    params[names[index]] = decodeURIComponent(value);
    return params;
  }, {});
}
