import { expect } from "@open-wc/testing";
import { createStore } from "redux";
import { createAction } from "../../../legacy/create-action";
import { createBasicReducer } from "../../../legacy/create-basic-reducer";
import {
  createWatchedReduxProperty,
  getWatchedProperties,
} from "../../../legacy/watched-redux-property";

describe("watched redux property fixture", () => {
  describe("when invoking `createWatchedReduxProperty`", () => {
    let store;
    const UPDATE_ACTION = "UPDATE";
    const initialState = { foo: "bar" };
    const WATCHED_PROPERTIES_PROPERTY = "WATCHED-PROPERTIES-PROPERTY";
    const watchedProperty = "foo";

    beforeEach(() => {
      store = createStore(createBasicReducer(UPDATE_ACTION), initialState);
    });
    it('should extend constructor with a new object "WATCHED-PROPERTIES-PROPERTY"', () => {
      const array = new Array("dummy");
      expect(array.constructor[WATCHED_PROPERTIES_PROPERTY]).to.be.undefined;
      createWatchedReduxProperty({ store }, array, watchedProperty);
      expect(array.constructor[WATCHED_PROPERTIES_PROPERTY]).to.not.be
        .undefined;
      expect(array.constructor[WATCHED_PROPERTIES_PROPERTY][watchedProperty]).to
        .not.be.undefined;
    });
    it("watched property should be store-based and with initial state", () => {
      const array = new Array("dummy");
      createWatchedReduxProperty({ store }, array, watchedProperty);
      expect(
        array.constructor[WATCHED_PROPERTIES_PROPERTY][watchedProperty].store
      ).to.not.be.undefined;
      expect(
        array.constructor[WATCHED_PROPERTIES_PROPERTY][
          watchedProperty
        ].store.getState()
      ).to.deep.equal(initialState);
    });
    it("should have updated state when action is dispatched", () => {
      const array = new Array("dummy");
      createWatchedReduxProperty({ store }, array, watchedProperty);
      const property =
        array.constructor[WATCHED_PROPERTIES_PROPERTY][watchedProperty];
      expect(property.store.getState()).to.deep.equal(initialState);
      store.dispatch(createAction(UPDATE_ACTION)({ foo: "quux" }));
      expect(property.store.getState()).to.deep.equal({ foo: "quux" });
    });
  });
  describe("when invoking `getWatchedProperties`", () => {
    let store;
    const UPDATE_ACTION = "UPDATE";
    const initialState = { foo: "bar" };

    beforeEach(() => {
      store = createStore(createBasicReducer(UPDATE_ACTION), initialState);
    });
    it("should return initial if no watcher has been defined", () => {
      const obj = new String();
      expect(getWatchedProperties(obj)).to.deep.equal({});
    });
    it("should return store object if watcher has been defined", () => {
      const obj = new String();
      createWatchedReduxProperty({ store }, obj, "foo");
      expect(getWatchedProperties(obj)).to.deep.equal({ foo: { store } });
    });
  });
});
