import { LocalizationState } from "./reducer";
import { createSelector } from "reselect";

export interface LocalizationSelectors {
    localizationSelector: (state: any) => LocalizationState;
    formatsSelector: (state: any) => string;
    languageSelector: (state: any) => string;
    localesSelector: (state: any) => Object;
}

const formatSelectorFactory: (localizationSelector: (state: any) => LocalizationState) => any = localizationSelector =>
    createSelector(localizationSelector, localization => localization.formats);
const languageSelectorFactory: (localizationSelector: (state: any) => LocalizationState) => any = localizationSelector =>
    createSelector(localizationSelector, localization => localization.language);
const localesSelectorFactory: (localizationSelector: (state: any) => LocalizationState) => any = localizationSelector =>
    createSelector(localizationSelector, localization => localization.locales);
export interface AppLocalizationState {
    localization: LocalizationState;
}
const defaultLocalizationSelector = (state: AppLocalizationState) => state.localization;
export const localizationSelectors: LocalizationSelectors = <any>{};
export const setLocalizationSelector: (selector: (state: any) => LocalizationState) => void = selector => {
    localizationSelectors.localizationSelector = selector;
    localizationSelectors.formatsSelector = formatSelectorFactory(selector);
    localizationSelectors.languageSelector = languageSelectorFactory(selector);
    localizationSelectors.localesSelector = localesSelectorFactory(selector);
};
setLocalizationSelector(defaultLocalizationSelector);
