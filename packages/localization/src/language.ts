import { Action, createAction, createBasicReducer } from '@uxland/redux';
import locActionNamesFactory from './constants';
const setLanguageActionName = locActionNamesFactory('set-language');
export const languageReducer: (state: any, action: Action<any, any>) => any = createBasicReducer(setLanguageActionName);
export const setLanguageActionCreator = createAction<string, any>(setLanguageActionName);
