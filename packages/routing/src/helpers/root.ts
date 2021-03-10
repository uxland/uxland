import {Route} from '../router';
import {clean} from './clean';

export const root = (url: string, routes: Route[] = []) => {
  if (!url) return undefined;
  const matched = routes.map(r =>
    r.route === '' || r.route === '*' ? url : url.split(new RegExp(r.route + '($|/)'))[0]
  );
  return matched.length
    ? matched.reduce((prev, cur) => (prev.length > cur.length ? cur : prev), url)
    : clean(url);
};
