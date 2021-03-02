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

import {isNotNil, toPath} from '@uxland/ramda-extensions';
import {allPass, difference, pathSatisfies, propSatisfies} from 'ramda';
import {clean} from './helpers/clean';
import {findMatchingRoutes} from './helpers/finding-matching-routes';
import {getOnlyUrl} from './helpers/get-only-url';
import {getQueryParametersFromUrl} from './helpers/get-query-params-from-url';
import {isPushStateAvailable} from './helpers/is-push-state-available';
import {root} from './helpers/root';
import {RouterHooks} from './hooks';

declare global {
  interface Window {
    __NAVIGO_WINDOW_LOCATION_MOCK__: string;
  }
}

let STUB = 1;
/**
 * Collection of route parameters
 * @memberof Routing
 * @since v1.0.0
 * @typedef {Object} RouteParams
 */
STUB = 1;
export type RouteParams = {[key: string]: string};

/**
 * Collection of query string parameters
 * @memberof Routing
 * @since v1.0.0
 * @typedef {Object} RouteQueryString
 */
STUB = 1;
export type RouteQueryString = {[key: string]: string};
// export type RouteHandler = () => Promise<void>;

/**
 * Route interface
 * @memberof Routing
 * @since v1.0.0
 * @interface Route
 * @property {string} route URL route segment
 * @property {Routing.RouterHooks} hooks Actions to be executed before and after routing
 */
STUB = 1;
export interface Route {
  route: string;
  // handler?: RouteHandler;
  hooks?: RouterHooks;
}

/**
 * Duplicate routes exception
 * @memberof Routing
 * @since v1.0.0
 * @param {string} duplicateRoutes='You are trying to register multiple equal routes'
 */
export const duplicateRoutes = 'You are trying to register multiple equal routes';

/**
 * Existing route exception
 * @memberof Routing
 * @since v1.0.0
 * @param {string} existingRoute='You are trying to register a route that already exists'
 */
export const existingRoute = 'You are trying to register a route that already exists';

/**
 * Previous navigation action cancelled
 * @memberof Routing
 * @since v1.0.0
 * @param {string} previousNavigationCancelled='Previous navigation action has been cancelled due to a new one'
 */
export const previousNavigationCancelled =
  'Previous navigation action has been cancelled due to a new one';

const hasDuplicatedRoutes = (routes: Route[]): boolean => {
  const urls = routes.map(r => r.route);
  return new Set(urls).size != urls.length;
};

const hasExistingRoute = (route: Route, routes: Route[]): boolean =>
  routes.find(r => r.route == route.route) != undefined;

// const isHashChangeAPIAvailable = () => typeof window !== 'undefined' && 'onhashchange' in window;

const routerHooksDefinedSpec = propSatisfies(isNotNil, 'hooks');
const canNavigateFromSpec = allPass([
  routerHooksDefinedSpec,
  pathSatisfies(isNotNil, toPath('hooks.canNavigateFrom')),
]);
const canNavigateToSpec = allPass([
  routerHooksDefinedSpec,
  pathSatisfies(isNotNil, toPath('hooks.canNavigateTo')),
]);

const routesToDeactivate = (last: string, current: string, routes: Route[]): Route[] => {
  const lastRoutes = findMatchingRoutes(last, routes).map(m => m.route);
  const currentRoutes = findMatchingRoutes(current, routes).map(m => m.route);
  return difference(lastRoutes, currentRoutes);
};

function toAsync(makeGenerator) {
  return (...args: any[]) => {
    const generator = makeGenerator.apply(this, args);
    function handle(result) {
      if (result.done) return Promise.resolve(result.value);
      return Promise.resolve(result.value).then(
        function (res) {
          return handle(generator.next(res));
        },
        function (err) {
          return handle(generator.throw(err));
        }
      );
    }
    try {
      const p = handle(generator.next);
      p['generator'] = generator;
      return p;
    } catch (ex) {
      return Promise.reject(ex);
    }
  };
}

function* navigate(
  last: string,
  current: string,
  routes: Route[],
  router: Router,
  notFoundHandler: () => void
) {
  yield;
  let result = last;
  const onlyUrl = getOnlyUrl(current);
  const matchingRoute = findMatchingRoutes(onlyUrl, routes)[0];
  if (matchingRoute) {
    try {
      const query = getQueryParametersFromUrl(current);
      const toDeactivate = routesToDeactivate(last, current, routes);
      const canNavigateFromResults = yield Promise.all(
        toDeactivate
          .filter(canNavigateFromSpec)
          .map(r => r.hooks.canNavigateFrom(current, matchingRoute.params, query))
      );
      const canNavigateToResults = yield Promise.all(
        toDeactivate
          .filter(canNavigateToSpec)
          .map(r => r.hooks.canNavigateTo(current, matchingRoute.params, query))
      );
      if ([...canNavigateFromResults, ...canNavigateToResults].every(x => x)) {
        result = current;
        router.resolving = true;
        router.updateLocation(current);
        if (matchingRoute.route.hooks?.navigatedFrom)
          matchingRoute.route.hooks?.navigatedFrom(last, matchingRoute.params, query);
      }
    } finally {
      router.resolving = false;
    }
  } else if (notFoundHandler) notFoundHandler();
  return {success: result === current};
}

/**
 * Router
 * @memberof Routing
 * @since v1.0.0
 */
export class Router {
  // private readonly locationChangeHandler: any;
  // private listeningInterval: any;
  private _routes: Route[] = [];
  private readonly usePushState: boolean;
  private generator: Generator;
  private _lastResolvedUrl: string = null;
  private notFoundHandler = null;

  /**
   * Indicates if router is currently updating location
   * @param {boolean} resolving=false
   */
  public resolving = false;

  /**
   * Indicates if router is currently routing
   * @param {boolean} routing=false
   */
  public routing = false;

  /**
   * Router constructor
   * @param {Routing.Route[]} routes Routes collection
   * @param {string} [root] Router root segment
   * @param {string} hash='' Router hash to be added after root and before route path
   * @example
   *
   * const router = new Router([{route: 'dummy'}])
   *
   */
  constructor(
    routes: Route[] = [],
    private root?: string,
    private hash = '' /*private useHash = false, private hash = '#'*/
  ) {
    this.usePushState = isPushStateAvailable();
    // this.locationChangeHandler = this.locationChange.bind(this);
    if (routes && routes.length > 0) {
      if (hasDuplicatedRoutes(routes)) throw new Error(duplicateRoutes);
      else this._routes = [...routes];
    }
    if (root) {
      // this.root = useHash ? root.replace(/\/$/, '/' + this.hash) : root.replace(/\/$/, '');
      this.root = root.replace(/\/$/, '');
    }
    // else if (useHash) {
    //   this.root = (Router._currentLocation() as string).split(this.hash)[0].replace(/\/$/, '');
    // }
    // this.listen();
  }

  /**
   * Registers routes collection in router
   * @param {(Routing.Route | Routing.Route[])} routes Routes collection
   * @throws You are trying to register multiple equal routes
   * @throws You are trying to register a route that already exists
   * @example
   *
   * router.registerRoutes({route: 'foo'});
   * router.registerRoutes([{route: 'foo'}, {route: 'bar'}])
   *
   */
  registerRoutes(routes: Route | Route[]): void {
    if (routes instanceof Array) {
      if (hasDuplicatedRoutes(routes)) throw new Error(duplicateRoutes);
      else this._routes.push(...routes);
    } else {
      if (hasExistingRoute(routes, this._routes)) throw new Error(existingRoute);
      else this._routes.push(routes);
    }
  }

  /**
   * Returns router registered routes
   * @returns {Routing.Route[]}
   */
  get routes(): Route[] {
    return this._routes;
  }

  /**
   * Returns router's last resolved url
   * @returns {string}
   */
  get lastResolvedUrl(): string {
    return this._lastResolvedUrl;
  }

  /**
   * Resets current router to its initial state, emptying routes collection and last resolved url
   * @example
   *
   * const router = new Router([{route: 'dummy'}]);
   * console.log(router.routes) //=> [{route: 'dummy'}]
   * router.destroy();
   * console.log(router.routes) //=> []
   *
   */
  destroy(): void {
    this._routes = [];
    this._lastResolvedUrl = '';
  }

  private static _currentLocation() {
    if (typeof window !== 'undefined') {
      if (typeof window.__NAVIGO_WINDOW_LOCATION_MOCK__ !== 'undefined') {
        return window.__NAVIGO_WINDOW_LOCATION_MOCK__;
      }
      return clean(window.location.href);
    }
    return '';
  }

  /**
   * Returns router current location
   * @returns {(string|RegExp)}
   */
  get currentLocation(): string | RegExp {
    return Router._currentLocation();
  }

  private getRoot() {
    return isNotNil(this.root)
      ? this.root
      : root((Router._currentLocation() as string).split('?')[0], this._routes);
  }

  private getRouteUrl(path = '') {
    return path.replace(this.getRoot(), '');
  }

  updateLocation(location: string, replaceState = false) {
    if (this.usePushState) {
      // let to = `${this.getRoot() || ''}${this.useHash ? '/#' : '/'}${location}`;
      let to = `${this.getRoot() || ''}/${location}`;
      to = to.replace(/([^:])(\/{2,})/g, '$1/');
      const method = replaceState ? 'replaceState' : 'pushState';
      history[method]({}, '', to);
    } else if (typeof window != 'undefined') {
      const path = location.replace(new RegExp('^' + this.hash), '');
      window.location.href =
        window.location.href.replace(/#$/, '').replace(new RegExp(this.hash + '.*$'), '') +
        this.hash +
        path;
    }
  }

  private routesToDeactivate(last: string, current: string): Route[] {
    return routesToDeactivate(last, current, this._routes);
  }

  private cancelPrevious() {
    try {
      this.generator?.throw(previousNavigationCancelled);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Navigates to specified route. Provided route can be a full url or only a path
   * @param {string} route Route path to navigate to
   * @returns {Promise<boolean>} Specifies if routing has been successfull
   */
  async navigate(route: string): Promise<boolean> {
    try {
      const url = this.getRouteUrl(route);
      if (url === this._lastResolvedUrl) return false;
      this.routing = true;
      this.cancelPrevious();
      const task = toAsync(navigate)(
        this._lastResolvedUrl,
        url,
        this._routes,
        this,
        this.notFoundHandler
      );
      this.generator = task.generator;
      const result = await task;
      this._lastResolvedUrl = route;
      return result.success;
    } catch (e) {
      return false;
    } finally {
      this.routing = false;
    }
  }

  /**
   * Handler to be executed when a route is not defined in router's routes collection
   * @param {function} handler Callback function to be called
   */
  notFound(handler: () => void) {
    this.notFoundHandler = handler;
  }

  // private listen() {
  //   if (this.usePushState) {
  //     window.addEventListener('popstate', this.locationChangeHandler);
  //   } else if (isHashChangeAPIAvailable()) {
  //     window.addEventListener('hashchange', this.locationChangeHandler);
  //   } else {
  //     let cached = Router._currentLocation(),
  //       current,
  //       check;

  //     check = () => {
  //       current = Router._currentLocation();
  //       if (cached !== current) {
  //         cached = current;
  //         this.locationChange();
  //       }
  //       this.listeningInterval = setTimeout(check, 200);
  //     };
  //     check();
  //   }
  // }

  // private async locationChange() {
  //   console.log('locations change');
  //   if (!this.resolving) {
  //     let result = await this.navigate(Router._currentLocation() as string);
  //     if (!result) {
  //       this.resolving = true;
  //       this.updateLocation(this._lastResolvedUrl, true);
  //       this.resolving = false;
  //     }
  //   }
  // }
}
