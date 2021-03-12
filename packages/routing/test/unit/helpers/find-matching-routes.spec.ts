import {findMatchingRoutes} from '../../../helpers/finding-matching-routes';

describe('Find Matching Routes', () => {
  describe('when provided url is undefined', () => {
    it('should return empty array of matching routes', () => {
      expect(findMatchingRoutes(undefined, [{route: 'dummy'}])).toEqual([]);
    });
  });
  describe('when provided with an empty url', () => {
    it('should return empty array of matching routes', () => {
      expect(findMatchingRoutes('', [{route: 'dummy'}])).toEqual([]);
    });
  });
  describe('when provided with an url but no routes', () => {
    it('should return empty array of matching routes', () => {
      expect(findMatchingRoutes('/dummy')).toEqual([]);
    });
  });
  describe('when provided with an url and routes', () => {
    it('should return array of matching routes if found', () => {
      expect(findMatchingRoutes('/dummy', [{route: 'dummy'}]));
    });
    it('should return empty array of matching routes if not found', () => {
      expect(findMatchingRoutes('/foo', [{route: 'dummy'}]));
    });
  });
});
