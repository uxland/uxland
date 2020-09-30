import { Route } from "../router";
import { clean } from "./clean";

/**
 * Returns root part of url if route is found in routes collection.
 * If not found in routes collection, returns cleaned url.
 * Provided url *should not* include query parameters
 * @param url Provided url to retrieve root segment
 * @param routes Routes collection to determine root segment of provided root
 */
export const root = (url: string, routes: Route[] = []) => {
  if (!url) return undefined;
  const matched = routes.map((r) =>
    r.route === "" || r.route === "*"
      ? url
      : url.split(new RegExp(r.route + "($|/)"))[0]
  );
  return matched.length
    ? matched.reduce(
        (prev, cur) => (prev.length > cur.length ? cur : prev),
        url
      )
    : clean(url);
};
