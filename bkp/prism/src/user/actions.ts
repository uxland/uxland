import { createAction, createActionThunk } from '@uxland/redux';
import { FETCH_USER_ACTION, LOGIN_USER_ACTION, ModuleInfo, SET_MODULES } from './reducer';

export const fetchUserAction: (action: Function) => any = action => createActionThunk(FETCH_USER_ACTION, action);
export const loginUserAction: (action: Function) => any = action => createActionThunk(LOGIN_USER_ACTION, action);
export const setModulesAction = createAction<ModuleInfo[]>(SET_MODULES);
