/**
 * Returns nested object value and prototype from provided key.
 * @function
 * @memberof Utilities
 * @since v1.0.0
 * @param {*} input Input object
 * @param {string} key Key from which to obtain end object
 * @returns {*}
 * @example
 *
 * collect('foo', 'foo') //=> {}
 * collect({foo: 'bar'}) //=> {0: 'b', 1: 'a', 2: 'r'}
 * collect({foo: {bar: 'qux'}}) //=> {bar: 'qux'}
 *
 */
export const collect = (what: any, which: string): any =>
  what ? {...what[which], ...collect(Object.getPrototypeOf(what), which)} : {};
