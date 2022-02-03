import {clean} from '../../helpers/clean';
import {duplicateRoutes, existingRoute, Router} from '../../router';

const defaultWindow = window;
const defaultLocation = location.href;
const pushState = window.history.pushState;
let router, handler, canNavigateFrom, canNavigateTo, navigatedFrom, navigatedTo;

describe('Given an instance of Routing', () => {
  beforeEach(() => {
    router = new Router();
    delete window.location;
    (window as any).location = {href: defaultLocation};
  });

  afterEach(() => {
    router.destroy();
    window.location = location;
    window.history.pushState = pushState;
  });

  describe('when destroying router instance', () => {
    it('should empty its routes dictionary', () => {
      router = new Router([{route: 'dummy'}]);
      router.destroy();
      expect(router.routes).toStrictEqual([]);
    });
  });

  describe('when determining current location', () => {
    describe('and is browserless environment', () => {
      beforeEach(() => {
        window = undefined;
      });
      afterEach(() => {
        window = defaultWindow;
      });
      it('should return empty string', () => expect(router.currentLocation).toEqual(''));
    });
    describe('in browser environment', () => {
      describe('and navigo mock location is defined', () => {
        beforeAll(() => {
          window.__NAVIGO_WINDOW_LOCATION_MOCK__ = 'http://navigo';
        });
        afterAll(() => {
          window.__NAVIGO_WINDOW_LOCATION_MOCK__ = undefined;
        });
        it('should return navigo location', () => {
          expect(router.currentLocation).toEqual(window.__NAVIGO_WINDOW_LOCATION_MOCK__);
        });
      });
      describe('and location href is initial', () => {
        it('should return cleaned location', () => {
          window.location.href = defaultLocation;
          expect(router.currentLocation).toEqual(clean(defaultLocation));
        });
      });
      describe('and location href is a subpath', () => {
        it('should return cleaned location', () => {
          window.location.href = `${defaultLocation}dummy`;
          expect(router.currentLocation).toEqual(clean(`${defaultLocation}dummy`));
        });
      });
    });
  });

  describe('when determining root', () => {
    describe('in a browserless environment', () => {
      beforeEach(() => {
        window = undefined;
      });
      afterEach(() => {
        window = defaultWindow;
      });
      describe('and no root is provided in router instance', () => {
        it('should return undefined root', () => expect(router.getRoot()).toBeUndefined());
      });
      describe('and root is provided in router instance', () => {
        it('should return provided root', () => {
          router = new Router([], 'root');
          expect(router.getRoot()).toEqual('root');
          router.destroy();
        });
      });
    });
    describe('in a browser environment', () => {
      describe('and location is initial', () => {
        describe('and no root is provided', () => {
          it('should return cleaned initial location', () => {
            expect(router.getRoot()).toEqual(clean(defaultLocation));
          });
          describe('and routes are provided', () => {
            it('should return cleaned initial location', () => {
              router = new Router([{route: 'dummy'}]);
              expect(router.getRoot()).toEqual(clean(defaultLocation));
              router.destroy();
            });
          });
        });
        describe('and root is provided', () => {
          it('should return provided root', () => {
            router = new Router([], 'root');
            expect(router.getRoot()).toEqual('root');
            router.destroy();
          });
        });
      });
      describe('and location is not initial', () => {
        beforeEach(() => {
          window.location.href = `${defaultLocation}dummy`;
        });
        afterEach(() => {
          window.location.href = defaultLocation;
        });
        describe('and no root is provided', () => {
          it('should return cleaned location', () => {
            expect(router.getRoot()).toEqual(clean(`${defaultLocation}dummy`));
          });
          describe('and routes are provided', () => {
            describe('with a matching route', () => {
              it('should return url without route part', () => {
                router = new Router([{route: 'dummy'}]);
                expect(router.getRoot()).toEqual(defaultLocation);
                router.destroy();
              });
            });
            describe('with no a matching route', () => {
              it('should return url cleaned url', () => {
                router = new Router([{route: 'foo'}]);
                expect(router.getRoot()).toEqual(clean(`${defaultLocation}dummy`));
                router.destroy();
              });
            });
          });
        });
        describe('and root is provided', () => {
          it('should return provided root', () => {
            router = new Router([], 'root');
            expect(router.getRoot()).toEqual('root');
            router.destroy();
          });
        });
      });
    });
  });

  describe('when determining route url', () => {
    describe('in a browserless environment', () => {
      beforeEach(() => {
        window = undefined;
      });
      afterEach(() => {
        window = defaultWindow;
      });
      describe('and no root is provided in router instance', () => {
        it('should return same provided string', () => {
          expect(router.getRouteUrl('root')).toEqual('root');
        });
      });
      describe('and root is provided in router instance', () => {
        beforeEach(() => {
          router = new Router([], 'root');
        });
        afterEach(() => {
          router.destroy();
        });
        describe('when route is root', () => {
          it('should return empty string', () => {
            expect(router.getRouteUrl('root')).toEqual('');
          });
        });
        describe('when route is full url', () => {
          it('should return route segment', () => {
            expect(router.getRouteUrl('root/path')).toEqual('/path');
          });
        });
      });
    });
    describe('in a browser environment', () => {
      describe('and no root is provided in router instance', () => {
        describe('and location is initial', () => {
          it('should return route segment of provided url', () => {
            expect(router.getRouteUrl(`${defaultLocation}dummy`)).toEqual(`/dummy`);
          });
        });
        describe('and location is not initial', () => {
          beforeEach(() => {
            window.location.href = `${defaultLocation}dummy`;
          });
          afterEach(() => {
            window.location.href = defaultLocation;
          });
          describe('when provided url is same as location', () => {
            it('should return empty string', () => {
              expect(router.getRouteUrl(`${defaultLocation}dummy`)).toEqual(``);
            });
          });
          describe('when provided url is different location', () => {
            it('should return new url', () => {
              expect(router.getRouteUrl(`${defaultLocation}foo`)).toEqual(`${defaultLocation}foo`);
            });
          });
        });
      });
      describe('and root is provided in router instance', () => {
        beforeEach(() => {
          router = new Router([], 'root');
        });
        afterEach(() => {
          router.destroy();
        });
        describe('when route is root', () => {
          it('should return empty string', () => {
            expect(router.getRouteUrl('root')).toEqual('');
          });
        });
        describe('when route is full url', () => {
          it('should return route segment', () => {
            expect(router.getRouteUrl('root/path')).toEqual('/path');
          });
        });
      });
    });
  });

  describe('when registering routes', () => {
    describe('via constructor', () => {
      it('should update registered routes dictionary', () => {
        router = new Router([{route: 'dummy'}]);
        expect(router.routes).toEqual([{route: 'dummy'}]);
        router.destroy();
      });

      describe('when trying to register routes with same url', () => {
        it('should throw an exception', () => {
          const error = () => new Router([{route: 'dummy'}, {route: 'dummy'}]);
          expect(error).toThrow(duplicateRoutes);
        });
      });
    });
    describe('via registerRoutes function', () => {
      describe('when registering a single route using object', () => {
        it('should update registered routes dictionary', () => {
          router.registerRoutes({route: 'dummy'});
          expect(router.routes).toEqual([{route: 'dummy'}]);
        });
      });

      describe('when registering an array of routes', () => {
        it('should update registered routes dictionary', () => {
          router.registerRoutes([{route: 'dummy'}]);
          expect(router.routes).toEqual([{route: 'dummy'}]);
        });

        describe('when trying to register routes with same url', () => {
          it('should throw an exception', () => {
            const error = () => router.registerRoutes([{route: 'dummy'}, {route: 'dummy'}]);
            expect(error).toThrow(duplicateRoutes);
          });
        });
      });

      describe('and registered routes exist already in router', () => {
        describe('when trying to register an existing route', () => {
          it('should throw an exception', () => {
            router = new Router([{route: 'dummy'}]);
            const error = () => router.registerRoutes({route: 'dummy'});
            expect(error).toThrow(existingRoute);
            router.destroy();
          });
        });
      });
    });
  });

  describe('when routes are registered', () => {
    let defaultRoute;
    beforeEach(() => {
      defaultRoute = {route: 'dummy'};
      router = new Router([defaultRoute]);
    });

    afterEach(() => {
      router.destroy();
    });

    describe('and is initial state', () => {
      it('should not be routes to deactivate', () => {
        expect(router.routesToDeactivate(undefined, 'dummy')).toEqual([]);
      });
      it('last resolved url should be empty', () => {
        expect(router.lastResolvedUrl).toBeNull();
      });
    });

    describe('when trying to navigate', () => {
      describe('and pushState is not available', () => {
        beforeEach(() => {
          window.history.pushState = undefined;
          router = new Router([defaultRoute]);
        });

        afterEach(() => {
          window.history.pushState = pushState;
          router.destroy();
        });

        describe('and navigating to a path for the first time', () => {
          describe('if no matching route is found', () => {
            it('should not navigate to new route', async done => {
              const result = await router.navigate('foo');
              expect(result).toBeFalsy();
              done();
            });
            it('lastResolvedUrl should be the new path', async done => {
              await router.navigate('foo');
              expect(router.lastResolvedUrl).toEqual('foo');
              done();
            });
          });
          describe('if matching route is found', () => {
            it('should update location with new route', async done => {
              expect(window.location.href).toEqual(`${defaultLocation}`);
              await router.navigate('dummy');
              expect(window.location.href).toEqual(`dummy`);
              done();
            });
            it('should complete navigation successfully', async done => {
              const result = await router.navigate('dummy');
              expect(result).toBeTruthy();
              done();
            });
          });
        });

        describe('when already navigation happened', () => {
          beforeEach(() => {
            canNavigateFrom = jest.fn().mockReturnValue(true);
            canNavigateTo = jest.fn().mockReturnValue(true);
            navigatedFrom = jest.fn().mockReturnValue(true);
            router = new Router([
              {route: 'dummy', hooks: {canNavigateFrom, canNavigateTo}},
              {route: 'foo', hooks: {navigatedFrom}},
              {route: 'qux/:id'},
            ]);
          });
          afterEach(() => {
            router.destroy();
          });
          describe('and trying to navigate again to the same url', () => {
            it('should stop navigation', async done => {
              await router.navigate('dummy');
              expect(router.lastResolvedUrl).toEqual('dummy');
              const result = await router.navigate('dummy');
              expect(result).toBeFalsy();
              expect(window.location.href).toEqual(`dummy`);
              done();
            });
          });
          describe('and navigating to a new url', () => {
            it('should update lastResolvedUrl and location', async done => {
              await router.navigate('dummy');
              expect(router.lastResolvedUrl).toEqual('dummy');
              const result = await router.navigate('foo');
              expect(result).toBeTruthy();
              expect(router.lastResolvedUrl).toEqual('foo');
              expect(window.location.href).toEqual(`foo`);
              done();
            });
            describe('if previous route has hooks defined', () => {
              it('should call provided hooks', async done => {
                await router.navigate('dummy');
                await router.navigate('foo');
                expect(canNavigateFrom).toBeCalled();
                expect(canNavigateTo).toBeCalled();
                done();
              });
            });
            describe('if current route has hooks defined', () => {
              it('should call provided hooks', async done => {
                await router.navigate('dummy');
                await router.navigate('foo?qux=quux');
                expect(navigatedFrom).toBeCalled();
                expect(navigatedFrom).toBeCalledWith('dummy', null, {
                  qux: 'quux',
                });
                done();
              });
            });
          });
          describe('and navigating to a new subroute', () => {
            describe('if previous route has hooks defined', () => {
              it('should call provided hooks providing url parameters and query', async done => {
                await router.navigate('dummy');
                await router.navigate('qux/3?foo=bar');
                expect(canNavigateFrom).toBeCalled();
                expect(canNavigateFrom).toBeCalledWith('qux/3?foo=bar', {id: '3'}, {foo: 'bar'});
                expect(canNavigateTo).toBeCalled();
                done();
              });
            });
          });
        });
      });

      describe('and pushState is available', () => {
        describe('and navigating to a path for the first time', () => {
          it('should update history, proceed with navigation successfully', async done => {
            const pushStateStub = jest.fn();
            window.history.pushState = pushStateStub;
            router = new Router([defaultRoute]);
            const result = await router.navigate('dummy');
            expect(pushStateStub).toBeCalled();
            expect(result).toBeTruthy();
            window.history.pushState = pushState;
            router.destroy();
            done();
          });
        });
      });

      describe('when trying to navigate multiple times simultaneously', () => {
        it('should cancel first navigation action', async done => {
          window.history.pushState = pushState;
          router = new Router([{route: 'dummy'}]);
          const firstNav = router.navigate('dummy');
          const secondNav = router.navigate('dummy');
          const navigations = await Promise.all([firstNav, secondNav]);
          expect(navigations[0]).toBeFalsy();
          expect(navigations[1]).toBeTruthy();
          router.destroy();
          done();
        });
      });

      describe('when trying to navigate and route is not found', () => {
        describe('when notFound handler is provided', () => {
          it('should call provided handler', async done => {
            const notFoundHandler = jest.fn();
            router.notFound(notFoundHandler);
            const result = await router.navigate('qux');
            expect(result).toBeFalsy();
            expect(notFoundHandler).toBeCalled();
            done();
          });
        });
      });
    });
  });
});
