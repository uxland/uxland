import { ViewComponent } from './view-definition';

export interface RegionAdapter {
    componentCreated(component: ViewComponent): Promise<void>;
    componentActivated(component: ViewComponent): Promise<void>;
    componentDeactivated(component: ViewComponent): Promise<void>
}
