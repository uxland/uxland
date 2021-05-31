import {createStore, Store} from 'redux';
import {createSelector} from 'reselect';
import {createAction} from '..//create-action';
import {createBasicReducer} from '..//create-basic-reducer';
import {watch} from '..//watch';

describe('watch fixture', () => {
  describe('when invoking `watch`', () => {
    let store: Store;
    const UPDATE_ACTION = 'UPDATE';
    const initialState = {foo: 'bar'};
    const WATCHED_PROPERTIES_PROPERTY = 'WATCHED-PROPERTIES-PROPERTY';
    const watchedProperty = 'foo';
    beforeAll(() => {
      store = createStore(createBasicReducer(UPDATE_ACTION), initialState);
    });
    it("should create a property watcher on object's constructor for provided key", () => {
      const array = new Array('dummy');
      const selector = createSelector(
        state => state,
        (state: any) => state.foo
      );
      watch(selector, {store})(array, watchedProperty);
      const watcher = array.constructor[WATCHED_PROPERTIES_PROPERTY][watchedProperty];
      expect(watcher.name).toEqual(watchedProperty);
      expect(watcher.selector).toBeDefined();
      expect(watcher.store).toBeDefined();
      expect(watcher.store.getState()).toEqual(initialState);
    });
    it('should have updated state when dispatching action', () => {
      const array = new Array('dummy');
      const selector = createSelector(
        state => state,
        (state: any) => state.foo
      );
      watch(selector, {store})(array, watchedProperty);
      store.dispatch(createAction(UPDATE_ACTION)({foo: 'quux'}));
      const watcher = array.constructor[WATCHED_PROPERTIES_PROPERTY][watchedProperty];
      expect(watcher.store.getState()).toEqual({foo: 'quux'});
    });
  });
});
