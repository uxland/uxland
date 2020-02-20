import { isNotNullNeitherEmpty } from '../is-not-nil-neither-empty';

describe('is not nil neither empty fixture', () => {
  it('undefined should return false', () => {
    expect(isNotNullNeitherEmpty(undefined)).toBeFalsy();
  });
  it('[] should return false', () => {
    expect(isNotNullNeitherEmpty([])).toBeFalsy();
  });
  it('[undefined] should return true', () => {
    expect(isNotNullNeitherEmpty([undefined])).toBeTruthy();
  });
  it('{} should return false', () => {
    expect(isNotNullNeitherEmpty({})).toBeFalsy();
  });
  it('{foo: "bar"} should return true', () => {
    expect(isNotNullNeitherEmpty({ foo: 'bar' })).toBeTruthy();
  });
  it('0 should return true', () => {
    expect(isNotNullNeitherEmpty(0)).toBeTruthy();
  });
  it('"" should return false', () => {
    expect(isNotNullNeitherEmpty('')).toBeFalsy();
  });
  it('1 should return true', () => {
    expect(isNotNullNeitherEmpty(1)).toBeTruthy();
  });
  it('"foo" should return true', () => {
    expect(isNotNullNeitherEmpty('foo')).toBeTruthy();
  });
});
