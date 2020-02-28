import { microTask } from '@uxland/functional-utilities';
import { Store, Unsubscribe } from 'redux';
import { bind } from './bind';

export type Selector<T = any> = (state: any) => T;
export interface PropertyWatch {
  selector: Selector;
  store: Store;
  name: string;
}
export interface ConnectAddOn {
  uxlReduxWatchedProperties: { [key: string]: PropertyWatch };
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

export const connectMixin: (defaultStore?: Store<any, any>) => ConnectMixinFunction = defaultStore => superClass => {
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
