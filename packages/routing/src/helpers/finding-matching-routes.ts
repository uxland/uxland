/*
 * @license
 * BSD License
 *
 * Copyright (c) 2020, UXLand
 *
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * 3. All advertising materials mentioning features or use of this software must display the following acknowledgement: This product includes software developed by the <copyright holder>.
 * 4. Neither the name of the <copyright holder> nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ''AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import {Route} from '../router';
import {clean} from './clean';
import {regExpResultToParams} from './reg-expr-result-to-params';
import {replaceDynamicURLSegments} from './replace-dynamic-url-segments';

let STUB = 1;
/**
 * Matching route interface
 * @interface MatchingRoute
 * @member Routing
 * @since v1.0.0
 * @property {RegExpMatchArray} match
 * @property {Routing.Route} route Route specification
 * @property {*} params Route parameters
 */
export interface MatchingRoute {
  match: RegExpMatchArray;
  route: Route;
  params: any;
}
STUB = 1;

/**
 * Find matching routes for provided url
 * @function
 * @memberof Routing
 * @name findMatchingRoutes
 * @since v1.0.0
 * @returns {Array.<Routing.MatchingRoute>}
 */
export const findMatchingRoutes = (
  url: string,
  routes: Route[] = [],
  includeSubRoutes?: boolean,
  addWildCard?: boolean
): MatchingRoute[] => {
  let result = routes
    .map(route => {
      const {regexp, paramNames} = replaceDynamicURLSegments(
        clean(addWildCard ? route.route + '/*' : route.route)
      );
      const match = url?.replace(/^\/+/, '/').match(regexp);
      const params = regExpResultToParams(match, paramNames);
      return match ? {match, route, params} : undefined;
    })
    .filter(m => m);
  result = includeSubRoutes ? [...result, ...findMatchingRoutes(url, routes, false, true)] : result;
  return result.sort((a, b) => {
    if (a === null) return 1;
    if (b === null) return -1;
    const aSegments = a.route.route.split('/');
    const bSegments = b.route.route.split('/');
    return bSegments.length - aSegments.length;
  });
};
