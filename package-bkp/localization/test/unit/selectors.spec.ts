import { AppLocalizationState, localizationSelectors, setLocalizationSelector } from '../../src/selectors';
describe('formats-fixture', () => {
  const setFormatsActionName = 'localization:set-formats:action';
  it('default localization selector', () => {
    const state: AppLocalizationState = { localization: { formats: null, language: null, locales: {} } };
    expect(localizationSelectors.localizationSelector(state)).toStrictEqual(state.localization);
    expect(localizationSelectors.formatsSelector(state)).toStrictEqual(state.localization.formats);
    expect(localizationSelectors.languageSelector(state)).toStrictEqual(state.localization.language);
    expect(localizationSelectors.localesSelector(state)).toStrictEqual(state.localization.locales);
  });
  it('set localization selector', () => {
    const state = { aux: { aux: { formats: null, language: null, locales: {} } } };
    const selector = s => s.aux.aux;
    setLocalizationSelector(selector);
    expect(localizationSelectors.localizationSelector(state)).toStrictEqual(state.aux.aux);
    expect(localizationSelectors.formatsSelector(state)).toStrictEqual(state.aux.aux.formats);
    expect(localizationSelectors.languageSelector(state)).toStrictEqual(state.aux.aux.language);
    expect(localizationSelectors.localesSelector(state)).toStrictEqual(state.aux.aux.locales);
  });
});
