import {expect} from '@open-wc/testing';
import {isNotNullNeitherEmpty} from '../is-not-nil-neither-empty';

describe('is not nil neither empty fixture', () => {
  it('undefined should return false', () => {
    expect(isNotNullNeitherEmpty(undefined)).to.be.false;
  });
  it('[] should return false', () => {
    expect(isNotNullNeitherEmpty([])).to.be.false;
  });
  it('[undefined] should return true', () => {
    expect(isNotNullNeitherEmpty([undefined])).to.be.true;
  });
  it('{} should return false', () => {
    expect(isNotNullNeitherEmpty({})).to.be.false;
  });
  it('{foo: "bar"} should return true', () => {
    expect(isNotNullNeitherEmpty({foo: 'bar'})).to.be.true;
  });
  it('0 should return true', () => {
    expect(isNotNullNeitherEmpty(0)).to.be.true;
  });
  it('"" should return false', () => {
    expect(isNotNullNeitherEmpty('')).to.be.false;
  });
  it('1 should return true', () => {
    expect(isNotNullNeitherEmpty(1)).to.be.true;
  });
  it('"foo" should return true', () => {
    expect(isNotNullNeitherEmpty('foo')).to.be.true;
  });
});
