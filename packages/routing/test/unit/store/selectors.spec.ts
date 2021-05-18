import {AppRoutingState, routingSelectors} from '../../../src/store/selectors';
describe('Route selectors', () => {
  describe('provided an initial state', () => {
    it('routingSelectors should return empty', () => {
      expect(routingSelectors.currentParamsSelector({})).toBeUndefined();
      expect(routingSelectors.currentQuerySelector({})).toBeUndefined();
      expect(routingSelectors.routeSelector({})).toBeUndefined();
      expect(routingSelectors.routingSelector({})).toBeUndefined();
    });
  });
  describe('provided an existing routing state', () => {
    describe('when only plain route exists', () => {
      it('routingSelectors should return corresponding values', () => {
        const state = {routing: {route: '/dummy'}};
        expect(routingSelectors.currentParamsSelector(state)).toBeUndefined();
        expect(routingSelectors.currentQuerySelector(state)).toBeUndefined();
        expect(routingSelectors.routeSelector(state)).toEqual(state.routing.route);
        expect(routingSelectors.routingSelector(state)).toEqual(state.routing);
      });
    });
    describe('when route with parameters exists', () => {
      it('routingSelectors should return corresponding values', () => {
        const state: AppRoutingState = {
          routing: {
            route: {href: '/dummy/:id', params: '42', query: '?foo=bar'},
          },
        };
        expect(routingSelectors.currentParamsSelector(state)).toEqual(state.routing.route.params);
        expect(routingSelectors.currentQuerySelector(state)).toEqual(state.routing.route.query);
        expect(routingSelectors.routeSelector(state)).toEqual(state.routing.route);
        expect(routingSelectors.routingSelector(state)).toEqual(state.routing);
      });
    });
  });
});
