import { IRegion } from './region';

interface Constructable<T> {
  new (...args): T;
}
export type ViewFactory = () => Promise<HTMLElement>;
export interface ViewDefinition<T = any> {
  constr?: Constructable<T>;
  factory?: ViewFactory;
  element?: HTMLElement;
  options?: any;
  isDefault?: boolean;
  removeFromDomWhenDeactivated?: boolean;
  sortHint?: string;
}
export interface ViewComponent<T = any> {
  view: ViewDefinition<T>;
  viewKey: string;
  region: IRegion<T>;
  active: boolean;
  regionContext: any;
}
