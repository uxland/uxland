import {expect} from '@open-wc/testing';
import {getRequestUrl} from '../../../helpers/get-request-url';

describe('Given a baseUrl, an url and some query parameters', () => {
  describe('when baseUrl is undefined', () => {
    describe('and parameters are not provided', () => {
      it('should return same input url', () =>
        expect(getRequestUrl(undefined, 'dummy', undefined)).to.deep.equal('dummy'));
    });
    describe('and parameters are provided', () => {
      it('should return input url with parameters serialized', () =>
        expect(getRequestUrl(undefined, 'dummy', {foo: 'bar'})).to.deep.equal('dummy?foo=bar'));
    });
    describe('and url is absolute', () => {
      it('should return same input url', () =>
        expect(getRequestUrl(undefined, 'http://dummy')).to.deep.equal('http://dummy'));
    });
  });
  describe('when baseUrl is provided', () => {
    describe('but no url', () => {
      it('should return same baseUrl', () =>
        expect(getRequestUrl('http://localhost', undefined)).to.deep.equal('http://localhost'));
    });
    describe('and url is provided', () => {
      it('should return baseUrl and url concatenated', () =>
        expect(getRequestUrl('http://localhost', '/dummy')).to.deep.equal(
          'http://localhost/dummy'
        ));
    });
    describe('and url and query parameters are provided', () => {
      it('should return baseUrl and url concatenated with serialized parameters', () =>
        expect(getRequestUrl('http://localhost', '/dummy', {foo: 'bar'})).to.deep.equal(
          'http://localhost/dummy?foo=bar'
        ));
    });
  });
});
