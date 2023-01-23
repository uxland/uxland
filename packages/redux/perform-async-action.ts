import { CaseReducerActions, Dispatch } from "@reduxjs/toolkit";
import { AsyncCaseReducers, AsyncStateStatus } from "./domain";

export const performAsyncAction = async <T>(
  dispatch: Dispatch,
  actions: CaseReducerActions<AsyncCaseReducers<T>, string>,
  fn: (...args: any[]) => Promise<any>
): Promise<T> => {
  try {
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
