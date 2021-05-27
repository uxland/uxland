import {clean} from '../../../helpers/clean';
import {root} from '../../../helpers/root';

const defaultLocation = location.href;
describe('Root', () => {
  describe('when provided url is undefined', () => {
    describe('and no routes provided', () => {
      it('should return undefined', () => {
        expect(root(undefined)).toBeUndefined();
      });
    });
    describe('and routes are provided', () => {
      it('should return undefined', () => {
        expect(root(undefined, [{route: '/dummy'}])).toBeUndefined();
      });
    });
  });
  describe('when provided url is an empty string', () => {
    describe('and no routes provided', () => {
      it('should return undefined', () => {
        expect(root('')).toBeUndefined();
      });
    });
    describe('and routes are provided', () => {
      it('should return undefined', () => {
        expect(root('', [{route: '/dummy'}])).toBeUndefined();
      });
    });
  });
  describe('when an url is provided', () => {
    describe('and routes are not provided', () => {
      describe('and url is initial', () => {
        it('should return cleaned url', () => {
          expect(root(defaultLocation)).toEqual(clean(defaultLocation));
        });
      });
      describe('and url is not initial', () => {
        it('should return cleaned url', () => {
          expect(root(`${defaultLocation}dummy`)).toEqual(clean(`${defaultLocation}dummy`));
        });
        describe('and url has query', () => {
          it('should return cleaned url', () => {
            expect(root(`${defaultLocation}dummy?foo=bar`)).toEqual(
              clean(`${defaultLocation}dummy?foo=bar`)
            );
          });
        });
      });
    });

    describe('and routes are provided', () => {
      describe('and no corresponding route is found', () => {
        describe('and url is initial', () => {
          it('should return initial url', () => {
            expect(root(defaultLocation, [{route: 'foo'}])).toEqual(defaultLocation);
          });
        });
        describe('and url is not initial', () => {
          it('should return cleaned url', () => {
            expect(root(`${defaultLocation}dummy`, [{route: 'foo'}])).toEqual(
              clean(`${defaultLocation}dummy`)
            );
          });
          describe('and url has query', () => {
            it('should return cleaned url', () => {
              expect(root(`${defaultLocation}dummy?foo=bar`, [{route: 'foo'}])).toEqual(
                clean(`${defaultLocation}dummy?foo=bar`)
              );
            });
          });
        });
      });
      describe('and corresponding route is found', () => {
        describe('and url is initial', () => {
          it('should return initial url', () => {
            expect(root(defaultLocation, [{route: 'dummy'}])).toEqual(defaultLocation);
          });
        });
        describe('and url is not initial', () => {
          it('should return url without route', () => {
            expect(root(`${defaultLocation}dummy`, [{route: 'dummy'}])).toEqual(
              `${defaultLocation}`
            );
          });
          describe('and url has query', () => {
            it('should return cleaned url', () => {
              expect(root(`${defaultLocation}dummy?foo=bar`, [{route: 'dummy'}])).toEqual(
                clean(`${defaultLocation}dummy?foo=bar`)
              );
            });
          });
        });
      });
      describe('and a wildcarded route is defined', () => {
        describe('and url is initial', () => {
          it('should return initial url', () => {
            expect(root(defaultLocation, [{route: '*'}])).toEqual(defaultLocation);
          });
        });
        describe('and url is not initial', () => {
          it('should return provided url', () => {
            expect(root(`${defaultLocation}dummy`, [{route: '*'}])).toEqual(
              `${defaultLocation}dummy`
            );
          });
          describe('and url has query', () => {
            it('should return cleaned url', () => {
              expect(root(`${defaultLocation}dummy?foo=bar`, [{route: '*'}])).toEqual(
                clean(`${defaultLocation}dummy?foo=bar`)
              );
            });
          });
        });
      });
    });

    // describe('and no routes provided', () => {
    //   it('should return cleaned url', () => {
    //     expect(root('http://localhost/')).toEqual('http://localhost');
    //   });
    // });
    // describe('and routes are provided', () => {
    //   describe('when there is a wildcard route', () => {
    //     it('should return same url', () => {
    //       expect(root('http://localhost', [{ route: '*' }])).toEqual('/dummy');
    //     });
    //   });
    //   describe('when no corresponding route found', () => {
    //     it('should return same url', () => {
    //       expect(root('http://localhost', [{ route: '/foo' }])).toEqual('/dummy');
    //     });
    //   });
    //   describe('when corresponding route found', () => {
    //     it('should return root path', () => {
    //       expect(root('http://localhost', [{ route: '/dummy' }])).toEqual('');
    //     });
    //   });
    // });
  });
});
