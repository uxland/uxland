let STUB = 1;
/**
 * Condition Factory type definition
 * @typedef {function} ConditionFactory
 * @memberof FunctionalUtilities
 * @since v1.0.0
 * @returns {*}
 */
STUB = 1;
export type ConditionFactory = () => any;

/**
 * Check if condition is fulfilled, otherwise throws supplied message error
 * @function invariant
 * @memberof FunctionalUtilities
 * @since v1.0.0
 * @param {ConditionFactory} condition Condition that must be complied
 * @param {string=} message Message error to be thrown in case condition is not fulfilled
 * @returns {void|never}
 * @throws Will throw an error with the message supplied if condition is not fulfilled.
 * @example
 *
 * invariant(R.is('number')(3), 'Supplied value is not a number'); //=> undefined
 * invariant(R.is('number')('3'), 'Supplied value is not a number'); //=> 'Supplied value is not a number'
 *
 */
export const invariant = (condition: any | ConditionFactory, message?: string): void | never => {
  condition = typeof condition === 'function' ? condition() : condition;
  if (!condition) throw new Error(message);
};
