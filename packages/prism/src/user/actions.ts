import { createActionThunk } from '@uxland/redux';
import { FETCH_USER_ACTION, LOGIN_USER_ACTION } from './reducer';

export const fetchUserAction: (action: Function) => any = action => createActionThunk(FETCH_USER_ACTION, action);
export const loginUserAction: (action: Function) => any = action => createActionThunk(LOGIN_USER_ACTION, action);
