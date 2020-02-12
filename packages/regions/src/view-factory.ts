import { IRegion } from './region';
import { ViewComponent, ViewDefinition } from './view-definition';

export const viewFactory = async <T>(
  view: ViewDefinition<T>,
  parentRegion: IRegion<T>,
  viewKey
): Promise<HTMLElement & ViewComponent<T>> => {
  let element: any;
  if (view.constr) element = new view.constr();
  else if (view.factory) element = await view.factory();
  element.view = view;
  element.region = parentRegion;
  element.viewKey = viewKey;
  return element;
};
