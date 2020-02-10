import {AnyAction, Store} from "redux";
import {LocalizationSelectors} from "./selectors";
import {LocalizerFactory} from "./localizer-factory";


export const createLocalizer = (store: Store<any, AnyAction>, localizerFactory: LocalizerFactory, selectors: LocalizationSelectors, useKeyIfMissing: boolean = true) => {
    let currentFormats: any;
    let currentLanguage: string;
    let currentLocales: Object;
    let localizer: (key: string, ...args) => string;
    const setLocalizer = () =>{
        const formats = selectors.formatsSelector(store.getState());
        const language = selectors.languageSelector(store.getState());
        const locales = selectors.localesSelector(store.getState());
        if(formats !== currentFormats || language !== currentLanguage || locales !== currentLocales){
            currentFormats = formats;
            currentLanguage = language;
            currentLocales = locales;
            localizer = localizerFactory(currentLanguage, currentLocales, currentFormats, useKeyIfMissing);
        }
    };

    store.subscribe(setLocalizer);
    setLocalizer();
    return (key: string, ...args) => localizer(key, ...args);
};
