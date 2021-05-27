import {rejectNil} from '../reject-nil';

describe('reject nil fixture', () => {
  it('empty array must be return empty array', () => {
    expect(rejectNil([])).toEqual([]);
  });
  it('["foo"] must return same input', () => {
    expect(rejectNil(['foo'])).toEqual(['foo']);
  });
  it('["foo", ""] must return array with first item', () => {
    expect(rejectNil(['foo', ''])).toEqual(['foo', '']);
  });
  it('["foo", "", undefined] must return array with first and last items', () => {
    expect(rejectNil(['foo', '', undefined])).toEqual(['foo', '']);
  });
  it('empty object must return empty object', () => {
    expect(rejectNil({})).toEqual({});
  });
  it('object with one informed property must return same object', () => {
    expect(rejectNil({foo: 'bar'})).toEqual({foo: 'bar'});
  });
  it('object with one empty property must return object filtered', () => {
    expect(rejectNil({foo: 'bar', qux: '', quux: undefined})).toEqual({
      foo: 'bar',
      qux: '',
    });
  });
});
