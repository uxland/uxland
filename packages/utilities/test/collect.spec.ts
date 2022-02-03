import {expect} from '@open-wc/testing';
import {collect} from '../collect';
describe('when invoking `collect` method', () => {
  describe('given no input object is provided', () => {
    it('should return empty object if key is not provided', () =>
      expect(collect(undefined, undefined)).to.deep.equal({}));
    it('should return empty object if key is provided', () =>
      expect(collect(undefined, 'foo')).to.deep.equal({}));
  });
  describe('given an input object is provided', () => {
    describe('if provided object is not an object', () => {
      it('should return empty object', () => expect(collect('foo', 'foo')).to.deep.equal({}));
    });
    describe('if provided object is initial', () => {
      it('should return empty object if key is not provided', () =>
        expect(collect({}, undefined)).to.deep.equal({}));
      it('should return empty object if key is provided', () =>
        expect(collect({}, 'foo')).to.deep.equal({}));
    });
    describe('if provided object is not initial', () => {
      describe('if provided object is flat', () => {
        it('should return spreaded value', () =>
          expect(collect({foo: 'bar'}, 'foo')).to.deep.equal({
            0: 'b',
            1: 'a',
            2: 'r',
          }));
      });
      describe('if provided object is nested', () => {
        it('should return empty object if provided key does not exist', () =>
          expect(collect({foo: {bar: 'qux'}}, 'quux')).to.deep.equal({}));
        it('should return sub-object for provided key', () =>
          expect(collect({foo: {bar: 'qux'}}, 'foo')).to.deep.equal({
            bar: 'qux',
          }));
        it('should return prototype if existing', () => {
          const array = new Array(['foo', 'bar']);
          Object.defineProperty(array.constructor, 'WATCHED_PROPERTIES_PROPERTY', {
            get() {
              return {foo: 'bar'};
            },
            enumerable: true,
            configurable: true,
          });
          expect(collect(array.constructor, 'WATCHED_PROPERTIES_PROPERTY')).to.deep.equal({
            foo: 'bar',
          });
        });
      });
    });
  });
});
