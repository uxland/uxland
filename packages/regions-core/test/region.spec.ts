import {
  DuplicatedViewException,
  InvalidViewFactoryException,
  InvalidViewKeyException,
  Region,
  View,
} from '../src';
import {ArgumentNullException, ViewNotFoundException} from '../src';
// import Constructor = jest.Constructor;

describe('Region fixture', () => {
  describe('Given a region', () => {
    let sut: Region;
    let renderMock: jest.Mock;
    beforeEach(() => {
      renderMock = jest.fn();
      sut = new Region({renderViews: renderMock});
    });

    const addView = (view: View) => sut.addView(view);
    const activateView = (key: string) => sut.activate(key);
    const createView: (key: string) => View = key => ({key, factory: () => Promise.resolve({})});
    const assertContainsView = (view: View) => expect(sut.getView(view.key)).toBe(view);

    const assertViewIsActive = (key: string) => expect(sut.activeViews.has(key)).toBe(true);

    const assertRender = () => expect(renderMock).toHaveBeenCalledTimes(1);

    const assertViewActivation = (key: string) => {
      assertViewIsActive(key);
      assertRender();
    };

    describe('Add view fixture', () => {
      const assertAddViewFails = (view: View, error: any) =>
        expect(() => addView(view)).toThrow(error);

      describe('When adding a nil view', () => {
        it('Fails', () => {
          assertAddViewFails(undefined, ArgumentNullException);
          assertAddViewFails(null, ArgumentNullException);
        });
      });
      describe('Given a view with no key', () => {
        it('Should fail', () => {
          assertAddViewFails({} as any, InvalidViewKeyException);
          assertAddViewFails({key: undefined} as any, InvalidViewKeyException);
          assertAddViewFails({key: null} as any, InvalidViewKeyException);
          assertAddViewFails({key: ''} as any, InvalidViewKeyException);
          assertAddViewFails({key: '   '} as any, InvalidViewKeyException);
        });
      });
      describe('Given a view with no factory', () => {
        it('should fail', () => {
          assertAddViewFails({key: 'my-key', factory: undefined}, InvalidViewFactoryException);
          assertAddViewFails({key: 'my-key', factory: null}, InvalidViewFactoryException);
        });
      });
      describe('Given an invalid factory', () => {
        it('Fails', () => {
          assertAddViewFails(<any>{key: '1', factory: 4}, InvalidViewFactoryException);
          assertAddViewFails(<any>{key: '1', factory: ''}, InvalidViewFactoryException);
        });
      });
      describe('Given several views', () => {
        const views: View[] = [];
        beforeEach(() => {
          for (let i = 0; i < 5; i++) views.push(createView(`view-${i}`));
        });
        describe('When added to the region', () => {
          beforeEach(() => views.forEach(addView));

          it('All views should be added', () => {
            views.forEach(assertContainsView);
          });
        });
      });
      describe('Given a region with a view', () => {
        const key = 'my-view';
        beforeEach(() => {
          addView(createView(key));
        });
        describe('When a view with the same key is added', () => {
          it('Should fail', () => {
            assertAddViewFails(createView(key), DuplicatedViewException);
          });
        });
      });
    });

    describe('Activate view', () => {
      const key = 'my-view';
      describe('Given a view not in region', () => {
        describe('when activating it', () => {
          it('should fail', () => {
            expect(() => activateView(key)).toThrow(ViewNotFoundException);
          });
        });
      });
      describe('Given a region with a view', () => {
        beforeEach(() => {
          addView(createView(key));
        });
        describe('When activating view', () => {
          beforeEach(() => activateView(key));
          it('view is in active views', () => {
            assertViewActivation(key);
          });
        });
      });
    });
    describe('Remove view', () => {});
    describe('Deactivate view', () => {});
  });
});

//Todo: crear projectes react + web-component per implementacions concretes
