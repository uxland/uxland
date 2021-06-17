import {expect} from '@open-wc/testing';
import {reducer} from '../../../store/reducer';
import {setRouteActionCreator} from '../../../store/route';

describe('Route reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).to.deep.equal({
      route: {href: ''},
    });
  });
  it('should handle ADD_TODO', () => {
    expect(reducer({route: ''}, setRouteActionCreator({href: '/dummy'}))).to.deep.equal({
      route: {href: '/dummy'},
    });
  });
});
