import { IRegionAdapter, IRegionHost, RegionDefinition } from './region';

export type adapterFactory = <T>(definition: RegionDefinition, target: T & IRegionHost) => IRegionAdapter;
