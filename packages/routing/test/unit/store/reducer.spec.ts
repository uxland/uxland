import {reducer} from '../../../store/reducer';
import {setRouteActionCreator} from '../../../store/route';

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
