import { invariant } from '@uxland/functional';
import { ViewDefinition } from './view-definition';

export const validateView = <T>(view: ViewDefinition<T>) => {
  invariant(view.factory || view.constr, 'One of properties constr or factory must be set');
  if (view.factory) invariant(typeof view.factory === 'function', 'factory property must be a function');
  if (view.constr) invariant(typeof view.constr === 'function', 'constr property must be a function');
  return true;
};
