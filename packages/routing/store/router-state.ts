import {Dispatch} from 'redux';
import {RouteDefinition, Router} from '../router';
import {setRouteActionCreator} from './route';

export class RouterState extends Router {
  constructor(
    private dispatch: Dispatch,
    routes: RouteDefinition[] = [],
    protected root?: string,
    protected hash = ''
  ) {
    super(routes, root, hash);
  }

  updateRoute(href: string, params: any, query: string) {
    this.dispatch && this.dispatch(setRouteActionCreator({href, params, query}));
  }
}
