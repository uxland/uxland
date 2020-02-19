import { invariant } from '@uxland/functional';
import { adapterFactory } from './region-adapter-registry';
import { IRegionManager } from './region-manager';
import { validateView } from './validate-view';
import { ViewComponent, ViewDefinition } from './view-definition';
import { viewFactory } from './view-factory';

export interface IRegionHost<T = any> extends Element {
  uxlRegion: IRegion<T>;
}
export interface IRegionBehavior {
  attach(): Promise<void>;
  detach(): Promise<void>;
}
export interface IRegionAdapter<T = any> {
  activateView(view: HTMLElement & ViewComponent<T>): Promise<any>;
  deactivateView(view: HTMLElement & ViewComponent<T>): Promise<any>;
  removeView(view: HTMLElement & ViewComponent<T>);
  viewAdded(view: ViewDefinition<T>);
  behaviors: IRegionBehavior[];
}
export interface RegionDefinition {
  name: string;
  targetId: string;
  scoped?: boolean;
  options?: any;
  adapterFactory?: adapterFactory;
}
export interface IRegion<T = any> {
  name: string;
  regionManager: IRegionManager;
  host: HTMLElement & IRegionHost<T>;
  adapter: IRegionAdapter<T>;
  readonly currentActiveViews: ViewDefinition<T>[];
  readonly currentViews: ViewDefinition<T>[];
  addView(key: string, view: ViewDefinition<T>): Promise<IRegion<T>>;
  context?: any;

  removeView(view: string): void;

  activate(view: string | ViewDefinition<T>): Promise<IRegion<T>>;

  deactivate(view: string | ViewDefinition<T>): Promise<void>;

  getView(key: string): ViewDefinition<T>;

  viewRemovedFromDom(view: ViewDefinition<T>);

  getKey(view: ViewDefinition<T>): string;

  isViewActive(view: string | ViewDefinition<T>): boolean;

  toggleViewActive(view: string | ViewDefinition<T>): Promise<boolean>;

  containsView(view: string | ViewDefinition<T>): boolean;
}

export class Region<T> implements IRegion<T> {
  protected views: { [key: string]: ViewDefinition<T> } = {};
  protected activeViews: ViewDefinition<T>[] = [];
  protected components = new WeakMap<ViewDefinition<T>, HTMLElement & ViewComponent<T>>();

  constructor(
    public name: string,
    public regionManager: IRegionManager,
    public host: HTMLDListElement & IRegionHost<T>,
    public adapter: IRegionAdapter<T>,
    public definition: RegionDefinition
  ) {
    this.host.uxlRegion = this;
  }

  async addView(key: string, view: ViewDefinition<T>): Promise<IRegion<T>> {
    validateView(view);
    invariant(typeof this.getView(key) === 'undefined', `Already exists a view with key ${key}`);
    this.views[key] = view;
    await this.adapter.viewAdded(view);
    return this;
  }

  async removeView(view: string) {
    await this.deactivate(view);
    this.remove(view);
    delete this.views[view as string];
  }

  private _context: any;
  public get context() {
    return this._context;
  }
  public set context(ctx: any) {
    this._context = ctx;
    Object.keys(this.views).forEach(vw => {
      let view = this.views[vw];
      if (this.components.has(view)) {
        let element = this.components.get(view);
        if (element) element.regionContext = this._context;
      }
    });
  }

  async activate(view: string | ViewDefinition<T>) {
    let vw: ViewDefinition<T> = view as ViewDefinition<T>;
    if (typeof view === 'string') {
      vw = this.getView(view);
      invariant(vw, `Region does not contain a view with key ${view}`);
    } else
      invariant(
        Object.keys(this.views).some(key => typeof this.views[key] !== 'undefined'),
        'Region does not contain this view'
      );
    if (!this.activeViews.some(v => v === vw)) {
      if (!this.components.has(vw)) {
        let element = await viewFactory(vw, this, typeof view === 'string' ? view : this.getKey(vw));
        element.regionContext = this.context;
        this.components.set(vw, element);
      }
      let element = this.components.get(vw);
      this.activeViews.push(vw);
      element.active = true;
      await this.adapter.activateView(element);
    }
    return this;
  }
  viewRemovedFromDom(view: ViewDefinition<T>) {
    this.components.delete(view);
  }
  remove(view: string | ViewDefinition<T>) {
    let v: ViewDefinition<T> = typeof view === 'string' ? this.getView(view) : (view as ViewDefinition<T>);
    let component = this.components.get(v);
    if (component) {
      this.adapter.removeView(component);
    }
  }
  async deactivate(view: string | ViewDefinition<T>) {
    let v: ViewDefinition<T> = typeof view === 'string' ? this.getView(view) : (view as ViewDefinition<T>);
    let index = this.activeViews.indexOf(v);
    if (index !== -1) this.activeViews.splice(index, 1);
    let component = this.components.get(v);
    if (component) {
      component.active = false;
      await this.adapter.deactivateView(component);
    }
  }

  getView(key: string): ViewDefinition<T> {
    return this.views[key];
  }

  get currentViews(): ViewDefinition<T>[] {
    return Object.keys(this.views).map(key => this.views[key]);
  }

  get currentActiveViews(): ViewDefinition<T>[] {
    return [...this.activeViews];
  }
  getKey(view: ViewDefinition<T>): string {
    return Object.keys(this.views).find(k => this.views[k] == view);
  }
  containsView(view: string | ViewDefinition<T>): boolean {
    if (typeof view === 'string') return this.getView(view) !== undefined;
    return Object.keys(this.views).some(k => this.views[k] == view);
  }
  isViewActive(view: string | ViewDefinition<T>): boolean {
    if (this.containsView(view)) {
      let v: ViewDefinition<T> = typeof view === 'string' ? this.getView(view) : (view as ViewDefinition<T>);
      return this.activeViews.indexOf(v) !== -1;
    }
    throw new Error(`region ${this.name} doest not contain this view`);
  }

  async toggleViewActive(view: string | ViewDefinition<T>): Promise<boolean> {
    if (this.containsView(view)) {
      if (this.isViewActive(view)) {
        await this.deactivate(view);
        return false;
      }
      await this.activate(view);
      return true;
    }
    throw new Error(`region ${this.name} doest not contain this view`);
  }
}
