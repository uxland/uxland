import {IView, ViewComponent} from './view-definition';
import { IRegionManager } from './region-manager';
import { is, prop, propSatisfies, when } from 'ramda';
import { invariant, isNotNullNeitherEmpty } from '@uxland/functional-utilities';
import { RegionAdapter } from './region-adapter';

export interface IRegionHost {
    uxland: IRegion;
}
interface RegionOptions {
    key: string;
    regionManager: IRegionManager;
    host: IRegionHost;
    adapter: RegionAdapter;
}

export interface IRegion {
    options: RegionOptions;
    add(view: IView): IRegion;
    remove(key: string | IView): IRegion;
    activate(view: string | IView): Promise<IRegion>;
    deactivate(view: string | IView): void;
}
function validateView(view: IView) {
    invariant(isNotNullNeitherEmpty(view), 'view must be defined');
    invariant(propSatisfies(isNotNullNeitherEmpty, 'key', view), 'view key prop must be a non empty string');
    invariant(propSatisfies(is(String), 'key', view), 'view key prop must be a string');
}

const getViewKey: (view: string | IView) => string = when(is(Object), prop<string, string>('key'));

async function createComponentForRegion(view: IView, parentRegion: IRegion): Promise<ViewComponent> {
    const component = await view.viewFactory(view);
    component.view = view;
    component.region = parentRegion;
    component.viewKey = view.key;
    return component;
}

export class Region implements IRegion {
    private regionViews: Map<string, IView> = new Map<string, IView>();
    constructor(public options: RegionOptions) {}

    get views(): IterableIterator<IView> {
        return this.regionViews.values();
    }
    add(view: IView): IRegion {
        validateView(view);
        invariant(!this.regionViews.has(view.key), `A view with key '${view.key}' already exists`);
        this.regionViews.set(view.key, view);
        return this;
    }
    remove(view: string | IView): IRegion {
        if (is(String, view)) {
            invariant(this.regionViews.has(<string>view), `view not exist on region ${this.options.key}`);
            this.regionViews.delete(<string>view);
        } else {
            validateView(<IView>view);
            invariant(this.regionViews.has((<IView>view).key), `view not exist on region ${this.options.key}`);
            this.regionViews.delete((<IView>view).key);
        }
        return this;
    }
    async activate(view: string | IView): Promise<IRegion> {
        const viewDefinition = this.regionViews.get(getViewKey(view));
        const component = await createComponentForRegion(viewDefinition, this);
        await this.options.adapter.componentCreated(component);
        await this.options.adapter.componentActivated(component);
        component.active = true;
        return this;
    }

    deactivate(view: string | IView): IRegion {
        /*for (const item of Array.from(this.regionViews.values())) {
            if (is(String, view)) {
                if ((view as string) === (item as IView).key) {
                    invariant(this.isViewActive(item.key), `View ${item.key} is already inactive`);
                    (item as IView).active = false;
                }
            } else {
                if ((view as IView).key === (item as IView).key) {
                    invariant(this.isViewActive(item.key), `View ${item.key} is already inactive`);
                    (item as IView).active = false;
                }
            }
        }
        return this;*/
        return this;
    }
}
