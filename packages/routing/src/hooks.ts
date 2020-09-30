import { RouteParams, RouteQueryString } from "./router";

/**+
 *
 */
export interface RouterHooks {
  canNavigateFrom?: (
    url: string,
    params: RouteParams,
    queryString: RouteQueryString
  ) => Promise<boolean>;
  canNavigateTo?: (
    url: string,
    params: RouteParams,
    queryString: RouteQueryString
  ) => Promise<boolean>;
  navigatedFrom?: (
    url: string,
    params: RouteParams,
    queryString: RouteQueryString
  ) => void;
}
