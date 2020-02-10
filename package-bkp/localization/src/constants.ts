import { actionNameBuilder } from '@uxland/redux';
const prefix = 'localization';

export const locActionNamesFactory = (action: string) => {
  const actionsBuilder = actionNameBuilder(prefix);
  return actionsBuilder(action);
};

export default locActionNamesFactory;
