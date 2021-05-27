import {rejectEmpty} from '../reject-empty';
describe('reject empty fixture', () => {
  it('empty array must be return empty array', () => {
    expect(rejectEmpty([])).toEqual([]);
  });
  it('["foo"] must return same input', () => {
    expect(rejectEmpty(['foo'])).toEqual(['foo']);
  });
  it('["foo", ""] must return array with first item', () => {
    expect(rejectEmpty(['foo', ''])).toEqual(['foo']);
  });
  it('["foo", "", undefined] must return array with first and last items', () => {
    expect(rejectEmpty(['foo', '', undefined])).toEqual(['foo', undefined]);
  });
  it('empty object must return empty object', () => {
    expect(rejectEmpty({})).toEqual({});
  });
  it('object with one informed property must return same object', () => {
    expect(rejectEmpty({foo: 'bar'})).toEqual({foo: 'bar'});
  });
  it('object with one empty property must return object filtered', () => {
    expect(rejectEmpty({foo: 'bar', qux: '', quux: undefined})).toEqual({
      foo: 'bar',
    });
  });
});
