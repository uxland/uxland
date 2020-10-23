import {Region} from "./region";
import {View} from "./view";

/**
 * Defines an interface to manage a set of {Regions.Region} regions and to attach regions to objects (typically UI elements)
 * @memberOf Regions
 * @since v1.0.0.0
 * @interface RegionManager
 *
 * @property regions {Regions.Region} Returns an slice with all the regions managed by the RegionManager
 * @property createRegionManager  Creates a new region manager that can be used as a different scope from the current region manager
 * @property addToRegion Adds a view to a region.Note that the region must already exist in the region manager
 */
export interface RegionManager{
    /**
     * returns an slice with all the regions managed by the RegionManager
     * @returns {Regions.Region[]}
     */
    regions: Region[];

    /**
     * Creates a new region manager that can be used as a different scope from the current region manager
     * @returns {Regions.RegionManager}
     */
    createRegionManager(): RegionManager;

    /**
     * Adds a view to a region.Note that the region must already exist in the region manager
     * @param regionName {String} name of the region in the region manager. It must exist!
     * @param view {Regons.View} the view to add to the target region
     *
     * @returns {Regions.RegionManager} The region manager itself to achieve fluent api
     */
    addToRegion<T = any>(regionName: string, view: View): RegionManager;

    /**
     * Adds a region to the region manager
     * @param region {Regions.Region}
     * @returns {Regions.RegionManager} The region manager itself to achieve fluent api
     */

    add(region: Region): RegionManager;

    /**
     * Gets a region
     * @param regionName {String} name of the region to be retrieved
     */

    getRegion(regionName: string): Region | undefined;
}

class RegionManagerBase implements RegionManager{
    private regionsMap = new Map<string, Region>()

    get regions(): Region[]{
        const result = [];
        this.regionsMap.forEach(result.push.bind(result));
        return result;
    }

    add(region: Region): RegionManager {
        this.regionsMap.set(region.options.name, region);
        return this;
    }

    addToRegion<T = any>(regionName: string, view: View): RegionManager {
        const region = this.regionsMap.get(regionName);
        if(region == undefined)
            throw new Error(`Region '${regionName}' not found`);
        region.addView(view);
        return this;
    }

    createRegionManager(): RegionManager {
        return new RegionManagerBase();
    }

    getRegion(regionName: string): Region | undefined {
        return this.regionsMap.get(regionName);
    }
}

class MainRegionManager extends RegionManagerBase{

}

export const createRegionManager = () => new MainRegionManager();