import { formatReducer, setFormatsActionCreator } from '../../src';

describe('formats-fixture', () => {
  const setFormatsActionName = 'localization:set-formats:action';
  it('reducer initialize formats to null', () => {
    const state = formatReducer(undefined, { type: 'any' });
    expect(state).toBeNull();
  });
  it('reducer sets format', () => {
    let state = formatReducer(undefined, { type: setFormatsActionName, payload: 'formats' });
    expect(state).toEqual('formats');
    const initial = 'initial';
    state = formatReducer(initial, { type: setFormatsActionName, payload: 'formats' });
    expect(state).not.toStrictEqual(initial);
    expect(state).toEqual('formats');
  });
  it('action creator', () => {
    expect(setFormatsActionCreator(25)).toStrictEqual({ type: setFormatsActionName, payload: 25 });
  });
});
