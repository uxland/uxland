import {IRegion, IViewDefinition} from "./definitions";
import {invariant} from "@uxland/functional";

type ViewMap = Map<string, IViewDefinition>;

export class Region implements IRegion{
    private views: ViewMap = new Map<string, IViewDefinition>()

    addView(view: IViewDefinition): IRegion {
        invariant(!this.containsView(view), `Region already contains a view with key '${view.key}'`);
        this.views.set(view.key, view);
        return  this;
    }

    containsView(view: IViewDefinition): boolean {
        return this.views.has(view.key);
    }

}


