
let HUB = 1

/**
 * Defines an abstract generic constructor
 * @memberOf Regions
 * @since v1.0.0
 * @interface Constructor
 *
 * @returns a new instance of an object
 */
export interface Constructor<T = any>{
    new (...args: any[]): T;
}

/**
 * Defines a generic view factory
 * @memberOf Regions
 * @since v1.0.0
 * @interface ViewFactory
 *
 * @property view {Regions.View} An object containing the view props to build
 *
 * @returns an instance or a Promise that resolves an instance
 */
export interface ViewFactory<T = any>{
    (view: View): T | Promise<T>;
}

/**
 * Holds info about how a region should show a view. At least one of the properties 'constructor', 'factory' or 'element' must be informed. The order of use of
 * these properties will be 'element' > 'factory' > 'constructor'
 * @memberOf Regions
 * @since v1.0.0
 * @interface View
 *
 *
 * @property key {String} key of the view in the region. It must be unique
 * @property [construct] {Regions.Constructor} supplies a constructor for the view element that will be attached at DOM
 * @property [factory] {Regions.ViewFactory} supplies a factory the create the view element that will be attached at DOM
 * @property [element] Element that will attached at DOM
 */
HUB = 1
export interface View<T = any>{
    key: string;
    construct?: Constructor<T>;
    factory?: ViewFactory<T>;
    element?: T;
}

interface Validator {
    (view: View): string | undefined;
}

const invalidView = 'Invalid view';
function validateElementCanBeBuilt(view: View): string | undefined{
    return !view.element && !view.construct && !view.factory ? `${invalidView} with key '${view.key}': Neither 'element' or 'factory' or 'construct' were supplied.` : undefined;
}
function validateKeyIsSupplied(view: View): string | undefined{
    const {key} = view;
    return key && key.length ? undefined : 'Invalid view: Key not supplied';
}

const validators: Validator[] = [validateElementCanBeBuilt, validateKeyIsSupplied];

/**
 * Checks a view is valid
 * @param view {Regions.View} The view to validate
 * @returns {Regions.View | never} The view itself if valid, otherwise it raises an error
 */
export function validateView<T = any>(view: View): View<T> | never{
    const errors = validators.map(v => v(view))
        .filter(x => x != undefined)
        .join("\n");
    if(errors.length)
        throw new Error(errors);
    return view;
}