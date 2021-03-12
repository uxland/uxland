import {RouteQueryString} from '../router';

export const getQueryParametersFromUrl = (url: string): RouteQueryString => {
  const query =
    String(url)
      .split(/\?(.*)?$/)
      .slice(1)
      .join('') || undefined;
  const params: RouteQueryString = query?.split('&').reduce((ps, p) => {
    const [key, value] = p.split('=');
    ps[key] = value;
    return ps;
  }, {});
  return params;
};
