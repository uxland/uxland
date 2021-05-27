import {computePage} from '../../../store/compute-page';

describe('Compute page', () => {
  describe('when route is not active', () => {
    it('should return undefined', () => {
      expect(computePage({href: '/dummy'}, 'defaultPage', false, '/foo')).toBeUndefined();
      expect(computePage({href: '/dummy/foo'}, 'defaultPage', false, '/dummy')).toBeUndefined();
    });
  });
  describe('when route is active', () => {
    it('should return default page if current route and route specification do not match', () => {
      expect(computePage({href: '/dummy/foo'}, 'defaultPage', true, '/foo')).toEqual('defaultPage');
    });

    it('should return subpage if current route and route specification path matches', () => {
      expect(computePage({href: '/dummy/foo'}, 'defaultPage', true, '/dummy')).toEqual('foo');
    });
  });
});
