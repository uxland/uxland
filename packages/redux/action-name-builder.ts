import {constantBuilder, ConstantBuilder} from '@uxland/utilities/constant-builder';

/**
 * Action name builder
 * @function
 * @memberof Redux
 * @name actionNameBuilder
 * @since v1.0.0
 * @param {string} prefix Action prefix
 * @param {string=} separator String separator between prefix, constant and suffix
 * @returns {Utilities.ConstantBuilder}
 * @see Utilities.ConstantBuilder
 * @example
 *
 * actionNameBuilder('PREFIX', '@@')('NAME') //=> 'PREFIX@@NAME@@ACTION'
 *
 */
export const actionNameBuilder = (prefix: string, separator?: string): ConstantBuilder => {
  const builder = constantBuilder(prefix, 'ACTION', separator);
  return (name: string): string => builder(name);
};
