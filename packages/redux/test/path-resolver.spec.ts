import {assert, expect} from '@open-wc/testing';
import {lensPath, lensProp} from 'ramda';
import {mock, spy} from 'sinon';
import {Action, factory, resolvePath} from '../';

describe('resolve path fixture', () => {
  it('should resolve identity if argument is string', () => {
    const lensP = lensProp('property1');
    const path = resolvePath(lensP);
    expect(path).to.equal(lensP);
  });
  it('should invoke path resolver passed as path', () => {
    const path = spy();
    resolvePath(factory(path));
    assert(path.calledOnce);
  });
  it('should pass action to path resolver', () => {
    const action: Action = {type: 'TYPE'};
    const path = spy();
    resolvePath(factory(path), action);
    assert(path.calledWith(action));
  });
  it('should return result of function', () => {
    const action = {type: 'TYPE', payload: 'my-payloda', meta: 'my-meta'};
    const lensP = lensPath(['payload', 'data']);
    // const path = factory(jest.fn(() => lensP));
    const path = factory(mock().returns(lensP));
    const result = resolvePath(path, action);
    expect(result).to.equal(lensP);
  });
});
