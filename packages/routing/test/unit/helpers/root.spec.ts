import {expect} from '@open-wc/testing';
import {clean} from '../../../helpers/clean';
import {root} from '../../../helpers/root';
const defaultLocation = location.href;
describe('Root', () => {
  describe('when provided url is undefined', () => {
    describe('and no routes provided', () => {
      it('should return undefined', () => {
        expect(root(undefined)).to.be.undefined;
      });
    });
    describe('and routes are provided', () => {
      it('should return undefined', () => {
        expect(root(undefined, [{route: '/dummy'}])).to.be.undefined;
      });
    });
  });
  describe('when provided url is an empty string', () => {
    describe('and no routes provided', () => {
      it('should return undefined', () => {
        expect(root('')).to.be.undefined;
      });
    });
    describe('and routes are provided', () => {
      it('should return undefined', () => {
        expect(root('', [{route: '/dummy'}])).to.be.undefined;
      });
    });
  });
  describe('when an url is provided', () => {
    describe('and routes are not provided', () => {
      describe('and url is initial', () => {
        it('should return cleaned url', () => {
          expect(root(defaultLocation)).to.deep.equal(clean(defaultLocation));
        });
      });
      describe('and url is not initial', () => {
        it('should return cleaned url', () => {
          expect(root(`${defaultLocation}dummy`)).to.deep.equal(clean(`${defaultLocation}dummy`));
        });
        describe('and url has query', () => {
          it('should return cleaned url', () => {
            expect(root(`${defaultLocation}dummy?foo=bar`)).to.deep.equal(
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
            expect(root(defaultLocation, [{route: 'foo'}])).to.deep.equal(defaultLocation);
          });
        });
        describe('and url is not initial', () => {
          it('should return cleaned url', () => {
            expect(root(`${defaultLocation}dummy`, [{route: 'foo'}])).to.deep.equal(
              clean(`${defaultLocation}dummy`)
            );
          });
          describe('and url has query', () => {
            it('should return cleaned url', () => {
              expect(root(`${defaultLocation}dummy?foo=bar`, [{route: 'foo'}])).to.deep.equal(
                clean(`${defaultLocation}dummy?foo=bar`)
              );
            });
          });
        });
      });
      describe('and corresponding route is found', () => {
        describe('and url is initial', () => {
          it('should return initial url', () => {
            expect(root(defaultLocation, [{route: 'dummy'}])).to.deep.equal(defaultLocation);
          });
        });
        describe('and url is not initial', () => {
          it('should return url without route', () => {
            expect(root(`${defaultLocation}dummy`, [{route: 'dummy'}])).to.deep.equal(
              `${defaultLocation}`
            );
          });
          describe('and url has query', () => {
            it('should return cleaned url', () => {
              expect(root(`${defaultLocation}dummy?foo=bar`, [{route: 'dummy'}])).to.deep.equal(
                clean(`${defaultLocation}dummy?foo=bar`)
              );
            });
          });
        });
      });
      describe('and a wildcarded route is defined', () => {
        describe('and url is initial', () => {
          it('should return initial url', () => {
            expect(root(defaultLocation, [{route: '*'}])).to.deep.equal(defaultLocation);
          });
        });
        describe('and url is not initial', () => {
          it('should return provided url', () => {
            expect(root(`${defaultLocation}dummy`, [{route: '*'}])).to.deep.equal(
              `${defaultLocation}dummy`
            );
          });
          describe('and url has query', () => {
            it('should return cleaned url', () => {
              expect(root(`${defaultLocation}dummy?foo=bar`, [{route: '*'}])).to.deep.equal(
                clean(`${defaultLocation}dummy?foo=bar`)
              );
            });
          });
        });
      });
    });

    // describe('and no routes provided', () => {
    //   it('should return cleaned url', () => {
    //     expect(root('http://localhost/')).to.deep.equal('http://localhost');
    //   });
    // });
    // describe('and routes are provided', () => {
    //   describe('when there is a wildcard route', () => {
    //     it('should return same url', () => {
    //       expect(root('http://localhost', [{ route: '*' }])).to.deep.equal('/dummy');
    //     });
    //   });
    //   describe('when no corresponding route found', () => {
    //     it('should return same url', () => {
    //       expect(root('http://localhost', [{ route: '/foo' }])).to.deep.equal('/dummy');
    //     });
    //   });
    //   describe('when corresponding route found', () => {
    //     it('should return root path', () => {
    //       expect(root('http://localhost', [{ route: '/dummy' }])).to.deep.equal('');
    //     });
    //   });
    // });
  });
});
