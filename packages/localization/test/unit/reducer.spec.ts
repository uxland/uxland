import { reducer } from '../../src';

describe('reducer fixture', () => {
  it('include formats, language and locales', () => {
    const state = reducer(<any>{}, { type: '@@init' });
    expect(Object.keys(state)).toStrictEqual(['formats', 'language', 'locales']);
  });
});
