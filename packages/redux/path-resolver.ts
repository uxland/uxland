import {identity, ifElse, is, Lens} from 'ramda';
import 'reflect-metadata';
import {Action} from './create-action';

let STUB = 1;
/**
 * Async action factory
 * @interface PathResolver
 * @memberof Redux
 * @since v1.0.0
 * @property {action => Lens} resolver Resolver function that returns path lens
 */
export interface PathResolver {
  resolver: (action: Action) => Lens;
}
STUB = 1;

export type Resolver = (action: Action) => Lens;
export const factory = (resolver: Resolver): PathResolver => ({resolver} as PathResolver);

/**
 * Resolves state path
 * @function
 * @memberof Redux
 * @name resolvePath
 * @since v1.0.0
 * @param {Redux.PathResolver} path - Path resolver function
 * @param {Action} action - Redux action
 * @returns {Lens}
 */
export const resolvePath: (path: Lens | PathResolver, action?: Action) => Lens = (path, action) =>
  ifElse(is(Function), identity, (pr: PathResolver) => pr.resolver(action))(path);
