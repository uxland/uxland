import {expect} from '@open-wc/testing';
import {clean} from '../../../helpers/clean';
describe('Clean', () => {
  describe('when provided string is undefined', () => {
    it('should return undefined', () => {
      expect(clean(undefined)).to.be.undefined;
    });
  });
  describe('when provided string is a regular expression', () => {
    it('should return the provided string', () => {
      expect(clean(new RegExp(/\/+$/))).to.deep.equal(/\/+$/);
    });
  });
  describe('when provided string is a path', () => {
    it('should return same path preceeded by ^', () => {
      expect(clean('/dummy')).to.equal('^/dummy');
    });
  });
  describe('when provided string is a full url', () => {
    it('should return the same provided string', () => {
      const url = 'http://localhost:8080/dummy';
      expect(clean(url)).to.equal(url);
    });
  });
});
