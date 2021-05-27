import {isRouteActive} from '../../../helpers/is-route-active';

describe('Is route active', () => {
  describe('when provided a route', () => {
    it('should return falsy if route is not equal to tested', () => {
      expect(isRouteActive({href: '/dummy'}, 'foo')).toBeFalsy();
    });
    it('should return truthy if route is equal to tested', () => {
      expect(isRouteActive({href: '/dummy'}, 'dummy')).toBeTruthy();
    });
  });
});
