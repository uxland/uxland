import {expect} from '@open-wc/testing';
import {AppRoutingState, routingSelectors} from '../../../store/selectors';
describe('Route selectors', () => {
  describe('provided an initial state', () => {
    it('routingSelectors should return empty', () => {
      expect(routingSelectors.currentParamsSelector({})).to.be.undefined;
      expect(routingSelectors.currentQuerySelector({})).to.be.undefined;
      expect(routingSelectors.routeSelector({})).to.be.undefined;
      expect(routingSelectors.routingSelector({})).to.be.undefined;
    });
  });
  describe('provided an existing routing state', () => {
    describe('when only plain route exists', () => {
      it('routingSelectors should return corresponding values', () => {
        const state = {routing: {route: '/dummy'}};
        expect(routingSelectors.currentParamsSelector(state)).to.be.undefined;
        expect(routingSelectors.currentQuerySelector(state)).to.be.undefined;
        expect(routingSelectors.routeSelector(state)).to.deep.equal(state.routing.route);
        expect(routingSelectors.routingSelector(state)).to.deep.equal(state.routing);
      });
    });
    describe('when route with parameters exists', () => {
      it('routingSelectors should return corresponding values', () => {
        const state: AppRoutingState = {
          routing: {
            route: {href: '/dummy/:id', params: '42', query: '?foo=bar'},
          },
        };
        expect(routingSelectors.currentParamsSelector(state)).to.deep.equal(
          state.routing.route.params
        );
        expect(routingSelectors.currentQuerySelector(state)).to.deep.equal(
          state.routing.route.query
        );
        expect(routingSelectors.routeSelector(state)).to.deep.equal(state.routing.route);
        expect(routingSelectors.routingSelector(state)).to.deep.equal(state.routing);
      });
    });
  });
});
