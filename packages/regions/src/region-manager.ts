import { IRegion } from './region';
import { invariant, isNotNullNeitherEmpty } from '@uxland/functional-utilities';
import { is, prop, propSatisfies, when } from 'ramda';

export interface IRegionManager {
    add(region: IRegion): IRegionManager;
    remove(region: IRegion | string): boolean;
    clear(): IRegionManager;
    readonly regions: IterableIterator<IRegion>;
}

function validateRegion(region: IRegion) {
    invariant(isNotNullNeitherEmpty(region), 'region must be defined');
    invariant(propSatisfies(isNotNullNeitherEmpty, 'key', region), 'region key prop must be a non empty string');
    invariant(propSatisfies(is(String), 'key', region), 'region key prop must be a non empty string');
}

export class RegionManager implements IRegionManager {
    private regionsMap: Map<string, IRegion> = new Map<string, IRegion>();

    get regions(): IterableIterator<IRegion> {
        return this.regionsMap.values();
    }

    add(region: IRegion): IRegionManager {
        validateRegion(region);
        invariant(!this.regionsMap.has(region.key), `A region with key '${region.key}' already exists`);
        this.regionsMap.set(region.key, region);
        return this;
    }

    remove(region: IRegion | string): boolean {
        return this.regionsMap.delete(when<IRegion | string, string>(is(Object), <any>prop('key'))(region));
    }

    clear(): IRegionManager {
        this.regionsMap.clear();
        return this;
    }
}
