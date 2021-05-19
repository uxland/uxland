import {Route} from '../router';
import {findMatchingRoutes} from './finding-matching-routes';

/**
 * Checks if route is active
 * @function
 * @memberof Routing
 * @name isRouteActive
 * @since v1.0.2
 * @param {Routing.Route} currentRoute Current route definition
 * @param {string} testRoute Route string to be tested agains
 * @returns {boolean}
 */
export const isRouteActive = (currentRoute: Route, testRoute: string): boolean =>
  currentRoute && typeof testRoute === 'string'
    ? findMatchingRoutes(currentRoute.href, [{route: testRoute}], true).length > 0
    : false;
