import { Action, createAction, createBasicReducer } from '@uxland/redux';
import locActionNamesFactory from './constants';
const setFormatsActionName = locActionNamesFactory('set-formats');
export const formatReducer: (state: any, action: Action<any, any>) => any = createBasicReducer(setFormatsActionName);
export const setFormatsActionCreator = createAction<any, any>(setFormatsActionName);
