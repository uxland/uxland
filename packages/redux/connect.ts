import {microTask} from '@uxland/browser-utilities/async/micro-task';
import {Store, Unsubscribe} from 'redux';
import {bind} from './bind';

export type Selector<T = any> = (state: any) => T;
export interface PropertyWatch {
  selector: Selector;
  store: Store;
  name: string;
}
export interface ConnectAddOn {
  uxlReduxWatchedProperties: {[key: string]: PropertyWatch};
  reduxDefaultStore: Store;
  watchProperty: (name: PropertyKey, watch: PropertyWatch) => void;
}

export interface ConnectMixin {
  __reduxStoreSubscriptions__: Unsubscribe[];
}

export interface ConnectMixinConstructor {
  new (...args: any[]): ConnectMixin;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MixinFunction<T> {}
export type ConnectMixinFunction = MixinFunction<ConnectMixinConstructor>;

/**
 * Connect mixin that provides redux functionalities and store access to parent class
 * @mixin
 * @memberof Redux
 * @name connectMixin
 * @since v1.0.0
 * @param {Store} store Store
 * @example
 *
 * connect = connectMixin(defaultStore);
 * BaseClass = class Base {
 *    baseProp = 'foo';
 * };
 * TestClass = class Test extends connect(BaseClass) {};
 *
 */
export const connectMixin: (
  defaultStore?: Store<any, any>
) => ConnectMixinFunction = defaultStore => (superClass: any): ConnectMixinConstructor => {
  class ConnectMixin extends superClass implements ConnectMixin {
    __reduxStoreSubscriptions__: Unsubscribe[];

    constructor() {
      super();
      microTask.run(() => bind(this));
    }

    static get reduxDefaultStore(): Store | undefined {
      return defaultStore;
    }
  }
  return ConnectMixin;
};
