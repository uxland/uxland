import {replaceDynamicURLSegments} from '../../../helpers/replace-dynamic-url-segments';

describe('Replace Dynamic URL Segments', () => {
  describe('when providing a simple route without parameters', () => {
    it('should return empty parameters array and corresponding regexp', () => {
      const {regexp, paramNames} = replaceDynamicURLSegments('/dummy');
      expect(regexp).toEqual(/\/dummy(?:\/$|$)/);
      expect(paramNames).toStrictEqual([]);
    });
  });
  describe('when providing a wildcarded route', () => {
    it('should return', () => {
      const {regexp, paramNames} = replaceDynamicURLSegments('/dummy/*');
      expect(regexp).toEqual(/\/dummy\/(?:.*)(?:\/$|$)/);
      expect(paramNames).toStrictEqual([]);
    });
  });
  describe('when providing a regexp route', () => {
    it('should return the same regexp and empty parameters array', () => {
      const {regexp, paramNames} = replaceDynamicURLSegments(/\/dummy(?:\/$|$)/);
      expect(regexp).toEqual(/\/dummy(?:\/$|$)/);
      expect(paramNames).toStrictEqual([]);
    });
  });
  describe('when providing a route with parameters', () => {
    it('should return corresponding parameters array filled', () => {
      const {regexp, paramNames} = replaceDynamicURLSegments('/dummy/:id');
      expect(regexp).toEqual(/\/dummy\/([^/]+)(?:\/$|$)/);
      expect(paramNames).toEqual(['id']);
    });
  });
});
