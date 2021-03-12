import {createStore} from 'redux';
import {createAction} from '../create-action';
import {createBasicReducer} from '../create-basic-reducer';
import {createWatchedReduxProperty, getWatchedProperties} from '../watched-redux-property';

describe('watched redux property fixture', () => {
  describe('when invoking `createWatchedReduxProperty`', () => {
    let store;
    const UPDATE_ACTION = 'UPDATE';
    const initialState = {foo: 'bar'};
    const WATCHED_PROPERTIES_PROPERTY = 'WATCHED-PROPERTIES-PROPERTY';
    const watchedProperty = 'foo';

    beforeAll(() => {
      store = createStore(createBasicReducer(UPDATE_ACTION), initialState);
    });
    it('should extend constructor with a new object "WATCHED-PROPERTIES-PROPERTY"', () => {
      const array = new Array('dummy');
      expect(array.constructor[WATCHED_PROPERTIES_PROPERTY]).toBeUndefined();
      createWatchedReduxProperty({store}, array, watchedProperty);
      expect(array.constructor[WATCHED_PROPERTIES_PROPERTY]).toBeDefined();
      expect(array.constructor[WATCHED_PROPERTIES_PROPERTY][watchedProperty]).toBeDefined();
    });
    it('watched property should be store-based and with initial state', () => {
      const array = new Array('dummy');
      createWatchedReduxProperty({store}, array, watchedProperty);
      expect(array.constructor[WATCHED_PROPERTIES_PROPERTY][watchedProperty].store).toBeDefined();
      expect(
        array.constructor[WATCHED_PROPERTIES_PROPERTY][watchedProperty].store.getState()
      ).toEqual(initialState);
    });
    it('should have updated state when action is dispatched', () => {
      const array = new Array('dummy');
      createWatchedReduxProperty({store}, array, watchedProperty);
      const property = array.constructor[WATCHED_PROPERTIES_PROPERTY][watchedProperty];
      expect(property.store.getState()).toEqual(initialState);
      store.dispatch(createAction(UPDATE_ACTION)({foo: 'quux'}));
      expect(property.store.getState()).toEqual({foo: 'quux'});
    });
  });
  describe('when invoking `getWatchedProperties`', () => {
    let store;
    const UPDATE_ACTION = 'UPDATE';
    const initialState = {foo: 'bar'};

    beforeAll(() => {
      store = createStore(createBasicReducer(UPDATE_ACTION), initialState);
    });
    it('should return initial if no watcher has been defined', () => {
      const obj = new String();
      expect(getWatchedProperties(obj)).toEqual({});
    });
    it('should return store object if watcher has been defined', () => {
      const obj = new String();
      createWatchedReduxProperty({store}, obj, 'foo');
      expect(getWatchedProperties(obj)).toEqual({foo: {store}});
    });
  });
});
