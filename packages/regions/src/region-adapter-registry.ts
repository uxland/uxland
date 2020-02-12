import { IRegionAdapter, IRegionHost, RegionDefinition } from './region';

export type adapterFactory = <T>(definition: RegionDefinition, target: T & IRegionHost) => IRegionAdapter;
const defaultAdapterKey = 'default';
const dynamicAdapterKey = 'dynamic';
export interface DynamicFactory<T> {
  (host: T): adapterFactory;
}
export class RegionAdapterRegistry<T> {
  adapterRegistry = new Map<any, adapterFactory | DynamicFactory<T>[]>();

  constructor() {
    this.adapterRegistry.set(dynamicAdapterKey, []);
  }

  registerAdapterFactory(key: any, adapter: adapterFactory) {
    this.adapterRegistry.set(key, adapter);
  }

  get dynamicFactories(): DynamicFactory<T>[] {
    return this.adapterRegistry.get(dynamicAdapterKey) as DynamicFactory<T>[];
  }

  registerDynamicAdapterFactory(factory: DynamicFactory<T>) {
    if (this.dynamicFactories.indexOf(factory) === -1) this.dynamicFactories.push(factory);
  }

  getDynamicFactory(host: T): adapterFactory {
    return this.dynamicFactories.reduce(
      (previousValue, currentValue) => previousValue || currentValue(host),
      <adapterFactory>null
    );
  }

  getAdapterFactory(host: T): adapterFactory {
    let dynamicFactory = this.getDynamicFactory(host);
    if (dynamicFactory) return dynamicFactory;
    if (this.adapterRegistry.has(host.constructor)) return this.adapterRegistry.get(host.constructor) as adapterFactory;
    // TODO: revise this if needed
    // if (this.adapterRegistry.has(host.localName)) return this.adapterRegistry.get(host.localName) as adapterFactory;
    // if (this.adapterRegistry.has(host.tagName)) return this.adapterRegistry.get(host.tagName) as adapterFactory;
    if (this.adapterRegistry.has(defaultAdapterKey))
      return this.adapterRegistry.get(defaultAdapterKey) as adapterFactory;
    return null;
  }

  registerDefaultAdapterFactory(factory: adapterFactory) {
    this.adapterRegistry.set(defaultAdapterKey, factory);
  }
}
export const regionAdapterRegistry = new RegionAdapterRegistry();
