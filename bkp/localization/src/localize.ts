import {Localizer} from "./localizer-factory";

let internalLocalizer: Localizer;
export const initializeLocalizer = (localizer: Localizer) => internalLocalizer = localizer;
export const localize: Localizer = (key, ...args) =>{
    if(!internalLocalizer)
        throw new Error('Default localizer has not been initialized. Please, call initializeLocalizer firsT in order to create a default localizer');
    return internalLocalizer(key, ...args);
};
