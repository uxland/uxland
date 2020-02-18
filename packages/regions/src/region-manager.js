import * as R from 'ramda';
import {isNullOrEmpty} from "@uxland/functional/src";
import {isNil} from "ramda";

export class RegionManager {
    constructor() {
        this.regionsMap = new Map();
    }
    get regions(){
        return this.regionsMap.values();
    }
    addRegion(region){
        if(this.validateRegion(region)) {
            if (this.regionsMap.has(region.key))
                this.throwError('Duplicated region');
            this.regionsMap.set(region.key, region);
        }
    }
    removeRegion(region){
        let deleteRegion;
        if(this.validateRegion(region))
         deleteRegion = this.regionsMap.delete(region.key);
        if(!deleteRegion)
            this.throwError('Region was not defined yet');
    }
    clearAllRegions(){
        this.regionsMap.clear();
    }
    validateRegion(region){
        R.when(isNullOrEmpty,()=>this.throwError('Invalid region object'))(region);
        R.when(isNil,()=>this.throwError('Invalid region object'))(region.key);
        return true;
    }

    throwError(message) {
        throw new Error(message)
    }

}