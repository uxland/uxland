import { Debouncer, nop, timeOut } from '@uxland/functional-utilities';
import { filter, map, pipe, propEq, reject, uniq, values } from 'ramda';
import { Store, Unsubscribe } from 'redux';
import { PropertyWatch } from './connect';
import { getWatchedProperties } from './watched-redux-property';

const getAllStores = (watchers: { [key: string]: PropertyWatch }): Store<any, any>[] =>
  uniq(map(x => x.store, values(watchers)));
const mapWatchers = (watchersMap: { [key: string]: PropertyWatch }) => values(watchersMap);
const getWatchersByStore: (store: Store) => (watchers: PropertyWatch[]) => PropertyWatch[] = store =>
  filter<PropertyWatch>(propEq('store', store));
const getStoreWatchers = (context: any) => (store: Store<any, any>) =>
  pipe(getWatchedProperties, mapWatchers, getWatchersByStore(store))(context);
const initializeValues = (context: any) => (stores: Store<any, any>[]) => {
  const storeWatchers = map(getStoreWatchers(context), stores);
  storeWatchers.forEach((watcher: any[]) =>
    watcher.forEach(x => (context[x.name] = x.selector.call(context, x.store.getState())))
  );
  return stores;
};
interface PropertyState {
  name: string;
  current: any;
  old?: any;
}
const getProperties = (state: any, context: any): any =>
  map<PropertyWatch, PropertyState>(x => ({
    name: x.name,
    old: context[x.name],
    current: x.selector.call(context, state)
  }));
const rejectUnchanged: (changes: PropertyState[]) => PropertyState[] = reject<PropertyState>(
  x => x?.old === x?.current
);
const updateProperties = (context: any): any =>
  map<PropertyState, void>(change => (context[change.name] = change.current));
const listen = (context: any, store: Store): (() => Debouncer) => {
  const watchers = getStoreWatchers(context)(store);
  const debounceJob = null;
  const update = (): any =>
    pipe(
      (watchers: PropertyWatch[]) => getProperties(store.getState(), context)(watchers),
      rejectUnchanged,
      updateProperties(context),
      nop
    )(watchers);
  return (): Debouncer => Debouncer.debounce(debounceJob, timeOut.after(16), update);
};
const listener = (context: any) => (store: Store): Unsubscribe => store.subscribe(listen(context, store));
const subscribe = (context: any): any => map<Store, Unsubscribe>(listener(context));
const storeSubscriptions = (context: any) => (subscriptions: Unsubscribe[]): any =>
  Object.defineProperty(context, '__reduxStoreSubscriptions__', {
    get(): Unsubscribe[] {
      return subscriptions;
    },
    configurable: true,
    enumerable: true
  });
export const bind: (context: any) => void = context =>
  pipe(
    getWatchedProperties,
    getAllStores,
    initializeValues(context),
    subscribe(context),
    storeSubscriptions(context),
    nop
  )(context);
