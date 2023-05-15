import pipe from 'ramda/es/pipe';
import tap from 'ramda/es/tap';
import {Action, Store} from 'redux';
import {RESET_STORE_ACTION} from './resetable-reducer';

const resetAction: Action = {type: RESET_STORE_ACTION};
const initAction: Action = {type: '@@uxl-redux:init-state:action'};
const forceReset = (store: Store): Action<any> => store.dispatch(resetAction);
const init = (store: Store): Action<any> => store.dispatch(initAction);

export const resetStore: (store: Store<any, any>) => Store<any, any> = pipe(
  tap(forceReset),
  tap(init)
);
