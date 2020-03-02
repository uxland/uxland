import {IView} from "./view-definition";
import {IRegionManager} from "./region-manager";
import {is, propSatisfies} from "ramda";
import {invariant, isNotNullNeitherEmpty} from "@uxland/functional-utilities";

export interface IRegionHost {
    uxland: IRegion;
}
export interface IRegion {
    key: string;
    regionManager: IRegionManager;
    add(view: IView): IRegion;
    remove(key: string | IView): IRegion;
    activate(view: string | IView): IRegion;
    deactivate(view: string | IView): void;
    getView(key: string): IView;
    isViewActive(view: string | IView): boolean;
    containsView(view: string | IView): boolean;
    toggleViewActive(view: string | IView): boolean;
}
function validateView(view: IView) {
    invariant(isNotNullNeitherEmpty(view), 'view must be defined');
    invariant(propSatisfies(isNotNullNeitherEmpty, 'key', view), 'view key prop must be a non empty string');
    invariant(propSatisfies(is(String), 'key', view), 'view key prop must be a non empty string');
}

export class Region implements IRegion{
    private regionViews: Map<string, IView> = new Map<string, IView>();
    constructor(
        public key: string,
        public regionManager: IRegionManager,
        public host: IRegionHost
    ) {
        //this.host.uxland = this;
    }

    get views(): IterableIterator<IView>{
        return this.regionViews.values();
    }
    add(view: IView): IRegion{
        validateView(view)
        invariant(!this.regionViews.has(view.key), `A view with key '${view.key}' already exists`);
        this.regionViews.set(view.key, view);
        return this;
    }
    remove(view: string | IView): IRegion{
        if(is(String, view))
            this.regionViews.delete(view as string);
        else
            this.regionViews.delete((view as IView).key);
        return this;
    };
    activate(view: string | IView): IRegion{
        this.regionViews.forEach( (v:IView) => {
            if(is(String, view)) {
                if ((view as string) === v.key)
                    v = {...v, active: true}
            }
            else {
                if ((view as IView).key === v.key) {
                    v = {...v, active: true}
                }
            }
        });
        return this;
    };

    deactivate(view: string | IView): IRegion{
        this.regionViews.forEach( (v:IView) => {
            if(is(String, view)) {
                if ((view as string) === v.key)
                    v = {...v, active: true}
            }
            else {
                if ((view as IView).key === v.key) {
                    v = {...v, active: false}
                }
            }
        });
        return this
    };
    getView(key: string): IView{
        return this.regionViews.get(key);
    };
    isViewActive(view: string | IView): boolean{
        let v: IView;
        if(is(String, view))
            v =this.regionViews.get(view as string);
        else
            v =this.regionViews.get((view as IView).key);
        return v.active;
    };
    containsView(view: string | IView): boolean{
        if(is(String, view))
            return this.regionViews.has(view as string);
        else
            return this.regionViews.has((view as IView).key);

    }
    toggleViewActive(view: string | IView): boolean{
        if(this.containsView(view)) {
            if (this.isViewActive(view)) {
                this.activate(view);
                return true;
            }
            this.deactivate(view);
            return false;
        }
        throw new Error(`region ${this.key} doest not contain this view`)
    };

}