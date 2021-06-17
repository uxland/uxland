import {expect} from '@open-wc/testing';
import {isNotEmpty} from '../is-not-empty';
describe('is not empty fixture', () => {
  it('null should return true', () => {
    expect(isNotEmpty(null)).to.equal(true);
  });
  it('undefined should return true', () => {
    expect(isNotEmpty(undefined)).to.equal(true);
  });
  it('empty string should return false', () => {
    expect(isNotEmpty('')).to.equal(false);
  });
  it('non empty string should return true', () => {
    expect(isNotEmpty('hello')).to.equal(true);
  });
  it('number should return true', () => {
    expect(isNotEmpty(3)).to.equal(true);
  });
  it('0 should return true', () => {
    expect(isNotEmpty(0)).to.equal(true);
  });
  it('empty array should return false', () => {
    expect(isNotEmpty([])).to.equal(false);
  });
  it('array should return true', () => {
    expect(isNotEmpty([1, 2, 3])).to.equal(true);
  });
  it('empty object should return false', () => {
    expect(isNotEmpty({})).to.equal(false);
  });
  it('object should return true', () => {
    expect(isNotEmpty({hello: 0})).to.equal(true);
  });
  it('NaN should return true', () => {
    expect(isNotEmpty(NaN)).to.equal(true);
  });
});
