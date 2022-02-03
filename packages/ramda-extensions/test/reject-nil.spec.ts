import {expect} from '@open-wc/testing';
import {rejectNil} from '../reject-nil';

describe('reject nil fixture', () => {
  it('empty array must be return empty array', () => {
    expect(rejectNil([])).to.deep.equal([]);
  });
  it('["foo"] must return same input', () => {
    expect(rejectNil(['foo'])).to.deep.equal(['foo']);
  });
  it('["foo", ""] must return array with first item', () => {
    expect(rejectNil(['foo', ''])).to.deep.equal(['foo', '']);
  });
  it('["foo", "", undefined] must return array with first and last items', () => {
    expect(rejectNil(['foo', '', undefined])).to.deep.equal(['foo', '']);
  });
  it('empty object must return empty object', () => {
    expect(rejectNil({})).to.deep.equal({});
  });
  it('object with one informed property must return same object', () => {
    expect(rejectNil({foo: 'bar'})).to.deep.equal({foo: 'bar'});
  });
  it('object with one empty property must return object filtered', () => {
    expect(rejectNil({foo: 'bar', qux: '', quux: undefined})).to.deep.equal({
      foo: 'bar',
      qux: '',
    });
  });
});
