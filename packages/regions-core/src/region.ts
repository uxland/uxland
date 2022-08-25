import {ArgumentNullException, DuplicatedViewException, ViewNotFoundException} from './errors';
import {validate, View} from './view';
import {ViewContainerInterface, RegionAdapterInterface} from './interfaces';

export class Region implements ViewContainerInterface {
  private views: Map<string, View> = new Map<string, View>();

  public activeViews: Set<string> = new Set<string>();

  constructor(private adapter: RegionAdapterInterface) {}

  addView(view: View) {
    validateView(view);
    this.checkKeyNotDuplicated(view.key);
    this.views.set(view.key, view);
  }

  getView(key: string): View {
    return this.views.get(key);
  }

  activate(key: string) {
    this.validateViewExists(key);
    this.activeViews.add(key);
    this.forceRender();
  }

  private forceRender() {
    this.adapter.renderViews(this);
  }

  private checkKeyNotDuplicated(key: string) {
    if (this.views.has(key)) throw new DuplicatedViewException();
  }

  private validateViewExists(key: string) {
    if (!this.views.has(key)) throw new ViewNotFoundException(key);
  }
}

const validateView = (view: View) => {
  if (!view) throw new ArgumentNullException('view');
  validate(view);
};
