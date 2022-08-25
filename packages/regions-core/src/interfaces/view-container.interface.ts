import {View} from '../view';

export interface ViewContainerInterface {
  activeViews: Set<string>;
  getView(key: string): View;
}
