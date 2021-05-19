import {findMatchingRoutes} from '../helpers/finding-matching-routes';
import {Route} from '../router';

/**
 * Returns current route subpage or defaultPage if not found depending on wether route is active or not
 * @function
 * @memberof Routing
 * @name computePage
 * @since v1.0.2
 * @param {Routing.Route} currentRoute Current route definition
 * @param {string} defaultPage Default fallback page
 * @param {boolean} isRouteActive Defines if current route is active
 * @param {string} route Route to check against
 * @returns {string}
 */
export const computePage: (
  currentRoute: Route,
  defaultPage: string,
  isRouteActive: boolean,
  route: string
) => string = (currentRoute, defaultPage, isRouteActive, route) => {
  let page = undefined;
  if (isRouteActive && currentRoute) {
    const matching = findMatchingRoutes(currentRoute.href, [{route: route + '/*'}]);
    if (matching.length) {
      const segments = route.split('/').length;
      page = matching[0].match[0].split('/')[segments];
    }
    if (typeof page === 'undefined') page = defaultPage;
  }
  return page;
};
