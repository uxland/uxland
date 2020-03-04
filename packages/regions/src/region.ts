import { IView, ViewComponent } from './view-definition';
import { IRegionManager } from './region-manager';
import {bind, is, isNil, path, pipe, prop, propSatisfies, tap, then, when} from 'ramda';
import {invariant, isNotNil, isNotNullNeitherEmpty} from '@uxland/functional-utilities';
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
    remove(key: string | IView): Promise<IRegion>;
    activate(view: string | IView): Promise<IRegion>;
    deactivate(view: string | IView): void;
    isViewActive(view: IView): boolean;
    containsView(view: IView): boolean;
    clear(): IRegion
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

    isViewActive(view: IView): boolean {
        return this.activeViews.has(view.key)
    }

    add(view: IView): IRegion {
        validateView(view);
        invariant(!this.containsView(view), `A view with key '${view.key}' already exists`);
        this.regionViews.set(view.key, view);
        return this;
    }

    async remove(view: string | IView): Promise<IRegion> {
        const viewDefinition: IView = this.regionViews.get(getViewKey(view));
        if(isNotNil(viewDefinition)){
            this.regionViews.delete(viewDefinition.key);
            if(await this.deactivate(viewDefinition)){
                let component = this.regionComponents.get(viewDefinition);
                this.regionComponents.delete(component.view);
            }
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

    async activate(view: string | IView): Promise<IRegion> {
        const viewDefinition: IView = this.regionViews.get(getViewKey(view));
        if(!this.isViewActive(viewDefinition)){
            const component = await this.getViewComponent(viewDefinition);
            await this.options.adapter.componentActivated(component);
            this.activeViews.set(viewDefinition.key, viewDefinition);
            component.active = true;
        }
        return this;
    }

    async deactivate(view: string | IView): Promise<IRegion> {
        const viewDefinition: IView = this.regionViews.get(getViewKey(view));
        if(this.isViewActive(viewDefinition)){
            const component = await this.getViewComponent(viewDefinition);
            await this.options.adapter.componentDeactivated(component);
            this.activeViews.delete(viewDefinition.key);
            component.active = false;
        }
        return this;
    }

    containsView(view: IView): boolean {
        return this.regionViews.has(getViewKey(view))
    }

    private clearViews(): void {
        return this.regionViews.clear();
    }

    private clearComponents(): WeakMap<IView, ViewComponent>{
        return this.regionComponents = new WeakMap<IView, ViewComponent>();
    }

    clear(): IRegion{
        this.clearViews();
        this.clearComponents();
        this.activeViews.clear();
        return this;
    }
}
