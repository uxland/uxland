import { isNotNil, toPath } from "@uxland/functional-utilities";
import { allPass, difference, pathSatisfies, propSatisfies } from "ramda";
import { clean } from "./helpers/clean";
import { findMatchingRoutes } from "./helpers/finding-matching-routes";
import { getOnlyUrl } from "./helpers/get-only-url";
import { getQueryParametersFromUrl } from "./helpers/get-query-params-from-url";
import { isPushStateAvailable } from "./helpers/is-push-state-available";
import { root } from "./helpers/root";
import { RouterHooks } from "./hooks";

declare global {
  interface Window {
    __NAVIGO_WINDOW_LOCATION_MOCK__: string;
  }
}

export type RouteParams = { [key: string]: string };
export type RouteQueryString = { [key: string]: string };
export type RouteHandler = () => Promise<void>;
export interface Route {
  route: string;
  handler?: RouteHandler;
  hooks?: RouterHooks;
}
export interface MatchingRoute {
  match: RegExpMatchArray;
  route: Route;
  params: any;
}

export const duplicateRoutes =
  "You are trying to register multiple equal routes";
export const existingRoute =
  "You are trying to register a route that already exists";
export const previousNavigationCancelled =
  "Previous navigation action has been cancelled due to a new one";

const hasDuplicatedRoutes = (routes: Route[]): boolean => {
  const urls = routes.map((r) => r.route);
  return new Set(urls).size != urls.length;
};

const hasExistingRoute = (route: Route, routes: Route[]): boolean =>
  routes.find((r) => r.route == route.route) != undefined;

const isHashChangeAPIAvailable = () =>
  typeof window !== "undefined" && "onhashchange" in window;

const routerHooksDefinedSpec = propSatisfies(isNotNil, "hooks");
const canNavigateFromSpec = allPass([
  routerHooksDefinedSpec,
  pathSatisfies(isNotNil, toPath("hooks.canNavigateFrom")),
]);
const canNavigateToSpec = allPass([
  routerHooksDefinedSpec,
  pathSatisfies(isNotNil, toPath("hooks.canNavigateTo")),
]);
const navigatedFromSpec = allPass([
  routerHooksDefinedSpec,
  pathSatisfies(isNotNil, toPath("hooks.navigatedFrom")),
]);

const routesToDeactivate = (
  last: string,
  current: string,
  routes: Route[]
): Route[] => {
  const lastRoutes = findMatchingRoutes(last, routes).map((m) => m.route);
  const currentRoutes = findMatchingRoutes(current, routes).map((m) => m.route);
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
      p["generator"] = generator;
      return p;
    } catch (ex) {
      return Promise.reject(ex);
    }
  };
}

/**
 * Navigate cancellable function. The execution can be stopped any time
 * @param last
 * @param current
 * @param routes
 * @param router
 */
function* navigate(
  last: string,
  current: string,
  routes: Route[],
  router: Router
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
          .map((r) =>
            r.hooks.canNavigateFrom(current, matchingRoute.params, query)
          )
      );
      const canNavigateToResults = yield Promise.all(
        toDeactivate
          .filter(canNavigateToSpec)
          .map((r) =>
            r.hooks.canNavigateTo(current, matchingRoute.params, query)
          )
      );
      if (
        [...canNavigateFromResults, ...canNavigateToResults].every((x) => x)
      ) {
        result = current;
        router.resolving = true;
        router.updateLocation(current);
        if (matchingRoute.route.hooks?.navigatedFrom)
          matchingRoute.route.hooks?.navigatedFrom(
            last,
            matchingRoute.params,
            query
          );
      }
    } finally {
      router.resolving = false;
    }
  }
  return { success: result === current };
}

export class Router {
  private _routes: Route[] = [];
  private readonly usePushState: boolean;
  public resolving = false;
  // private readonly locationChangeHandler: any;
  // private listeningInterval: any;
  private generator: Generator;

  constructor(
    routes: Route[] = [],
    private root?: string,
    private hash = "" /*private useHash = false, private hash = '#'*/
  ) {
    this.usePushState = isPushStateAvailable();
    // this.locationChangeHandler = this.locationChange.bind(this);
    if (routes && routes.length > 0) {
      if (hasDuplicatedRoutes(routes)) throw new Error(duplicateRoutes);
      else this._routes = [...routes];
    }
    if (root) {
      // this.root = useHash ? root.replace(/\/$/, '/' + this.hash) : root.replace(/\/$/, '');
      this.root = root.replace(/\/$/, "");
    }
    // else if (useHash) {
    //   this.root = (Router._currentLocation() as string).split(this.hash)[0].replace(/\/$/, '');
    // }
    // this.listen();
  }

  registerRoutes(routes: Route | Route[]) {
    if (routes instanceof Array) {
      if (hasDuplicatedRoutes(routes)) throw new Error(duplicateRoutes);
      else this._routes.push(...routes);
    } else {
      if (hasExistingRoute(routes, this._routes))
        throw new Error(existingRoute);
      else this._routes.push(routes);
    }
  }

  get routes(): Route[] {
    return this._routes;
  }

  destroy() {
    this._routes = [];
  }

  public routing = false;

  private lastResolvedUrl: string = null;

  private static _currentLocation() {
    if (typeof window !== "undefined") {
      if (typeof window.__NAVIGO_WINDOW_LOCATION_MOCK__ !== "undefined") {
        return window.__NAVIGO_WINDOW_LOCATION_MOCK__;
      }
      return clean(window.location.href);
    }
    return "";
  }

  get currentLocation() {
    return Router._currentLocation();
  }

  private getRoot() {
    return isNotNil(this.root)
      ? this.root
      : root((Router._currentLocation() as string).split("?")[0], this._routes);
  }

  private getRouteUrl(path = "") {
    return path.replace(this.getRoot(), "");
  }

  private routesToDeactivate(last: string, current: string): Route[] {
    return routesToDeactivate(last, current, this._routes);
  }

  updateLocation(location: string, replaceState = false) {
    if (this.usePushState) {
      // let to = `${this.getRoot() || ''}${this.useHash ? '/#' : '/'}${location}`;
      let to = `${this.getRoot() || ""}/${location}`;
      to = to.replace(/([^:])(\/{2,})/g, "$1/");
      const method = replaceState ? "replaceState" : "pushState";
      history[method]({}, "", to);
    } else if (typeof window != "undefined") {
      const path = location.replace(new RegExp("^" + this.hash), "");
      window.location.href =
        window.location.href
          .replace(/#$/, "")
          .replace(new RegExp(this.hash + ".*$"), "") +
        this.hash +
        path;
    }
  }

  private cancelPrevious() {
    try {
      this.generator?.throw(previousNavigationCancelled);
    } catch (error) {
      console.log(error);
    }
  }

  async navigate(route: string) {
    try {
      const url = this.getRouteUrl(route);
      if (url === this.lastResolvedUrl) return false;
      this.routing = true;
      this.cancelPrevious();
      const task = toAsync(navigate)(
        this.lastResolvedUrl,
        url,
        this._routes,
        this
      );
      this.generator = task.generator;
      const result = await task;
      this.lastResolvedUrl = route;
      return result.success;
    } catch (e) {
      return false;
    } finally {
      this.routing = false;
    }
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
  //       this.updateLocation(this.lastResolvedUrl, true);
  //       this.resolving = false;
  //     }
  //   }
  // }
}
