import { IRegion } from './region';
import { ViewComponent, ViewDefinition } from './view-definition';

export const viewFactory = async <T>(
  view: ViewDefinition<T>,
  parentRegion: IRegion,
  viewKey: string
): Promise<T & ViewComponent<T>> => {
  let element: any;
  if (view.factory) element = await view.factory();
  else if (view.constr) element = new view.constr();
  element.view = view;
  element.region = parentRegion;
  element.viewKey = viewKey;
  return element;
};
