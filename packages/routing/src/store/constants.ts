import {actionNameBuilder} from '@uxland/redux';
const prefix = 'UXL-ROUTING';
export const routingActionNamesFactory = (action: string) => {
  const actionsBuilder = actionNameBuilder(prefix);
  return actionsBuilder(action);
};

export default routingActionNamesFactory;
