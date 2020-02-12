import { IRegion } from './region';

export type ViewFactory = <T>() => Promise<T>;
export interface Constructable<T> {
  new (): T;
}
export interface ViewDefinition<T = any> {
  constr?: Constructable<T>;
  factory?: ViewFactory;
  options?: any;
  isDefault?: boolean;
  removeFromDomWhenDeactivated?: boolean;
  sortHint?: string;
}

export interface ViewComponent<T = any> {
  view: ViewDefinition<T>;
  viewKey: string;
  region: IRegion;
  active: boolean;
  regionContext: any;
}
