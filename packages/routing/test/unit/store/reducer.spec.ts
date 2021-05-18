import {reducer} from '../../../src/store/reducer';
import {setRouteActionCreator} from '../../../src/store/route';

describe('Route reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({
      route: {href: ''},
    });
  });
  it('should handle ADD_TODO', () => {
    expect(reducer({route: ''}, setRouteActionCreator({href: '/dummy'}))).toEqual({
      route: {href: '/dummy'},
    });
  });
});
