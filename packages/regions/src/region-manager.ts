import {IRegion} from "./region";
import {invariant, isNotNullNeitherEmpty} from "@uxland/functional-utilities";
import {is, propSatisfies} from "ramda";


function validateRegion(region: IRegion) {
    invariant(isNotNullNeitherEmpty(region), 'region must be defined');
    invariant(propSatisfies(isNotNullNeitherEmpty, 'key', region), 'region key prop must be a non empty string');
    invariant(propSatisfies(is(String), 'key', region), 'region key prop must be a non empty string');

}

export class RegionManager {
    private regionsMap: Map<string, IRegion> = new Map<string, IRegion>();

    get regions(): IterableIterator<IRegion> {
        return this.regionsMap.values();
    }

    add(region: IRegion): RegionManager {
        validateRegion(region);
        invariant(!this.regionsMap.has(region.key), `A region with key '${region.key}' already exists`);
        this.regionsMap.set(region.key, region);
        return this;
    }

    remove(region: IRegion): RegionManager {
        this.regionsMap.delete(region.key);
        return this;
    }

    clear(): RegionManager {
        this.regionsMap.clear();
        return this;
    }

}