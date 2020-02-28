import { timeOut } from '@uxland/functional-utilities/src';
import { createStore, Store } from 'redux';
import { createSelector } from 'reselect';
import { connectMixin } from '../connect';
import { createAction } from '../create-action';
import { createBasicReducer } from '../create-basic-reducer';
import { watch } from '../watch';

describe('connect fixture', () => {
  describe('given a class that uses connectMixin', () => {
    let connect, baseClass, testClass, defaultStore: Store;
    let BaseClass, TestClass;
    const initialState = { foo: 'bar' };
    const UPDATE_ACTION = 'UPDATE';
    beforeAll(() => {
      defaultStore = createStore(createBasicReducer(UPDATE_ACTION), { ...initialState });
      connect = connectMixin(defaultStore);
      BaseClass = class Base {
        baseProp = 'foo';
      };
      baseClass = new BaseClass();
      const selector = createSelector(
        state => state,
        (state: any) => {
          console.log('selector', state);
          return state.foo;
        }
      );
      TestClass = class Test extends connect(BaseClass) {};
      testClass = new TestClass();
    });
    it('should be instance of both Base and Test', () => {
      expect(testClass).toBeInstanceOf(BaseClass);
      expect(testClass).toBeInstanceOf(TestClass);
    });
    it('should have a "baseProp" constant from Base class defined', () => expect(testClass.baseProp).toEqual('foo'));
    it('should have a store defined equal to defaultStore', () =>
      expect(TestClass.reduxDefaultStore).toEqual(defaultStore));
    it('should have updated state after dispatching action', () => {
      defaultStore.dispatch(createAction(UPDATE_ACTION)({ foo: 'quux' }));
      expect(TestClass.reduxDefaultStore.getState()).toEqual({ foo: 'quux' });
    });
    describe('and has a watcher', () => {
      let WatcherClass, watcherClass, watcherStore: Store;
      beforeAll(() => {
        watcherStore = createStore(createBasicReducer(UPDATE_ACTION), { ...initialState });
        const selector = createSelector(
          state => state,
          (state: any) => state.foo
        );
        connect = connectMixin(watcherStore);
        WatcherClass = class Watcher extends connect(BaseClass) {
          constructor() {
            super();
            watch(selector, { store: watcherStore })(this, 'foo');
          }
          foo: any;
        };
        watcherClass = new WatcherClass();
      });
      it('should have default value corresponding to state value', () =>
        expect(watcherClass.foo).toEqual(initialState.foo));
      it('should update value of property when action is dispatched', done => {
        watcherStore.dispatch(createAction(UPDATE_ACTION)({ foo: 'test' }));
        expect(WatcherClass.reduxDefaultStore.getState()).toEqual({ foo: 'test' });
        timeOut.run(() => {
          expect(watcherClass.foo).toEqual('test');
          done();
        }, 20);
      });
    });
  });
});
