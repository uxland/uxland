import {expect} from '@open-wc/testing';
import {AbapBoolean, SAPBooleanDeserializer, SAPBooleanSerializer} from '../..//boolean-serializer';
describe('Boolean serializer', () => {
  describe('SAP Boolean Serializer', () => {
    it('deserialize must return "X" when value is true', () => {
      expect(SAPBooleanDeserializer(true)).to.equal(AbapBoolean.True);
    });
    it('deserialize must return "" when value is false', () => {
      expect(SAPBooleanDeserializer(false)).to.equal(AbapBoolean.False);
    });
    it('serialize must return true when value is "X"', () => {
      expect(SAPBooleanSerializer(AbapBoolean.True)).to.equal(true);
    });
    it('serialize must return false when value is ""', () => {
      expect(SAPBooleanSerializer(AbapBoolean.False)).to.equal(false);
    });
  });
});
