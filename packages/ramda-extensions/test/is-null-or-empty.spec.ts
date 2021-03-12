import {isNullOrEmpty} from '../is-null-or-empty';

describe('is not nil neither empty fixture', () => {
  it('undefined should return true', () => {
    expect(isNullOrEmpty(undefined)).toBeTruthy();
  });
  it('[] should return true', () => {
    expect(isNullOrEmpty([])).toBeTruthy();
  });
  it('[undefined] should return false', () => {
    expect(isNullOrEmpty([undefined])).toBeFalsy();
  });
  it('{} should return true', () => {
    expect(isNullOrEmpty({})).toBeTruthy();
  });
  it('{foo: "bar"} should return false', () => {
    expect(isNullOrEmpty({foo: 'bar'})).toBeFalsy();
  });
  it('0 should return false', () => {
    expect(isNullOrEmpty(0)).toBeFalsy();
  });
  it('"" should return true', () => {
    expect(isNullOrEmpty('')).toBeTruthy();
  });
  it('1 should return false', () => {
    expect(isNullOrEmpty(1)).toBeFalsy();
  });
  it('"foo" should return false', () => {
    expect(isNullOrEmpty('foo')).toBeFalsy();
  });
});
