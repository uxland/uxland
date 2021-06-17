import {expect} from '@open-wc/testing';
import {isNullOrEmpty} from '../is-null-or-empty';

describe('is not nil neither empty fixture', () => {
  it('undefined should return true', () => {
    expect(isNullOrEmpty(undefined)).to.be.true;
  });
  it('[] should return true', () => {
    expect(isNullOrEmpty([])).to.be.true;
  });
  it('[undefined] should return false', () => {
    expect(isNullOrEmpty([undefined])).to.be.false;
  });
  it('{} should return true', () => {
    expect(isNullOrEmpty({})).to.be.true;
  });
  it('{foo: "bar"} should return false', () => {
    expect(isNullOrEmpty({foo: 'bar'})).to.be.false;
  });
  it('0 should return false', () => {
    expect(isNullOrEmpty(0)).to.be.false;
  });
  it('"" should return true', () => {
    expect(isNullOrEmpty('')).to.be.true;
  });
  it('1 should return false', () => {
    expect(isNullOrEmpty(1)).to.be.false;
  });
  it('"foo" should return false', () => {
    expect(isNullOrEmpty('foo')).to.be.false;
  });
});
