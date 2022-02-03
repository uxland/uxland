import {expect} from '@open-wc/testing';
import {rejectNilOrEmpty} from '../reject-nil-or-empty';

describe('reject nil or empty', () => {
  it('empty array must be return empty array', () => {
    expect(rejectNilOrEmpty([])).to.deep.equal([]);
  });
  it('["foo"] must return same input', () => {
    expect(rejectNilOrEmpty(['foo'])).to.deep.equal(['foo']);
  });
  it('["foo", ""] must return array with first item', () => {
    expect(rejectNilOrEmpty(['foo', ''])).to.deep.equal(['foo']);
  });
  it('["foo", "", undefined] must return array with first and last items', () => {
    expect(rejectNilOrEmpty(['foo', ''])).to.deep.equal(['foo']);
  });
  it('empty object must return empty object', () => {
    expect(rejectNilOrEmpty({})).to.deep.equal({});
  });
  it('object with one informed property must return same object', () => {
    expect(rejectNilOrEmpty({foo: 'bar'})).to.deep.equal({foo: 'bar'});
  });
  it('object with one empty property must return object filtered', () => {
    expect(rejectNilOrEmpty({foo: 'bar', qux: '', quux: undefined})).to.deep.equal({
      foo: 'bar',
    });
  });
});
