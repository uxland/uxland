import {ViewContainerInterface} from "./view-container.interface";

export interface RegionAdapterInterface {
    renderViews(viewContainer: ViewContainerInterface);
}