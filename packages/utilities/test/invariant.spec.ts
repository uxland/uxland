import {assert, expect} from '@open-wc/testing';
import {spy} from 'sinon';
import {invariant} from '../invariant';

describe('when invoking `invariant` method', () => {
  describe('and a value is passed as first argument', () => {
    it('should return undefined if first argument is truthy', () => {
      expect(invariant(true)).to.be.undefined;
      expect(invariant(1)).to.be.undefined;
      expect(invariant({})).to.be.undefined;
    });
    it('should raise exception if first argument is falsy', () => {
      expect(() => invariant(false)).throw();
      expect(() => invariant(0)).throw();
      expect(() => invariant('')).throw();
      expect(() => invariant(null)).throw();
      expect(() => invariant(undefined)).throw();
      expect(() => invariant(NaN)).throw();
    });
    it('should set exception message if first argument is false if second argument is supplied', () => {
      expect(() => invariant(false, 'condition false')).throw('condition false');
      expect(() => invariant(0, 'condition 0')).throw('condition 0');
      expect(() => invariant('', 'condition empty string')).throw('condition empty string');
      expect(() => invariant(null, 'condition null')).throw('condition null');
      expect(() => invariant(undefined, 'condition undefined')).throw('condition undefined');
      expect(() => invariant(NaN, 'condition NaN')).throw('condition NaN');
    });
  });
  describe('and a function is passed as first argument', () => {
    it('should invoke function', () => {
      const spyFn = spy();
      try {
        invariant(spyFn);
      } catch (e) {
        console.log(e);
      }
      assert(spyFn.calledOnce);
    });
    // it("should raise error if function returns falsy", () => {
    //   const stub = spy();
    //     .mockReturnValueOnce(false)
    //     .mockReturnValueOnce(0)
    //     .mockReturnValueOnce("")
    //     .mockReturnValueOnce(null)
    //     .mockReturnValueOnce(undefined)
    //     .mockReturnValueOnce(NaN);
    //   expect(() => invariant(stub)).throw();
    //   expect(() => invariant(stub)).throw();
    //   expect(() => invariant(stub)).throw();
    //   expect(() => invariant(stub)).throw();
    //   expect(() => invariant(stub)).throw();
    //   expect(() => invariant(stub)).throw();
    //   expect(stub).toHaveBeenCalledTimes(6);
    // });
    it('should set exception message if function returns falsy and a second parameter is supplied', () => {
      expect(() => invariant(() => false, 'condition false')).throw('condition false');
      expect(() => invariant(() => 0, 'condition 0')).throw('condition 0');
      expect(() => invariant(() => '', 'condition empty string')).throw('condition empty string');
      expect(() => invariant(() => null, 'condition null')).throw('condition null');
      expect(() => invariant(() => undefined, 'condition undefined')).throw('condition undefined');
      expect(() => invariant(() => NaN, 'condition NaN')).throw('condition NaN');
    });
    it('should return undefined is function returns truthy', () => {
      const obj = {};
      const func = function (): void {
        console.log('function');
      };
      expect(invariant(() => true)).to.be.undefined;
      expect(invariant(() => 1));
      expect(invariant(() => 'a'));
      expect(invariant(() => obj));
      expect(invariant(() => []));
      expect(invariant(() => func));
    });
  });
});
