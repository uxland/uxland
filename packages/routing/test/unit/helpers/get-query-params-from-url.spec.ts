// describe('and calling getQueryParameters', () => {
//   it('should return query parameters provided in path', () => {
//     const query = router.getQueryParameters('/dummy?foo=bar&qux=quux');
//     expect(query).toEqual({ foo: 'bar', qux: 'quux' });
//   });
// });

import {getQueryParametersFromUrl} from '../../../helpers/get-query-params-from-url';

describe('Get QueryParameters from URL', () => {
  describe('when providing an undefined url', () => {
    it('should return undefined', () => {
      expect(getQueryParametersFromUrl(undefined)).toBeUndefined();
    });
  });
  describe('when providing an empty url', () => {
    it('should return undefined', () => {
      expect(getQueryParametersFromUrl('')).toBeUndefined();
    });
  });
  describe('when providing an url without parameters', () => {
    it('should return undefined', () => {
      expect(getQueryParametersFromUrl('/dummy')).toBeUndefined();
    });
  });
  describe('when providing an url with parameters', () => {
    it('should return a collection of parameter and corresponding value', () => {
      expect(getQueryParametersFromUrl('/dummy?foo=bar')).toEqual({
        foo: 'bar',
      });
    });
  });
});
