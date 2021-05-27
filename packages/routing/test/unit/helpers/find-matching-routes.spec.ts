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
      const result = findMatchingRoutes('/dummy', [{route: 'dummy'}]);
      expect(result[0].route.route).toEqual('dummy');
    });
    it('should return empty array of matching routes if not found', () => {
      const result = findMatchingRoutes('/foo', [{route: 'dummy'}]);
      expect(result.length).toEqual(0);
    });
    it('should match and return parameters', function () {
      const result = findMatchingRoutes('http://site.com/app/users/42', [
        {route: 'http://site.com/app/users/:id'},
      ]);
      expect(result[0].params).toEqual({id: '42'});
    });
    describe('when provided with a subroute', () => {
      it('should return array of matching routes if found', () => {
        const result = findMatchingRoutes('dummy/foo', [{route: 'dummy/foo'}], true);
        expect(result[0].route.route).toEqual('dummy/foo');
      });
      it('should match if there is a wildcard used', function () {
        expect(findMatchingRoutes('/app/users/', [{route: 'app/*'}])).toBeDefined();
        expect(findMatchingRoutes('/app/users/', [{route: '*/users/*/save/*/blah'}])).toBeDefined();
        const result = findMatchingRoutes('/app/users/comments/save', [
          {route: 'app/*/comments/:action'},
        ]);
        expect(result[0].params).toEqual({action: 'save'});
      });
    });
  });
});
