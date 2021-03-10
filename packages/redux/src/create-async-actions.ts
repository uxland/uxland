let STUB = 1;
/**
 * Async Actions
 * @interface AsyncActions
 * @memberof Redux
 * @since v1.0.0
 * @property {string} started Action started ID
 * @property {string} failed Action failed ID
 * @property {string} succeeded Action succeeded ID
 * @property {string} ended Action ended ID
 * @property {string} invalidated Action invalidated ID
 */
STUB = 1;
export interface AsyncActions {
  started: string;
  failed: string;
  succeeded: string;
  ended: string;
  invalidated: string;
}

export const ENDED_SUFFIX = '_ENDED';
export const FAILED_SUFFIX = '_FAILED';
export const STARTED_SUFFIX = '_STARTED';
export const SUCCEEDED_SUFFIX = '_SUCCEEDED';
export const INVALIDATED_SUFFIX = '_INVALIDATED';

/**
 * Async action ids creator
 * @function
 * @memberof Redux
 * @name createAsyncActions
 * @since v1.0.0
 * @param {string} actionName Action name to compose async action ids
 * @returns {Redux.AsyncActions}
 * @example
 *
 * createAsyncActions('ACTION') //=> { failed: 'ACTION_FAILED', started: 'ACTION_STARTED', ended: 'ACTION_ENDED', succeeded: 'ACTION_SUCCEEDED', invalidated: 'ACTION_INVALIDATED' }
 *
 */
export const createAsyncActions: (actionName: string) => AsyncActions = actionName => {
  return {
    failed: `${actionName}${FAILED_SUFFIX}`,
    started: `${actionName}${STARTED_SUFFIX}`,
    ended: `${actionName}${ENDED_SUFFIX}`,
    succeeded: `${actionName}${SUCCEEDED_SUFFIX}`,
    invalidated: `${actionName}${INVALIDATED_SUFFIX}`,
  };
};
