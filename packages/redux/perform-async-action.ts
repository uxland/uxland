import { Dispatch } from "@reduxjs/toolkit";
import { AsyncReducers, AsyncStateStatus } from "./domain";

export const performAsyncAction = async <T>(
  dispatch: Dispatch,
  actions: AsyncReducers,
  fn: (...args: any[]) => Promise<any>
): Promise<T> => {
  try {
    console.log(actions);
    dispatch(actions.setStatus(AsyncStateStatus.pending));
    const r = await fn();
    dispatch(actions.setData(r));
    dispatch(actions.setStatus(AsyncStateStatus.succeeded));
    return r;
  } catch (error) {
    dispatch(actions.setStatus(AsyncStateStatus.failed));
    dispatch(actions.setError(error.message));
    return Promise.reject(error);
  }
};
