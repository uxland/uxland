import {findMatchingRoutes} from '../helpers/finding-matching-routes';
import {Route} from './reducer';

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
