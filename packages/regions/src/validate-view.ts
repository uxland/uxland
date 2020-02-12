import { invariant } from '@uxland/functional';
import { ViewDefinition } from './view-definition';

export const validateView = (view: ViewDefinition) => {
  invariant(view.factory || view.constr, 'One of properties factory or constr must be set');
  if (view.factory) invariant(typeof view.factory === 'function', 'factory property must be a function');
  if (view.constr) invariant(typeof view.constr === 'function', 'constr property must be a function');
  return true;
};
