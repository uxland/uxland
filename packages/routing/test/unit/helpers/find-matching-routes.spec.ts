import {expect} from '@open-wc/testing';
import {findMatchingRoutes} from '../../../helpers/finding-matching-routes';

describe('Find Matching Routes', () => {
  describe('when provided url is undefined', () => {
    it('should return empty array of matching routes', () => {
      expect(findMatchingRoutes(undefined, [{route: 'dummy'}])).to.deep.equal([]);
    });
  });
  describe('when provided with an empty url', () => {
    it('should return empty array of matching routes', () => {
      expect(findMatchingRoutes('', [{route: 'dummy'}])).to.deep.equal([]);
    });
  });
  describe('when provided with an url but no routes', () => {
    it('should return empty array of matching routes', () => {
      expect(findMatchingRoutes('/dummy')).to.deep.equal([]);
    });
  });
  describe('when provided with an url and routes', () => {
    it('should return array of matching routes if found', () => {
      const result = findMatchingRoutes('/dummy', [{route: 'dummy'}]);
      expect(result[0].route.route).to.deep.equal('dummy');
    });
    it('should return empty array of matching routes if not found', () => {
      const result = findMatchingRoutes('/foo', [{route: 'dummy'}]);
      expect(result.length).to.deep.equal(0);
    });
    it('should match and return parameters', function () {
      const result = findMatchingRoutes('http://site.com/app/users/42', [
        {route: 'http://site.com/app/users/:id'},
      ]);
      expect(result[0].params).to.deep.equal({id: '42'});
    });
    describe('when provided with a subroute', () => {
      it('should return array of matching routes if found', () => {
        const result = findMatchingRoutes('dummy/foo', [{route: 'dummy/foo'}], true);
        expect(result[0].route.route).to.deep.equal('dummy/foo');
      });
      it('should match if there is a wildcard used', function () {
        expect(findMatchingRoutes('/app/users/', [{route: 'app/*'}])).to.not.be.undefined;
        expect(findMatchingRoutes('/app/users/', [{route: '*/users/*/save/*/blah'}])).to.not.be
          .undefined;
        const result = findMatchingRoutes('/app/users/comments/save', [
          {route: 'app/*/comments/:action'},
        ]);
        expect(result[0].params).to.deep.equal({action: 'save'});
      });
    });
  });
});
