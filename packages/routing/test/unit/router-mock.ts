import {Router as CoreRouter} from '../../src/router';

export default class Router extends CoreRouter {
  navigate(href: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
