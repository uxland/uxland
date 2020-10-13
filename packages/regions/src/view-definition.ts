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
