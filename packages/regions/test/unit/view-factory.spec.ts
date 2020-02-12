import { IRegion, ViewDefinition, viewFactory } from '../../src';
import { ViewConstructor } from './__mocks__/view-constructor';

declare var global: any;

describe('when invoking `viewFactory` function', () => {
  const region = <IRegion>{};
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
  describe('and view supplies `factory` method', () => {
    it('should return factory method result', async done => {
      let element: any = window.document.createElement('my-view');
      let view: ViewDefinition = { factory: () => Promise.resolve(element) };
      let result = await viewFactory(view, region, 'myView');
      expect(result).toBe(element);
      expect(result.view).toBe(view);
      expect(result.region).toBe(region);
      expect(result.viewKey).toBe('myView');
      done();
    });
  });
  describe('and view supplies `constructor` method', () => {
    it('should return instance of constructor', async done => {
      jest.mock('./__mocks__/view-constructor.ts');
      let view: ViewDefinition = { constr: ViewConstructor };
      let result = await viewFactory(view, region, 'myView');
      expect(result).toBeInstanceOf(ViewConstructor);
      done();
    });
  });
});
