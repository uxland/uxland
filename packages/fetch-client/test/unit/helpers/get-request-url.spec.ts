import {getRequestUrl} from '../../../helpers/get-request-url';

describe('Given a baseUrl, an url and some query parameters', () => {
  describe('when baseUrl is undefined', () => {
    describe('and parameters are not provided', () => {
      it('should return same input url', () =>
        expect(getRequestUrl(undefined, 'dummy', undefined)).toEqual('dummy'));
    });
    describe('and parameters are provided', () => {
      it('should return input url with parameters serialized', () =>
        expect(getRequestUrl(undefined, 'dummy', {foo: 'bar'})).toEqual('dummy?foo=bar'));
    });
    describe('and url is absolute', () => {
      it('should return same input url', () =>
        expect(getRequestUrl(undefined, 'http://dummy')).toEqual('http://dummy'));
    });
  });
  describe('when baseUrl is provided', () => {
    describe('but no url', () => {
      it('should return same baseUrl', () =>
        expect(getRequestUrl('http://localhost', undefined)).toEqual('http://localhost'));
    });
    describe('and url is provided', () => {
      it('should return baseUrl and url concatenated', () =>
        expect(getRequestUrl('http://localhost', '/dummy')).toEqual('http://localhost/dummy'));
    });
    describe('and url and query parameters are provided', () => {
      it('should return baseUrl and url concatenated with serialized parameters', () =>
        expect(getRequestUrl('http://localhost', '/dummy', {foo: 'bar'})).toEqual(
          'http://localhost/dummy?foo=bar'
        ));
    });
  });
});
