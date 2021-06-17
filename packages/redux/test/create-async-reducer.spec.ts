import {expect} from '@open-wc/testing';
import {lensProp} from 'ramda';
import {AsyncState, createAsyncReducer, factory} from '../';

const action = 'TYPE';
const actionCreator =
  (base: string) =>
  (action: string): string =>
    `${base}_${action}`;
const endedAction = actionCreator(action)('ENDED');
const startedAction = actionCreator(action)('STARTED');
const failedAction = actionCreator(action)('FAILED');
const succeededAction = actionCreator(action)('SUCCEEDED');
const invalidatedAction = actionCreator(action)('INVALIDATED');

describe('create async reducer fixture', () => {
  it('should initialize to default AsyncState', () => {
    const reducer = createAsyncReducer<any>(action);
    const state = reducer(undefined, {type: 'OTHER-TYPE'});
    expect(state).to.deep.equal({
      didInvalidate: false,
      error: false,
      isFetching: false,
    });
  });
  it('should initialize state if default value is supplied', () => {
    const reducer = createAsyncReducer<number>(action, {defValue: 1});
    const state = reducer(undefined, {type: 'OTHER-TYPE'});
    expect(state).to.deep.equal({
      didInvalidate: false,
      state: 1,
      error: false,
      isFetching: false,
    });
  });
  it('should return state if action type is different', () => {
    const reducer = createAsyncReducer<number>(action);
    const state = {
      isFetching: false,
      didInvalidate: false,
      error: false,
      state: 15,
    };
    const newState = reducer(state, {type: 'OTHER-ACTION', payload: 34});
    expect(newState).to.equal(state);
  });
  it('action name is not a valid action', () => {
    const reducer = createAsyncReducer<number>(action);
    const state = {
      isFetching: false,
      didInvalidate: false,
      error: false,
      state: 15,
    };
    const newState = reducer(state, {type: action, payload: 34});
    expect(newState).to.equal(state);
  });
  it('handling action started sets isFetching property to true and resets other properties', () => {
    const reducer = createAsyncReducer<number>(action);
    const state: AsyncState = {
      isFetching: false,
      didInvalidate: true,
      error: true,
      errorDescription: 'myError',
      exceptions: [],
      state: 34,
      timestamp: new Date(),
    };
    const newState = reducer(state, {type: startedAction});
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      isFetching: true,
      didInvalidate: false,
      error: false,
    });
  });
  it('handling action succeeded set state to payload and resets other properties', () => {
    const reducer = createAsyncReducer<number>(action);
    const state: AsyncState = {
      isFetching: false,
      didInvalidate: true,
      error: true,
      errorDescription: 'myError',
      exceptions: [],
      state: 34,
      timestamp: new Date(),
    };
    const newState = reducer(state, {type: succeededAction, payload: 55});
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      isFetching: false,
      didInvalidate: false,
      error: false,
      state: 55,
    });
  });
  it('handling action failed sets error properties', () => {
    const reducer = createAsyncReducer<number>(action);
    const state: AsyncState = {
      isFetching: false,
      didInvalidate: true,
      error: true,
      errorDescription: 'myError',
      exceptions: [],
      state: 34,
      timestamp: new Date(),
    };
    let newState = reducer(state, {
      type: failedAction,
      payload: {message: 'error message'},
    });
    expect(state).not.to.equal(newState);
    const expected = {
      isFetching: false,
      didInvalidate: false,
      error: true,
      errorDescription: 'error message',
      exceptions: [{message: 'error message'}],
    };
    expect(newState).to.deep.equal(expected);
    newState = reducer(state, {type: failedAction});
    expect(newState).to.deep.equal({
      isFetching: false,
      didInvalidate: false,
      error: true,
    });
    newState = reducer(state, {type: failedAction, payload: 34});
    expect(newState).to.deep.equal({
      isFetching: false,
      didInvalidate: false,
      error: true,
      errorDescription: '34',
      exceptions: [34],
    });
  });
  it('handling action ended sets elapsed time', () => {
    const reducer = createAsyncReducer<number>(action);
    const state: AsyncState = {
      isFetching: false,
      didInvalidate: true,
      error: true,
      errorDescription: 'myError',
      exceptions: [],
      state: 34,
      timestamp: new Date(),
    };
    const newState = reducer(state, {type: endedAction, payload: 65});
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({...state, elapsed: 65});
  });
  it('handling action ended should not set elapsed is not supplied', () => {
    const reducer = createAsyncReducer<number>(action);
    const state: AsyncState = {
      isFetching: false,
      didInvalidate: true,
      error: true,
      errorDescription: 'myError',
      exceptions: [],
      state: 34,
      timestamp: new Date(),
    };
    const newState = reducer(state, {type: endedAction});
    expect(state).to.equal(newState);
    expect(newState).to.deep.equal({...state});
  });
  it('actions should set timestamp if supplied in action', () => {
    const timestamp = new Date();
    const reducer = createAsyncReducer<number>(action);
    const state: AsyncState = {
      isFetching: false,
      didInvalidate: false,
      error: false,
      state: 15,
    };
    let newState = reducer(state, {
      type: startedAction,
      payload: 55,
      timestamp,
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      isFetching: true,
      didInvalidate: false,
      error: false,
      timestamp: timestamp,
    });
    newState = reducer(state, {
      type: succeededAction,
      payload: 55,
      timestamp,
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      isFetching: false,
      didInvalidate: false,
      error: false,
      state: 55,
      timestamp: timestamp,
    });
    newState = reducer(state, {
      type: failedAction,
      payload: 'fail',
      timestamp,
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      isFetching: false,
      didInvalidate: false,
      error: true,
      errorDescription: 'fail',
      exceptions: ['fail'],
      timestamp: timestamp,
    });
    newState = reducer(state, {type: endedAction, payload: 35, timestamp});
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      isFetching: false,
      didInvalidate: false,
      error: false,
      state: 15,
      elapsed: 35,
      timestamp: timestamp,
    });
    newState = reducer(state, {
      type: invalidatedAction,
      payload: 35,
      timestamp,
    });
    expect(newState).to.deep.equal({
      isFetching: false,
      didInvalidate: true,
      error: false,
      state: 15,
      timestamp: timestamp,
    });
  });
  it('actions should set timestamp if timestamp resolver option', () => {
    const timestamp = new Date();
    let reducer = createAsyncReducer<{value?: number; timestamp?: Date}>(action, {
      timestampAccessor: a => a.payload.timestamp,
    });
    const state: AsyncState<{value?: number; timestamp?: Date}> = {
      isFetching: false,
      didInvalidate: false,
      error: false,
      state: {value: 15},
    };
    let newState = reducer(state, {
      type: startedAction,
      payload: {timestamp},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      isFetching: true,
      didInvalidate: false,
      error: false,
      timestamp: timestamp,
    });
    newState = reducer(state, {
      type: succeededAction,
      payload: {value: 55, timestamp},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      isFetching: false,
      didInvalidate: false,
      error: false,
      state: {value: 55, timestamp},
      timestamp: timestamp,
    });
    newState = reducer(state, {
      type: failedAction,
      payload: {message: 'fail', timestamp},
      timestamp,
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      isFetching: false,
      didInvalidate: false,
      error: true,
      errorDescription: 'fail',
      exceptions: [{message: 'fail', timestamp}],
      timestamp: timestamp,
    });

    newState = reducer(state, {
      type: invalidatedAction,
      payload: {message: 'fail', timestamp},
      timestamp,
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      isFetching: false,
      didInvalidate: true,
      error: false,
      state: {value: 15},
      timestamp,
    });

    reducer = createAsyncReducer<{value?: number; timestamp?: Date}>(action, {
      timestampAccessor: a => a.timestamp,
    });
    newState = reducer(state, {type: endedAction, payload: 35, timestamp});
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      isFetching: false,
      didInvalidate: false,
      error: false,
      state: {value: 15},
      elapsed: 35,
      timestamp: timestamp,
    });
  });
  it('invalidate action should set didInvalidate property', () => {
    const reducer = createAsyncReducer(action);
    const state: AsyncState = {
      isFetching: false,
      didInvalidate: false,
      error: false,
      state: {value: 15},
    };
    const newState = reducer(state, {
      type: invalidatedAction,
      payload: {value: 18},
    });
    expect(newState).not.to.equal(state);
    expect(newState).to.deep.equal({
      isFetching: false,
      error: false,
      didInvalidate: true,
      state: {value: 15},
    });
  });
  it('succeeded action should use payload accessor if supplied', () => {
    const reducer = createAsyncReducer(action, {
      payloadAccessor: a => a.payload.data,
    });
    const newState = reducer(undefined, {
      type: succeededAction,
      payload: {data: 15},
    });
    expect(newState).to.deep.equal({
      isFetching: false,
      didInvalidate: false,
      error: false,
      state: 15,
    });
  });
});
const dataLensProp = lensProp('data');
const metaPathResolver = factory(action => lensProp(action.meta.propertyId));
describe('create async reducer fixture path resolver', () => {
  it('should initialize to empty object', () => {
    let reducer = createAsyncReducer<any>(action, {
      pathResolver: dataLensProp,
    });
    let newState = reducer(undefined, {type: 'OTHER-TYPE'});
    expect(newState).to.deep.equal({});

    reducer = createAsyncReducer<any>(action, {
      pathResolver: metaPathResolver,
    });
    newState = reducer(undefined, {
      type: 'OTHER-TYPE',
      meta: {propertyId: 'data'},
    });
    expect(newState).to.deep.equal({});
  });
  it('should return state if action type is different', () => {
    let reducer = createAsyncReducer<number>(action, {
      pathResolver: dataLensProp,
    });
    const state = {
      isFetching: false,
      didInvalidate: false,
      error: false,
      state: 15,
    };
    let newState = reducer(state, {type: 'OTHER-ACTION', payload: 34});
    expect(newState).to.equal(state);

    reducer = createAsyncReducer<any>(action, {
      pathResolver: metaPathResolver,
    });
    newState = reducer(state, {type: 'OTHER-ACTION', payload: 34});
    expect(newState).to.equal(state);
  });
  it('action name is not a valid action', () => {
    let reducer = createAsyncReducer<number>(action, {
      pathResolver: dataLensProp,
    });
    const state = {
      isFetching: false,
      didInvalidate: false,
      error: false,
      state: 15,
    };
    let newState = reducer(state, {type: action, payload: 34});
    expect(newState).to.equal(state);

    reducer = createAsyncReducer<any>(action, {
      pathResolver: metaPathResolver,
    });
    newState = reducer(state, {type: action, payload: 34});
    expect(newState).to.equal(state);
  });
  it('handling action started sets isFetching property to true and resets other properties', () => {
    let reducer = createAsyncReducer(action, {pathResolver: dataLensProp});
    const state: any = {
      data: {
        isFetching: false,
        didInvalidate: true,
        error: true,
        errorDescription: 'myError',
        exceptions: [],
        state: 34,
        timestamp: new Date(),
      },
    };
    let newState = reducer(state, {type: startedAction});
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {isFetching: true, didInvalidate: false, error: false},
    });
    reducer = createAsyncReducer<any>(action, {
      pathResolver: metaPathResolver,
    });
    newState = reducer(state, {
      type: startedAction,
      meta: {propertyId: 'data'},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {isFetching: true, didInvalidate: false, error: false},
    });
  });
  it('handling action succeeded set state to payload and resets other properties', () => {
    let reducer = createAsyncReducer<number>(action, {
      pathResolver: dataLensProp,
    });
    const state: any = {
      data: {
        isFetching: false,
        didInvalidate: true,
        error: true,
        errorDescription: 'myError',
        exceptions: [],
        state: 34,
        timestamp: new Date(),
      },
    };
    let newState = reducer(state, {type: succeededAction, payload: 55});
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: false,
        state: 55,
      },
    });

    reducer = createAsyncReducer<number>(action, {
      pathResolver: metaPathResolver,
    });
    newState = reducer(state, {
      type: succeededAction,
      payload: 55,
      meta: {propertyId: 'data'},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: false,
        state: 55,
      },
    });
  });
  it('handling action failed sets error properties', () => {
    const state: any = {
      data: {
        isFetching: false,
        didInvalidate: true,
        error: true,
        errorDescription: 'myError',
        exceptions: [],
        state: 34,
        timestamp: new Date(),
      },
    };
    const expected = {
      data: {
        isFetching: false,
        didInvalidate: false,
        error: true,
        errorDescription: 'error message',
        exceptions: [{message: 'error message'}],
      },
    };

    let reducer = createAsyncReducer<number>(action, {
      pathResolver: dataLensProp,
    });
    let newState = reducer(state, {
      type: failedAction,
      payload: {message: 'error message'},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal(expected);
    newState = reducer(state, {
      type: failedAction,
      meta: {propertyId: 'data'},
    });
    expect(newState).to.deep.equal({
      data: {isFetching: false, didInvalidate: false, error: true},
    });
    newState = reducer(state, {type: failedAction, payload: 34});
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: true,
        errorDescription: '34',
        exceptions: [34],
      },
    });

    reducer = createAsyncReducer<number>(action, {
      pathResolver: metaPathResolver,
    });
    newState = reducer(state, {
      type: failedAction,
      payload: {message: 'error message'},
      meta: {propertyId: 'data'},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal(expected);
    newState = reducer(state, {
      type: failedAction,
      meta: {propertyId: 'data'},
    });
    expect(newState).to.deep.equal({
      data: {isFetching: false, didInvalidate: false, error: true},
    });
    newState = reducer(state, {
      type: failedAction,
      payload: 34,
      meta: {propertyId: 'data'},
    });
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: true,
        errorDescription: '34',
        exceptions: [34],
      },
    });
  });
  it('handling action ended sets elapsed time', () => {
    let reducer = createAsyncReducer<number>(action, {
      pathResolver: dataLensProp,
    });
    const state: any = {
      data: {
        isFetching: false,
        didInvalidate: true,
        error: true,
        errorDescription: 'myError',
        exceptions: [],
        state: 34,
        timestamp: new Date(),
      },
    };
    let newState = reducer(state, {type: endedAction, payload: 65});
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      ...state,
      data: {...state.data, elapsed: 65},
    });
    reducer = createAsyncReducer<number>(action, {
      pathResolver: metaPathResolver,
    });
    newState = reducer(state, {
      type: endedAction,
      payload: 65,
      meta: {propertyId: 'data'},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      ...state,
      data: {...state.data, elapsed: 65},
    });
  });
  it('handling action ended should not set elapsed if not supplied', () => {
    let reducer = createAsyncReducer<number>(action, {
      pathResolver: dataLensProp,
    });
    const state: any = {
      data: {
        isFetching: false,
        didInvalidate: true,
        error: true,
        errorDescription: 'myError',
        exceptions: [],
        state: 34,
        timestamp: new Date(),
      },
    };
    let newState = reducer(state, {type: endedAction});
    expect(state).to.equal(newState);
    expect(newState).to.deep.equal({...state});
    reducer = createAsyncReducer<number>(action, {
      pathResolver: metaPathResolver,
    });
    newState = reducer(state, {
      type: endedAction,
      meta: {propertyId: 'data'},
    });
    expect(state).to.equal(newState);
    expect(newState).to.deep.equal({...state});
  });
  it('actions should set timestamp if supplied in action', () => {
    const timestamp = new Date();
    let reducer = createAsyncReducer<number>(action, {
      pathResolver: dataLensProp,
    });
    const state: any = {
      data: {
        isFetching: false,
        didInvalidate: false,
        error: false,
        state: 15,
      },
    };
    let newState = reducer(state, {
      type: startedAction,
      payload: 55,
      timestamp,
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: true,
        didInvalidate: false,
        error: false,
        timestamp: timestamp,
      },
    });
    newState = reducer(state, {
      type: succeededAction,
      payload: 55,
      timestamp,
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: false,
        state: 55,
        timestamp: timestamp,
      },
    });
    newState = reducer(state, {
      type: failedAction,
      payload: 'fail',
      timestamp,
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: true,
        errorDescription: 'fail',
        exceptions: ['fail'],
        timestamp: timestamp,
      },
    });
    newState = reducer(state, {type: endedAction, payload: 35, timestamp});
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: false,
        state: 15,
        elapsed: 35,
        timestamp: timestamp,
      },
    });
    newState = reducer(state, {
      type: invalidatedAction,
      payload: 35,
      timestamp,
    });
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: true,
        error: false,
        state: 15,
        timestamp: timestamp,
      },
    });

    reducer = createAsyncReducer<number>(action, {
      pathResolver: metaPathResolver,
    });
    newState = reducer(state, {
      type: startedAction,
      payload: 55,
      timestamp,
      meta: {propertyId: 'data'},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: true,
        didInvalidate: false,
        error: false,
        timestamp: timestamp,
      },
    });
    newState = reducer(state, {
      type: succeededAction,
      payload: 55,
      timestamp,
      meta: {propertyId: 'data'},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: false,
        state: 55,
        timestamp: timestamp,
      },
    });
    newState = reducer(state, {
      type: failedAction,
      payload: 'fail',
      timestamp,
      meta: {propertyId: 'data'},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: true,
        errorDescription: 'fail',
        exceptions: ['fail'],
        timestamp: timestamp,
      },
    });
    newState = reducer(state, {
      type: endedAction,
      payload: 35,
      timestamp,
      meta: {propertyId: 'data'},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: false,
        state: 15,
        elapsed: 35,
        timestamp: timestamp,
      },
    });
    newState = reducer(state, {
      type: invalidatedAction,
      payload: 35,
      timestamp,
      meta: {propertyId: 'data'},
    });
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: true,
        error: false,
        state: 15,
        timestamp: timestamp,
      },
    });
  });
  it('actions should set timestamp if timestamp resolver option', () => {
    const timestamp = new Date();
    let reducer = createAsyncReducer<any>(action, {
      timestampAccessor: a => a.payload.timestamp,
      pathResolver: dataLensProp,
    });
    const state: any = {
      data: {
        isFetching: false,
        didInvalidate: false,
        error: false,
        state: {value: 15},
      },
    };
    let newState = reducer(state, {
      type: startedAction,
      payload: {timestamp},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: true,
        didInvalidate: false,
        error: false,
        timestamp: timestamp,
      },
    });
    newState = reducer(state, {
      type: succeededAction,
      payload: {value: 55, timestamp},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: false,
        state: {value: 55, timestamp},
        timestamp: timestamp,
      },
    });
    newState = reducer(state, {
      type: failedAction,
      payload: {message: 'fail', timestamp},
      timestamp,
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: true,
        errorDescription: 'fail',
        exceptions: [{message: 'fail', timestamp}],
        timestamp: timestamp,
      },
    });

    newState = reducer(state, {
      type: invalidatedAction,
      payload: {message: 'fail', timestamp},
      timestamp,
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: true,
        error: false,
        state: {value: 15},
        timestamp,
      },
    });

    reducer = createAsyncReducer<{value?: number; timestamp?: Date}>(action, {
      timestampAccessor: a => a.timestamp,
      pathResolver: dataLensProp,
    });
    newState = reducer(state, {type: endedAction, payload: 35, timestamp});
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: false,
        state: {value: 15},
        elapsed: 35,
        timestamp: timestamp,
      },
    });

    reducer = createAsyncReducer<any>(action, {
      timestampAccessor: a => a.payload.timestamp,
      pathResolver: metaPathResolver,
    });
    newState = reducer(state, {
      type: startedAction,
      payload: {timestamp},
      meta: {propertyId: 'data'},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: true,
        didInvalidate: false,
        error: false,
        timestamp: timestamp,
      },
    });
    newState = reducer(state, {
      type: succeededAction,
      payload: {value: 55, timestamp},
      meta: {propertyId: 'data'},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: false,
        state: {value: 55, timestamp},
        timestamp: timestamp,
      },
    });
    newState = reducer(state, {
      type: failedAction,
      payload: {message: 'fail', timestamp},
      timestamp,
      meta: {propertyId: 'data'},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: true,
        errorDescription: 'fail',
        exceptions: [{message: 'fail', timestamp}],
        timestamp: timestamp,
      },
    });

    newState = reducer(state, {
      type: invalidatedAction,
      payload: {message: 'fail', timestamp},
      timestamp,
      meta: {propertyId: 'data'},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: true,
        error: false,
        state: {value: 15},
        timestamp,
      },
    });

    reducer = createAsyncReducer<{value?: number; timestamp?: Date}>(action, {
      timestampAccessor: a => a.timestamp,
      pathResolver: metaPathResolver,
    });
    newState = reducer(state, {
      type: endedAction,
      payload: 35,
      timestamp,
      meta: {propertyId: 'data'},
    });
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: false,
        state: {value: 15},
        elapsed: 35,
        timestamp: timestamp,
      },
    });
  });
  it('invalidate action should set didInvalidate property', () => {
    let reducer = createAsyncReducer(action, {pathResolver: dataLensProp});
    const state: any = {
      data: {
        isFetching: false,
        didInvalidate: false,
        error: false,
        state: {value: 15},
      },
    };
    let newState = reducer(state, {
      type: invalidatedAction,
      payload: {value: 18},
    });
    expect(newState).not.to.equal(state);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        error: false,
        didInvalidate: true,
        state: {value: 15},
      },
    });
    reducer = createAsyncReducer(action, {pathResolver: metaPathResolver});
    newState = reducer(state, {
      type: invalidatedAction,
      payload: {value: 18},
      meta: {propertyId: 'data'},
    });
    expect(newState).not.to.equal(state);
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        error: false,
        didInvalidate: true,
        state: {value: 15},
      },
    });
  });
  it('succeeded action should use payload accessor if supplied', () => {
    let reducer = createAsyncReducer(action, {
      payloadAccessor: a => a.payload.data,
      pathResolver: dataLensProp,
    });
    let newState = reducer(undefined, {
      type: succeededAction,
      payload: {data: 15},
    });
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: false,
        state: 15,
      },
    });
    reducer = createAsyncReducer(action, {
      payloadAccessor: a => a.payload.data,
      pathResolver: metaPathResolver,
    });
    newState = reducer(undefined, {
      type: succeededAction,
      payload: {data: 15},
      meta: {propertyId: 'data'},
    });
    expect(newState).to.deep.equal({
      data: {
        isFetching: false,
        didInvalidate: false,
        error: false,
        state: 15,
      },
    });
  });
});
