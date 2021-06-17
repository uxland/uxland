import {expect} from '@open-wc/testing';
import {constantBuilder} from '../constant-builder';
describe('when invoking `constantBuilder` method for ACTION-NAME', () => {
  const ACTIONNAME = 'ACTION-NAME';
  describe('when a prefix is provided', () => {
    it('should return PREFIX + ACTION-NAME', () => {
      const constant = constantBuilder('PREFIX')(ACTIONNAME);
      expect(constant).to.equal(`PREFIX:${ACTIONNAME}`);
    });
  });
  describe('when a prefix and a suffix is provided', () => {
    it('should return PREFIX + ACTIONNAME + SUFFIX', () => {
      const constant = constantBuilder('PREFIX', 'SUFFIX')(ACTIONNAME);
      expect(constant).to.equal(`PREFIX:${ACTIONNAME}:SUFFIX`);
    });
  });
  describe('when a prefix, a suffix and a separator is provided', () => {
    it('should return PREFIX + SEPARATOR + ACTIONNAME + SEPARATOR + SUFFIX', () => {
      const constant = constantBuilder('PREFIX', 'SUFFIX', '$$')(ACTIONNAME);
      expect(constant).to.equal(`PREFIX$$${ACTIONNAME}$$SUFFIX`);
    });
  });
  describe('when nothing is provided', () => {
    it('should crash', () => {
      //@ts-ignore
      const fn = (): never => constantBuilder()(ACTIONNAME);
      expect(fn).throw();
    });
  });
});
