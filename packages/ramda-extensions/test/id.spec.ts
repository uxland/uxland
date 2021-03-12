import {id} from '../id';

describe('id fixture', () => {
  describe('Given an object with an id property', () => {
    const obj = {id: 'foo'};
    it('should return id property value', () => {
      expect(id(obj)).toBeDefined();
      expect(id(obj)).toEqual('foo');
    });
  });
  describe('Given an object without an id property', () => {
    const obj: any = {foo: 'bar'};
    it('should return undefined', () => {
      expect(id(obj)).toBeUndefined();
    });
  });
});
