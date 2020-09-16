import { always, is, isNil, lensPath, view, when } from 'ramda';
import { Store } from 'redux';
import { ConnectAddOn, Selector } from './connect';
import { createWatchedReduxProperty } from './watched-redux-property';

export interface WatchOptions<> {
  name?: string;
  store?: Store<any, any>;
  selector?: any;
  propertyOptions?: any;
}

const toLensSelector = (path: string): any => view(lensPath(path.split('.')));
const getSelector = (selector: Selector | string): any => when(is(String), toLensSelector)(selector);
const getStore = (store: Store, proto: any): Store =>
  when(isNil, always((proto.constructor as ConnectAddOn).reduxDefaultStore))(store);

export const watch = <T = any>(selector: Selector<T> | string, options: WatchOptions = {}) => (
  proto: any,
  name: PropertyKey
): void => {
  createWatchedReduxProperty(
    {
      name: String(name),
      selector: getSelector(selector),
      store: getStore(options.store, proto),
    },
    proto,
    String(name)
  );
};
