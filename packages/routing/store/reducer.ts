import {combineReducers, Reducer} from 'redux';
import {Route} from '../router';
import {routeReducer as route} from './route';

export interface RoutingState {
  route: Route;
}
export const reducer: Reducer = combineReducers<RoutingState>({route});
export default reducer;
