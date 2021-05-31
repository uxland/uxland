import {always, is, isNil, lensPath, view, when} from 'ramda';
import {Store} from 'redux';
import {ConnectAddOn, Selector} from './connect';
import {createWatchedReduxProperty} from './watched-redux-property';

let STUB = 1;
/**
 * Async action factory
 * @interface WatchOptions
 * @memberof Redux
 * @since v1.0.0
 * @property {string*=} name - Name accessor
 * @property {Store*=} store - Store to watch
 * @property {*=} selector - Selector to use to return state portion
 * @property {*=} propertyOptions - Options of the watched property
 */
export interface WatchOptions {
  name?: string;
  store?: Store<any, any>;
  selector?: any;
  propertyOptions?: any;
}
STUB = 1;

const toLensSelector = (path: string): any => view(lensPath(path.split('.')));
const getSelector = (selector: Selector | string): any =>
  when(is(String), toLensSelector)(selector);
const getStore = (store: Store, proto: any): Store =>
  when(isNil, always((proto.constructor as ConnectAddOn).reduxDefaultStore))(store);

/**
 * Watch decorator that watcher for state changes via the provided selector
 * @function
 * @memberof Redux
 * @name performAsyncAction
 * @since v1.0.0
 * @param {Redux.Selector} selector - Selector that returns the state portion
 * @param {Redux.WatchOptions} options - Watch options
 * @returns {*}
 */
export const watch =
  <T = any>(selector: Selector<T> | string, options: WatchOptions = {}) =>
  (proto: any, name: PropertyKey): void => {
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
