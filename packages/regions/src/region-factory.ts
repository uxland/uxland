import { invariant } from '@uxland/functional';
import { Region, RegionDefinition } from './region';
import { RegionAdapterRegistry } from './region-adapter-registry';
import { IRegionManager } from './region-manager';

const createAdapter = <T>(definition: RegionDefinition, target: T, adapterRegistry: RegionAdapterRegistry<T>) => {
  let adapterFactory = adapterRegistry.getAdapterFactory(target);
  invariant(typeof adapterFactory === 'function', 'No region adapter factory found for the host');
  return adapterFactory(definition, <any>target);
};
export function regionFactory<Element>(
  definition: RegionDefinition,
  host: Element,
  regionManager: IRegionManager,
  adapterRegistry: RegionAdapterRegistry<Element>
): Region;
export function regionFactory<T>(
  definition: RegionDefinition,
  host: T,
  regionManager: IRegionManager,
  adapterRegistry: RegionAdapterRegistry<T>
): Region {
  return ((host as any)._updatePromise || Promise.resolve(true)).then(() => {
    if (((host as unknown) as Element)?.shadowRoot) {
      let target = ((host as unknown) as Element).shadowRoot.querySelector(`#${definition.targetId}`);
      if (target) {
        let adapter = definition.adapterFactory
          ? definition.adapterFactory(definition, <any>target)
          : createAdapter(definition, target, adapterRegistry as any); //TODO: solve issue with adapterRegistry typing
        invariant(adapter, 'No region adapter found for the host');
        let targetRegionManager = definition.scoped ? regionManager.createRegionManager() : regionManager;
        let region = new Region(definition.name, targetRegionManager, target as any, adapter, definition);
        targetRegionManager.add(definition.name, region);
        return region;
      } else console.warn(`region host with id ${definition.targetId} not found for region named ${definition.name}`);
      return undefined;
    }
  });
}
