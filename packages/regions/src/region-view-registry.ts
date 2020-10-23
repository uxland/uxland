import {validateView, View} from "./view";
import {constantBuilder} from "@uxland/utilities";
import {publish} from "@uxland/event-aggregator";

let HUB = 1;

const eventBuilder = constantBuilder("@uxland/regions", "event");

/**
 * Event triggered throw EventAggregator when a view is registered with a region name. The payload of the event is {Regions.ViewRegisteredPayload}
 * @memberOf Regions
 * @since v1.0.0
 *
 */
export const VIEW_REGISTERED = eventBuilder('view-registered');

/**
 * Event triggered throw EventAggregator when a view is unregistered from a region name. The payload of the event is {Regions.ViewRegisteredPayload}
 * @memberOf Regions
 * @since v1.0.0
 *
 */
export const VIEW_UNREGISTERED = eventBuilder('view-unregistered');

/**
 *Defines the interface for the registry of region's content
 *
 * @memberOf Regions
 * @since v1.0.0
 * @interface RegionViewRegistry
 *
 * @property getViews Gets all the views associated with a region name
 * @property registerViewWithRegion Registers a view with a region name
 * @property unregisterViewFromRegion Unregisters a view from a region name
 */
HUB = 1;
export interface RegionViewRegistry{
    /**
     * Gets all the views associated with a region name
     *
     * @param regionName{String} Name of the region to get the views of
     * @returns An slice with the views associated withe the region name
     */
    getViews(regionName: string): View[];

    /**
     * Registers a view with a region name
     *
     * @param regionName {String} Name of the region to associate the view to
     * @param view {Regions.View} View to associate
     *
     * @returns the RegionViewRegistry itself to achieve a fluent api
     */
    registerViewWithRegion<T = any>(regionName: string, view:View<T>): RegionViewRegistry;


    /**
     * Unregisters a view from a region name
     * @param regionName {String} Name of the region to dissociate the view to
     * @param view {Regions.View} The view to dissociate
     */
    unregisterViewFromRegion(regionName: string, view: View): void;
    /**
     * Unregisters a view from a region name
     * @param regionName {String} Name of the region to dissociate the view to
     * @param viewKey {String} Key of the view to dissociate
     */
    unregisterViewFromRegion(regionName: string, viewKey: string): RegionViewRegistry;
}

/**
 * Payload for the event {Regions.VIEW_REGISTERED}
 */
export interface ViewRegisteredPayload<T = any>{
    regionName: string;
    view: View<T>;
}

class RegionViewRegistryImpl implements RegionViewRegistry{
    private register = new Map<string, Map<string, View>>();
    getViews(regionName: string): View[] {
        const result = [];
        const regionViews = this.register.get(regionName);
        if(regionViews === undefined)
            return result;
        regionViews.forEach(value => result.push(value));
        return result;
    }

    registerViewWithRegion<T = any>(regionName: string, view: View<T>): RegionViewRegistry {
        validateView(view);
        const regionViews = this.register.get(regionName) || new Map<string, View>();
        if(regionViews.has(view.key))
            throw new Error(`View with key '${view.key}' already registered with region '${regionName}'`);
        regionViews.set(view.key, view);
        this.register.set(regionName, regionViews);
        publish<ViewRegisteredPayload>(VIEW_REGISTERED, {view, regionName});
        return  this;
    }

    unregisterViewFromRegion(regionName: string, view: View): RegionViewRegistry;
    unregisterViewFromRegion(regionName: string, viewKey: string): RegionViewRegistry;
    unregisterViewFromRegion(regionName: string, view: View | string): RegionViewRegistry {
        const key: string = typeof view === "string" ? view as string: (<View>view).key;
        const regionViews = this.register.get(regionName);
        if(regionViews !== undefined){
            const vw = regionViews.get(key);
            if(vw !== undefined){
                regionViews.delete(key);
                publish<ViewRegisteredPayload>(VIEW_UNREGISTERED, {regionName, view: vw});
            }
        }
        return this;
    }

}

export const createRegionViewRegistry: () => RegionViewRegistry = () => new RegionViewRegistryImpl();