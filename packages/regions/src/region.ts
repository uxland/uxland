import { IView, ViewComponent } from './view-definition';
import { IRegionManager } from './region-manager';
import { bind, is, isNil, pipe, prop, propSatisfies, tap, then, when } from 'ramda';
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
    private regionComponents: WeakMap<IView, ViewComponent> = new WeakMap<IView, ViewComponent>();
    private activeViews: Map<string, IView> = new Map<string, IView>();
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
        const viewDefinition: IView = this.regionViews.get(getViewKey(view));
        const component = await this.getViewComponent(viewDefinition);
        if(!this.activeViews.has(viewDefinition.key)){
            await this.options.adapter.componentActivated(component);
            this.activeViews.set(viewDefinition.key, viewDefinition);
            component.active = true;
        }
        return this;
    }
    private async getViewComponent(viewDefinition: IView): Promise<ViewComponent> {
        let component = this.regionComponents.get(viewDefinition);
        if (isNil(component)) {
            component = await createComponentForRegion(viewDefinition, this);
            await this.options.adapter.componentCreated(component);
            this.regionComponents.set(viewDefinition, component);
        }
        return component;
    }
    async deactivate(view: string | IView): Promise<IRegion> {
        const viewDefinition: IView = this.regionViews.get(getViewKey(view));
        if(this.activeViews.has(viewDefinition.key)){
            const component = await this.getViewComponent(viewDefinition);
            await this.options.adapter.componentDeactivated(component);
            this.activeViews.delete(viewDefinition.key);
            component.active = false;
        }
        return this;
    }
}
