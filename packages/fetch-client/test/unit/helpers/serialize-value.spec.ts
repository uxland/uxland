import {expect} from '@open-wc/testing';
import {serializeValue} from '../../../helpers/serialize-value';

describe('Given a value provided to serializeValue function', () => {
  describe('that is undefined', () => {
    it('should return empty string', () => expect(serializeValue(undefined)).to.deep.equal(''));
  });
  describe('that is null', () => {
    it('should return empty string', () => expect(serializeValue(null)).to.deep.equal(''));
  });
  describe('that is a string', () => {
    describe('and is empty string', () => {
      it('should return empty string', () => expect(serializeValue('')).to.deep.equal(''));
    });
    describe('and is simple string', () => {
      it('should return same string', () => expect(serializeValue('dummy')).to.deep.equal('dummy'));
    });
    describe('and is decoded string', () => {
      it('should return encoded string', () =>
        expect(serializeValue('@dummy')).to.deep.equal(encodeURIComponent('@dummy')));
    });
  });
  describe('that is a number', () => {
    it('should return number as string', () => expect(serializeValue(5)).to.deep.equal('5'));
  });
  describe('that is a boolean', () => {
    it('should return same input as string', () =>
      expect(serializeValue(true)).to.deep.equal('true'));
  });
});
