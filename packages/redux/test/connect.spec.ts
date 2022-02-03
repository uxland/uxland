import {expect} from '@open-wc/testing';
import {timeOut} from '@uxland/browser-utilities';
import {createStore, Store} from 'redux';
import {createSelector} from 'reselect';
import {connectMixin} from '..//connect';
import {createAction} from '..//create-action';
import {createBasicReducer} from '..//create-basic-reducer';
import {watch} from '..//watch';

describe('connect fixture', () => {
  describe('given a class that uses connectMixin', () => {
    let connect, testClass, defaultStore: Store;
    let BaseClass, TestClass;
    const initialState = {foo: 'bar'};
    const UPDATE_ACTION = 'UPDATE';
    beforeEach(() => {
      defaultStore = createStore(createBasicReducer(UPDATE_ACTION), {
        ...initialState,
      });
      connect = connectMixin(defaultStore);
      BaseClass = class Base {
        baseProp = 'foo';
      };
      TestClass = class Test extends connect(BaseClass) {};
      testClass = new TestClass();
    });
    it('should be instance of both Base and Test', () => {
      expect(testClass).to.be.instanceOf(BaseClass);
      expect(testClass).to.be.instanceOf(TestClass);
    });
    it('should have a "baseProp" constant from Base class defined', () =>
      expect(testClass.baseProp).to.deep.equal('foo'));
    it('should have a store defined equal to defaultStore', () =>
      expect(TestClass.reduxDefaultStore).to.deep.equal(defaultStore));
    it('should have updated state after dispatching action', () => {
      defaultStore.dispatch(createAction(UPDATE_ACTION)({foo: 'quux'}));
      expect(TestClass.reduxDefaultStore.getState()).to.deep.equal({
        foo: 'quux',
      });
    });
    describe('and has a watcher', () => {
      let WatcherClass, watcherClass, watcherStore: Store;
      beforeEach(() => {
        watcherStore = createStore(createBasicReducer(UPDATE_ACTION), {
          ...initialState,
        });
        const selector = createSelector(
          state => state,
          (state: any) => state.foo
        );
        connect = connectMixin(watcherStore);
        WatcherClass = class Watcher extends connect(BaseClass) {
          constructor() {
            super();
            watch(selector, {store: watcherStore})(this, 'foo');
          }
          foo: any;
        };
        watcherClass = new WatcherClass();
      });
      // it("should have default value corresponding to state value", () =>
      //   expect(watcherClass.foo).to.equal(initialState.foo));
      it('should update value of property when action is dispatched', done => {
        watcherStore.dispatch(createAction(UPDATE_ACTION)({foo: 'test'}));
        expect(WatcherClass.reduxDefaultStore.getState()).to.deep.equal({
          foo: 'test',
        });
        timeOut.run(() => {
          expect(watcherClass.foo).to.deep.equal('test');
          done();
        }, 20);
      });
    });
  });
});
