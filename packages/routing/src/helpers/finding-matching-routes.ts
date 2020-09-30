import { Route } from "../router";
import { regExpResultToParams } from "./reg-expr-result-to-params";
import { replaceDynamicURLSegments } from "./replace-dynamic-url-segments";

export interface MatchingRoute {
  match: RegExpMatchArray;
  route: Route;
  params: any;
}

export const findMatchingRoutes = (
  url: string,
  routes: Route[] = []
): MatchingRoute[] =>
  routes
    .map((route) => {
      const { regexp, paramNames } = replaceDynamicURLSegments(route.route);
      const match = url?.replace(/^\/+/, "/").match(regexp);
      const params = regExpResultToParams(match, paramNames);
      return match ? { match, route, params } : undefined;
    })
    .filter((m) => m);
