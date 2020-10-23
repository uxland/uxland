import {constantBuilder} from "@uxland/functional-utilities";

const eventsBuilder = constantBuilder("uxland-regions", "event");

export const VIEW_REGISTERED = eventsBuilder("view-registered");

/**
 * Defines the interface for the registry of region's content
 */
export interface RegionViewRegistrySpec{

}