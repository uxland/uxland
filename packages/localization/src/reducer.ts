import {combineReducers, Reducer} from "redux";
import {formatReducer} from "./formats";
import {languageReducer} from "./language";
import {localesReducer} from "./locales";

export interface LocalizationState {
    formats: any;
    language: string;
    locales: Object;
}

export const reducer: Reducer = combineReducers<LocalizationState>({formats: formatReducer, language: languageReducer, locales: localesReducer});
