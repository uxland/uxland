
export class RegionManager {
    constructor() {
        this.regionsMap = new Map();
    }

    addRegion(region){
        if(this.regionsMap.has(region.key))
            throw new Error('Duplicated region');
        this.regionsMap.set(region.key, region);
    }
    get regions(){
        return this.regionsMap.values();
    }
}