import { localesReducer, setLocalesActionCreator } from '../../src/locales';

describe('locales-fixture', () => {
  const setLocalesActionName = 'localization:set-locales:action';
  it('reducer returns state if action is different', () => {
    const current = { ca: { label: 'my label' } };
    const state = localesReducer(current, { type: 'Other', payload: { ca: { label2: 'other label' } } });
    expect(state).toStrictEqual(current);
  });
  it('reducer initialize locales to empty', () => {
    const state = localesReducer(undefined, { type: 'any' });
    expect(state).toStrictEqual({});
  });
  it('reducer merges locales', () => {
    const newLocales = {
      ca: {
        level2: {
          level21: {
            item211: 'myItem211'
          }
        },
        level3: {
          level31: 'item31'
        }
      }
    };
    let state = localesReducer(undefined, { type: setLocalesActionName, payload: newLocales });
    expect(state).toStrictEqual(newLocales);
    const currentState = {
      ca: {
        level2: {
          level21: {
            item211: 'initial',
            item212: 'other item'
          },
          level22: {
            item221: 'aux'
          }
        }
      }
    };
    state = localesReducer(currentState, { type: setLocalesActionName, payload: newLocales });
    expect(state).toStrictEqual({
      ca: {
        level2: {
          level21: {
            item211: 'myItem211',
            item212: 'other item'
          },
          level22: {
            item221: 'aux'
          }
        },
        level3: {
          level31: 'item31'
        }
      }
    });
  });
  it('action creator', () => {
    const locales = { ca: { item: 'my item' } };
    const action = setLocalesActionCreator({ ...locales });
    expect(action).toStrictEqual({ type: setLocalesActionName, payload: locales });
  });
});
