/** @namespace FunctionalUtilities
 */
declare namespace FunctionalUtilities {
    /**
     * Check if condition is fulfilled, otherwise throws supplied message error
     * @function
     * @memberof FunctionalUtilities
     * @since v1.0.0
     * @param {(*|function)} condition Condition that must be complied
     * @param {string=} message Message error to be thrown in case condition is not fulfilled
     * @returns {void|never}
     * @throws Will throw an error with the message supplied if condition is not fulfilled.
     * @example
     *
     * invariant(R.is('number')(3), 'Supplied value is not a number'); //=> undefined
     * invariant(R.is('number')('3'), 'Supplied value is not a number'); //=> 'Supplied value is not a number'
     *
     */
    function invariant(condition: any | ((...params: any[]) => any), message?: string): void | never;
    /**
     * Defines an empty function
     * @function
     * @memberof FunctionalUtilities
     * @since v1.0.0
     * @returns {void}
     * @example
     *
     *  nop() //=> undefined
     */
    function nop(): void;
    /** @namespace FunctionalUtilities.Ramda
     */
    namespace Ramda {
        /**
         * Checks if property is 'id'
         * @function
         * @memberof FunctionalUtilities.Ramda
         * @since v1.0.0
         * @param {string} key Property to be checked
         * @returns {void}
         * @example
         *
         * idEq('id') //=> true
         * idEq('foo') //=> false
         */
        function idEq(key: string): void;
        /**
         * Returns property 'id' of object
         * @function
         * @memberof FunctionalUtilities.Ramda
         * @since v1.0.0
         * @param {object} input Input object
         * @returns {*}
         * @example
         *
         * id({id: 1}) //=> 1
         * id({foo: 'bar'}) //=> undefined
         */
        function id(input: any): any;
        /**
         * Checks whether input is empty
         * @function
         * @memberof FunctionalUtilities.Ramda
         * @since v1.0.0
         * @param {*} input Input to check emptiness
         * @returns {boolean}
         * @example
         *
         * isNotEmpty(undefined) //=> true
         * isNotEmpty(1) //=> true
         * isNotEmpty("1") //=> true
         * isNotEmpty("") //=> false
         * isNotEmpty([]) //=> false
         * isNotEmpty(["foo"]) //=> true
         * isNotEmpty({}) //=> false
         * isNotEmpty({"foo":"bar"}) //=> true
         *
         */
        function isNotEmpty(input: any): boolean;
        /**
         * Checks whether input is not null nor empty
         * @function
         * @memberof FunctionalUtilities.Ramda
         * @since v1.0.0
         * @param {*} input Input to check emptiness or nullity
         * @returns {boolean}
         * @example
         *
         * isNotNullNeitherEmpty(undefined) //=> false
         * isNotNullNeitherEmpty(1) //=> true
         * isNotNullNeitherEmpty("1") //=> true
         * isNotNullNeitherEmpty("") //=> false
         * isNotNullNeitherEmpty([]) //=> false
         * isNotNullNeitherEmpty(["foo"]) //=> true
         * isNotNullNeitherEmpty({}) //=> false
         * isNotNullNeitherEmpty({"foo":"bar"}) //=> true
         *
         */
        function isNotNullNeitherEmpty(input: any): boolean;
        /**
         * Checks whether input is undefined or null
         * @function
         * @memberof FunctionalUtilities.Ramda
         * @since v1.0.0
         * @param {*} input Input to check nullity
         * @returns {boolean}
         * @example
         *
         * isNotNil(undefined) //=> false
         * isNotNil(1) //=> true
         * isNotNil("1") //=> true
         * isNotNil("") //=> true
         * isNotNil([]) //=> true
         * isNotNil(["foo"]) //=> true
         * isNotNil({}) //=> true
         * isNotNil({"foo":"bar"}) //=> true
         *
         */
        function isNotNil(input: any): boolean;
        /**
         * Checks whether input is null or empty
         * @function
         * @memberof FunctionalUtilities.Ramda
         * @since v1.0.0
         * @param {*} input Input to check emptiness or nullity
         * @returns {boolean}
         * @example
         *
         * isNullOrEmpty(undefined) //=> true
         * isNullOrEmpty(1) //=> true
         * isNullOrEmpty("1") //=> true
         * isNullOrEmpty("") //=> true
         * isNullOrEmpty([]) //=> true
         * isNullOrEmpty(["foo"]) //=> true
         * isNullOrEmpty({}) //=> true
         * isNullOrEmpty({"foo":"bar"}) //=> true
         *
         */
        function isNullOrEmpty(input: any): boolean;
        /**
         * Resolves Promise.all
         * @function
         * @memberof FunctionalUtilities.Ramda
         * @since v1.0.0
         * @param {Array.Promise} promises Array of promises to be resolved
         * @returns {Array}
         * @example
         *
         * TBD
         *
         */
        function promiseAll(promises: Array.Promise): any[];
        /**
         * Resolves a promse
         * @function
         * @memberof FunctionalUtilities.Ramda
         * @since v1.0.0
         * @param {Promise} promise Promise to be resolved
         * @returns {*}
         * @example
         *
         * TBD
         *
         */
        function resolve(promise: Promise): any;
        /**
         * Filters out input of empty values/items
         * @function
         * @memberof FunctionalUtilities.Ramda
         * @since v1.0.0
         * @param {!Array} input Input to filter empty values/items
         * @returns {*|void}
         * @example
         *
         * rejectEmpty(1) //=>
         * rejectEmpty("1") //=> 1
         * rejectEmpty("") //=>
         * rejectEmpty([]) //=>
         * rejectEmpty(["foo","",{},{"foo":"bar"}]) //=> foo,[object Object]
         * rejectEmpty({}) //=> [object Object]
         * rejectEmpty({"foo":"bar"}) //=> [object Object]
         *
         */
        function rejectEmpty(input: any[]): any | void;
        /**
         * Filters out input of empty or null values/items
         * @function
         * @memberof FunctionalUtilities.Ramda
         * @since v1.0.0
         * @param {!Array} input Input to filter empty or null values/items
         * @returns {*|void}
         * @example
         *
         * rejectNilOrEmpty(1) //=>
         * rejectNilOrEmpty("1") //=>
         * rejectNilOrEmpty("") //=>
         * rejectNilOrEmpty([]) //=>
         * rejectNilOrEmpty(["foo"]) //=>
         * rejectNilOrEmpty(["foo","",{},{"foo":"bar"}]) //=>
         * rejectNilOrEmpty({}) //=> [object Object]
         * rejectNilOrEmpty({"foo":"bar"}) //=> [object Object]
         *
         */
        function rejectNilOrEmpty(input: any[]): any | void;
        /**
         * Filters out input null or undefined values/items
         * @function
         * @memberof FunctionalUtilities.Ramda
         * @since v1.0.0
         * @param {!Array} input Input to filter empty or null values/items
         * @returns {*|void}
         * @example
         *
         * rejectNil(1) //=>
         * rejectNil("1") //=> 1
         * rejectNil("") //=>
         * rejectNil([]) //=>
         * rejectNil(["foo"]) //=> foo
         * rejectNil(["foo","",{},{"foo":"bar"}]) //=> foo,,[object Object],[object Object]
         * rejectNil({}) //=> [object Object]
         * rejectNil({"foo":"bar"}) //=> [object Object]
         *
         */
        function rejectNil(input: any[]): any | void;
        /**
         * Converts an array to dictionary using provided key as reference
         * @function
         * @memberof FunctionalUtilities.Ramda
         * @since v1.0.0
         * @param {string} key Message error to be thrown in case condition is not fulfilled
         * @returns {T}
         * @throws Will throw an error with the message supplied if condition is not fulfilled.
         * @example
         *
         * toDictionaryBy('id')([{id: 1, description: 'foo'}, {id: 2, description: 'bar'}]) //=> {1: {}}
         *
         */
        function toDictionaryBy(key: string): T;
        /**
         * Check if condition is fulfilled, otherwise throws supplied message error
         * @function
         * @memberof FunctionalUtilities.Ramda
         * @since v1.0.0
         * @param {T[]} items Items to be converted into dictionary
         * @returns {Entity}
         * @throws Will throw an error with the message supplied if condition is not fulfilled.
         * @see FunctionalUtilities.toDictionaryBy
         * @example
         *
         * toDictionary([{id: 1, foo: 'bar'}, {id: 2, foo: 'bar'}]) //=> {1: {foo: 'bar'}, 2: {foo: 'bar'}}
         *
         */
        function toDictionary(items: T[]): Entity;
        /**
         * Splits path by '.' into a string array
         * @function
         * @memberof FunctionalUtilities.Ramda
         * @since v1.0.0
         * @param {(string|Path)} path
         * @returns {string[]}
         * @example
         *
         * toPath('foo.bar') => ['foo', 'bar']
         * toPath('3') => ['3']
         */
        function toPath(path: string | Path): string[];
    }
}

/**
 * Entity interface
 * @interface Entity
 */
declare interface Entity {
    /**
     * Entity id
     * @name Entity#id
     * @constant
     * @type string
     */
    readonly id: string;
}

