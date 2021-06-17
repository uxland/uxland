import {expect} from '@open-wc/testing';
import lensProp from 'ramda/es/lensProp';
import {createBasicReducer, factory} from '../';
const action = 'MY-ACTION';
describe('create basic reducer fixture', () => {
  it('basic reducer should initialize default value', () => {
    const initialValue = 10;
    const reducer = createBasicReducer<number>(action, {
      defValue: initialValue,
    });
    const value = reducer(undefined, {type: '@@INIT'});
    expect(value).to.equal(initialValue);
  });
  it('basic reducer should set action payload value', () => {
    const reducer = createBasicReducer<number>(action);
    const value = reducer(undefined, {type: action, payload: 10});
    expect(value).to.equal(10);
  });
  it('basic reducer should be immutable', () => {
    const state = {myValue: 10};
    const reducer = createBasicReducer(action);
    const newState: any = reducer(state, {
      type: action,
      payload: {myValue: 11},
    });
    expect(newState.myValue).to.equal(11);
    expect(newState).not.to.equal(state);
  });
  it('basic reducer should return state if action type is different', () => {
    const state = {myValue: 10};
    const reducer = createBasicReducer(action);
    const newState: any = reducer(state, {
      type: 'OTHER-ACTION',
      payload: {myValue: 11},
    });
    expect(newState).to.equal(state);
    expect(newState.myValue).to.equal(10);
  });
  it('basic reducer should set subproperty if path is supplied', () => {
    const state = {property1: 'hello', property2: 'bye'};
    let reducer = createBasicReducer(action, {path: lensProp('property1')});
    let newState = reducer(state, {type: action, payload: 'hello world'});
    expect(state).not.to.equal(newState);
    expect(newState).to.deep.equal({
      property1: 'hello world',
      property2: 'bye',
    });
    reducer = createBasicReducer(action, {
      path: factory(a => lensProp(a.meta)),
    });
    newState = reducer(state, {
      type: action,
      payload: 'hello world again',
      meta: 'property2',
    });
    expect(newState).not.to.equal(state);
    expect(newState).to.deep.equal({
      property1: 'hello',
      property2: 'hello world again',
    });
  });
});
