import { languageReducer, setLanguageActionCreator } from '../../src';

describe('language fixture', () => {
  const setFormatsActionName = 'localization:set-language:action';
  it('reducer initialize formats to null', () => {
    const state = languageReducer(undefined, { type: 'any' });
    expect(state).toBeNull();
  });
  it('reducer sets language', () => {
    let state = languageReducer(undefined, { type: setFormatsActionName, payload: 'ca' });
    expect(state).toEqual('ca');
    const initial = 'initial';
    state = languageReducer(initial, { type: setFormatsActionName, payload: 'en' });
    expect(state).not.toStrictEqual(initial);
    expect(state).toEqual('en');
  });
  it('action creator', () => {
    expect(setLanguageActionCreator('ca', undefined)).toStrictEqual({ type: setFormatsActionName, payload: 'ca' });
  });
});
