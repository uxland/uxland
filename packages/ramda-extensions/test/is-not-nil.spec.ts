import {expect} from '@open-wc/testing';
import {isNotNil} from '../is-not-nil';
describe('is not nil fixture', () => {
  it('null should return false', () => {
    expect(isNotNil(null)).to.equal(false);
  });
  it('undefined should return false', () => {
    expect(isNotNil(undefined)).to.equal(false);
  });
  it('empty string should return true', () => {
    expect(isNotNil('')).to.equal(true);
  });
  it('non empty string should return true', () => {
    expect(isNotNil('hello')).to.equal(true);
  });
  it('number should retrun true', () => {
    expect(isNotNil(3)).to.equal(true);
  });
  it('0 should return true', () => {
    expect(isNotNil(0)).to.equal(true);
  });
  it('empty array should return true', () => {
    expect(isNotNil([])).to.equal(true);
  });
  it('array should return true', () => {
    expect(isNotNil([1, 2, 3])).to.equal(true);
  });
  it('empty object should return true', () => {
    expect(isNotNil({})).to.equal(true);
  });
  it('object should return true', () => {
    expect(isNotNil({hello: 0})).to.equal(true);
  });
  it('NaN should return true', () => {
    expect(isNotNil(NaN)).to.equal(true);
  });
});
