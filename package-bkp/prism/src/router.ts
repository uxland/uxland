import { initializeLinkClickSupport, Router } from '@uxland/routing';
import { Store } from 'redux';
import { PrismAppState } from './store';

export let router: Router;
export const init: (store: Store<PrismAppState>) => void = (store: Store<PrismAppState>) => {
  router = new Router(store.dispatch, window.location.href);
  initializeLinkClickSupport(router);
};
