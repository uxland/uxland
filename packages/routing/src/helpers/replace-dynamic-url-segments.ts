/*
 * MIT License
 *
 * Copyright (c) 2020 UXLand
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
 * THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const PARAMETER_REGEXP = /([:*])(\w+)/g;
const WILDCARD_REGEXP = /\*/g;
const REPLACE_VARIABLE_REGEXP = "([^/]+)";
const REPLACE_WILDCARD = "(?:.*)";
const FOLLOWED_BY_SLASH_REGEXP = "(?:/$|$)";
const MATCH_REGEXP_FLAGS = "";
export function replaceDynamicURLSegments(route: string | RegExp) {
  const paramNames = [];
  let regexp;

  if (route instanceof RegExp) regexp = route;
  else
    regexp = new RegExp(
      route
        .replace(PARAMETER_REGEXP, function (full, dots, name) {
          paramNames.push(name);
          return REPLACE_VARIABLE_REGEXP;
        })
        .replace(WILDCARD_REGEXP, REPLACE_WILDCARD) + FOLLOWED_BY_SLASH_REGEXP,
      MATCH_REGEXP_FLAGS
    );

  return { regexp, paramNames };
}
