import { fetchClient } from '@uxland/fetch-client';
import { store } from '../store';
import { loginUserAction } from './actions';
import { UserInfo } from './reducer';

export type fetchUserFunc = <T extends UserInfo>(username: string, password: string) => Promise<T>;
const toAuthorizationHeader = (username: string, password) => ({
  headers: { Authorization: 'Basic ' + btoa(username + ':' + password) }
});
export const setUserLogin = (fetch: string | fetchUserFunc) => {
  doLogin =
    typeof fetch === 'string' ? (uname, pswrd) => fetchClient.fetch(fetch, toAuthorizationHeader(uname, pswrd)) : fetch;
};

let doLogin: fetchUserFunc;

export const login = async (username: string, password: string) => {
  let userInfo = await store.dispatch(loginUserAction((uname, pwd) => doLogin(uname, pwd))(username, password));
  return userInfo;
};
