import {expect} from '@open-wc/testing';
import {rejectEmpty} from '../reject-empty';
describe('reject empty fixture', () => {
  it('empty array must be return empty array', () => {
    expect(rejectEmpty([])).to.deep.equal([]);
  });
  it('["foo"] must return same input', () => {
    expect(rejectEmpty(['foo'])).to.deep.equal(['foo']);
  });
  it('["foo", ""] must return array with first item', () => {
    expect(rejectEmpty(['foo', ''])).to.deep.equal(['foo']);
  });
  it('["foo", "", undefined] must return array with first and last items', () => {
    expect(rejectEmpty(['foo', '', undefined])).to.deep.equal(['foo', undefined]);
  });
  it('empty object must return empty object', () => {
    expect(rejectEmpty({})).to.deep.equal({});
  });
  it('object with one informed property must return same object', () => {
    expect(rejectEmpty({foo: 'bar'})).to.deep.equal({foo: 'bar'});
  });
  it('object with one empty property must return object filtered', () => {
    expect(rejectEmpty({foo: 'bar', qux: '', quux: undefined})).to.deep.equal({
      foo: 'bar',
      quux: undefined,
    });
  });
});
