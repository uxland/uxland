import {expect} from '@open-wc/testing';
import {regExpResultToParams} from '../../../helpers/reg-expr-result-to-params';
import {replaceDynamicURLSegments} from '../../../helpers/replace-dynamic-url-segments';

describe('RegExp Result to Params', () => {
  describe('when provided match is undefined', () => {
    it('should return null', () => {
      const result = regExpResultToParams(undefined, ['id']);
      expect(result).to.be.null;
    });
  });
  describe('when provided array of parameter names is empty', () => {
    it('should return null', () => {
      const result = regExpResultToParams(undefined, []);
      expect(result).to.be.null;
    });
  });
  describe('when provided with an array of regexp and parameter names', () => {
    it('should return a collection of parameter name and corresponding segment in provided url', () => {
      const url = '/dummy/:id/:foo';
      const {regexp, paramNames} = replaceDynamicURLSegments(url);
      const match = url.replace(/^\/+/, '/').match(regexp);
      const result = regExpResultToParams(match, paramNames);
      expect(result).to.deep.equal({id: ':id', foo: ':foo'});
    });
  });
  it('', () => {
    regExpResultToParams(undefined, ['id', 'foo']);
  });
});
