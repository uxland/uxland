import {rejectNilOrEmpty} from '../reject-nil-or-empty';

describe('reject nil or empty', () => {
  it('empty array must be return empty array', () => {
    expect(rejectNilOrEmpty([])).toEqual([]);
  });
  it('["foo"] must return same input', () => {
    expect(rejectNilOrEmpty(['foo'])).toEqual(['foo']);
  });
  it('["foo", ""] must return array with first item', () => {
    expect(rejectNilOrEmpty(['foo', ''])).toEqual(['foo']);
  });
  it('["foo", "", undefined] must return array with first and last items', () => {
    expect(rejectNilOrEmpty(['foo', ''])).toEqual(['foo']);
  });
  it('empty object must return empty object', () => {
    expect(rejectNilOrEmpty({})).toEqual({});
  });
  it('object with one informed property must return same object', () => {
    expect(rejectNilOrEmpty({foo: 'bar'})).toEqual({foo: 'bar'});
  });
  it('object with one empty property must return object filtered', () => {
    expect(rejectNilOrEmpty({foo: 'bar', qux: '', quux: undefined})).toEqual({
      foo: 'bar',
    });
  });
});
