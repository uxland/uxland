import {Lens, set} from 'ramda';
import {Reducer} from 'redux';
import {Action} from './create-action';
import {PathResolver, resolvePath} from './path-resolver';

let STUB = 1;
/**
 * Async action factory
 * @interface BasicOptions
 * @memberof Redux
 * @since v1.0.0
 * @property {*=} defValue Default state value
 * @property {*=} path Function that modifies the path
 */
STUB = 1;
export interface BasicOptions<T = any> {
  defValue?: T;
  path?: Lens | PathResolver;
}

const setState = (state: any, action: Action, path: Lens | PathResolver): any =>
  path ? set(resolvePath(path, action), action.payload, state) : action.payload;

/**
 * Creates a reducer for synchronous actions
 * @function
 * @memberof Redux
 * @name createBasicReducer
 * @since v1.0.0
 * @param {string} actionName - Action name
 * @param {Redux.BasicOptions} options - Reducer options
 */
export const createBasicReducer: <T = any>(
  actionName: string,
  options?: BasicOptions<T>
) => Reducer<T> = (actionName, options = {defValue: null}) => (
  state = options.defValue,
  action: Action
): any => (action.type === actionName ? setState(state, action, options.path) : state);
