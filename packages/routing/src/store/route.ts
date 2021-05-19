import {Action} from '@uxland/redux';
import {Reducer} from 'redux';
import {Route} from '../router';
import createRouteStateFeature from './create-route-state-feature';

const feature = createRouteStateFeature('route', {href: ''});
export const routeReducer: Reducer<Route> = feature.reducer;
export const setRouteActionCreator: (route: Route) => Action<Route> = feature.setActionCreator;
