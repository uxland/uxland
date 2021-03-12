import {getOnlyUrl} from '../../../helpers/get-only-url';

describe('Get Only Url', () => {
  describe('when providing an undefined url', () => {
    it('should return empty url', () => {
      const result = getOnlyUrl(undefined);
      expect(result).toEqual(undefined);
    });
  });
  describe('when provided url is empty', () => {
    it('should return empty url', () => {
      const result = getOnlyUrl('');
      expect(result).toEqual('');
    });
  });
  describe('when provided with a valid url', () => {
    describe('and using hash', () => {
      describe('and using custom hash', () => {
        describe('and url is only path', () => {
          it('should return same path without hash', () => {
            const result = getOnlyUrl('$/dummy', true, '$');
            expect(result).toEqual('/dummy');
          });
        });
        describe('and url is only path with parameters', () => {
          it('should return path without parameters and without hash', () => {
            const result = getOnlyUrl('$/dummy?foo=bar', true, '$');
            expect(result).toEqual('/dummy');
          });
        });
        describe('and url is full url', () => {
          it('should return only path', () => {
            const result = getOnlyUrl('http://localhost/$/dummy', true, '$');
            expect(result).toEqual('/dummy');
          });
        });
        describe('and url is full url with parameters', () => {
          it('should return same url without parameters', () => {
            const result = getOnlyUrl('http://localhost/$/dummy?foo=bar', true, '$');
            expect(result).toEqual('/dummy');
          });
        });
      });
      describe('and not defining custom hash', () => {
        describe('and url is empty', () => {
          it('should return same empty url', () => {
            const result = getOnlyUrl('', true);
            expect(result).toEqual('');
          });
        });
        describe('and url is only hash', () => {
          it('should return same path without hash', () => {
            const result = getOnlyUrl('#', true);
            expect(result).toEqual('');
          });
        });
        describe('and url is only path', () => {
          it('should return same path without hash', () => {
            const result = getOnlyUrl('#/dummy', true);
            expect(result).toEqual('/dummy');
          });
        });
        describe('and url is only path with parameters', () => {
          it('should return path without parameters and without hash', () => {
            const result = getOnlyUrl('#/dummy?foo=bar', true);
            expect(result).toEqual('/dummy');
          });
        });
        describe('and url is without path', () => {
          it('should return empty string', () => {
            const result = getOnlyUrl('http://localhost/#', true);
            expect(result).toEqual('');
          });
        });
        describe('and url is full url', () => {
          it('should return only path', () => {
            const result = getOnlyUrl('http://localhost/#/dummy', true);
            expect(result).toEqual('/dummy');
          });
        });
        describe('and url is full url with parameters', () => {
          it('should return same url without parameters', () => {
            const result = getOnlyUrl('http://localhost/#/dummy?foo=bar', true);
            expect(result).toEqual('/dummy');
          });
        });
      });
    });
    describe('and not using hash', () => {
      describe('and url is only path', () => {
        it('should return same path', () => {
          const result = getOnlyUrl('/dummy');
          expect(result).toEqual('/dummy');
        });
      });
      describe('and url is only path with parameters', () => {
        it('should return path without parameters', () => {
          const result = getOnlyUrl('/dummy?foo=bar');
          expect(result).toEqual('/dummy');
        });
      });
      describe('and url is full url', () => {
        it('should return same url', () => {
          const result = getOnlyUrl('http://localhost/dummy');
          expect(result).toEqual('http://localhost/dummy');
        });
      });
      describe('and url is full url with parameters', () => {
        it('should return same url without parameters', () => {
          const result = getOnlyUrl('http://localhost/dummy?foo=bar');
          expect(result).toEqual('http://localhost/dummy');
        });
      });
    });
  });
});
