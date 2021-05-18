import {Action, createAction, createBasicReducer} from '@uxland/redux';
import {Reducer} from 'redux';
import {routingActionNamesFactory} from './constants';
import {Route} from './reducer';
export const createRouteStateFeature = (name, defValue?: Route) => {
  const setActionName = routingActionNamesFactory(`SET-${name.toUpperCase()}`);
  return {
    reducer: createBasicReducer<any>(setActionName, {
      defValue: defValue,
    }) as Reducer<Route, Action>,
    setActionCreator: createAction<Route>(setActionName),
  };
};
export default createRouteStateFeature;
