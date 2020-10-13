import { invariant } from "@uxland/functional-utilities";
import { IRegionManager } from "./region-manager";
import { validateView } from "./validate-view";
import { ViewDefinition } from "./view-definition";

export interface RegionHost<T = any> extends Element {
  uxlRegion: IRegion<T>;
}

export interface RegionDefinition {
  name: string;
  targetId: string;
  scoped?: boolean;
  options?: any;
  // adapterFactor?: adapterFactory
}

export interface IRegion<T = any> {
  name: string;
  regionManager: IRegionManager;
  host: HTMLElement & RegionHost<T>;
  //   adapter: IRegionAdapter<T>;
  readonly currentActiveViews: ViewDefinition<T>[];
  readonly currentViews: ViewDefinition<T>[];
  context?: any;
  addView(key: string, view: ViewDefinition<T>): Promise<IRegion<T>>;
  getKey(view: ViewDefinition<T>): string;
  containsView(view: string | ViewDefinition<T>): boolean;
  getView(key: string): ViewDefinition<T>;
  removeView(view: string): void;
  viewRemovedFromDom(view: ViewDefinition<T>);
  clearRegion(): void;
  activate(view: string | ViewDefinition<T>): Promise<IRegion<T>>;
  deactivate(view: string | ViewDefinition<T>): Promise<void>;
  isViewActive(view: string | ViewDefinition<T>): boolean;
  toggleViewActive(view: string | ViewDefinition<T>): Promise<boolean>;
}

export class Region<T> implements IRegion<T> {
  protected views: { [key: string]: ViewDefinition<T> } = {};
  protected activeViews: ViewDefinition<T>[] = [];

  currentActiveViews: ViewDefinition<T>[];
  private _currentViews: ViewDefinition<T>[];
  context?: any;

  constructor(
    public name: string,
    public regionManager: IRegionManager,
    public host: HTMLElement & RegionHost<T>,
    // public adapter: IRegionAdapter<T>,
    public definition: RegionDefinition
  ) {
    this.host.uxlRegion = this;
  }

  get currentViews(): ViewDefinition<T>[] {
    return Object.keys(this.views).map((key) => this.views[key]);
  }

  getKey(view: ViewDefinition<T>): string {
    return Object.keys(this.views).find((k) => this.views[k] == view);
  }

  async addView(key: string, view: ViewDefinition<T>): Promise<IRegion<T>> {
    validateView(view);
    invariant(
      typeof this.getView(key) === "undefined",
      `Already exists a view with key ${key}`
    );
    this.views[key] = view;
    return this;
  }

  containsView(view: string | ViewDefinition<T>): boolean {
    if (typeof view === "string") return this.getView(view) != undefined;
    return Object.keys(this.views).some((k) => this.views[k] == view);
  }

  getView(key: string): ViewDefinition<T> {
    return this.views[key];
  }

  removeView(key: string): void {
    delete this.views[key];
  }

  viewRemovedFromDom(view: ViewDefinition<T>) {
    throw new Error("Method not implemented.");
  }

  clearRegion(): void {
    this.views = {};
  }

  async activate(view: string | ViewDefinition<T>): Promise<IRegion<T>> {
    if (typeof view === "string")
      invariant(
        this.getView(view),
        `Region does not contain a view with key ${view}`
      );
    else
      invariant(
        Object.keys(this.views).some(
          (key) => typeof this.views[key] !== "undefined"
        ),
        `Region does not contain this view`
      );
    let vw: ViewDefinition<T> = view as ViewDefinition<T>;
    if (typeof view === "string") vw = this.getView(view);
    if (!this.activeViews.some((v) => v === vw)) {
      console.log("in");
    }
    return this;
  }
  deactivate(view: string | ViewDefinition<T>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  isViewActive(view: string | ViewDefinition<T>): boolean {
    throw new Error("Method not implemented.");
  }
  toggleViewActive(view: string | ViewDefinition<T>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
