import {expect} from '@open-wc/testing';
import {mergeRequest} from '../../../helpers/merge-request';

describe('Given an initial request', () => {
  const request: RequestInit = {method: 'POST'};
  describe('when no extra configuration is provided', () => {
    it('should return same request', () =>
      expect(mergeRequest(request, undefined)).to.deep.equal(request));
  });
  describe('when extra configuration is provided', () => {
    const config = {mode: 'include'};
    it('should return merged request and configuration', () =>
      expect(mergeRequest(request, config)).to.deep.equal({
        ...request,
        ...config,
      }));
  });
  describe('when request has headers', () => {
    describe('and configuration has headers', () => {
      it('should return merged request and config, merging headers too', () => {
        const config = {
          mode: 'include',
          headers: {authorization: 'Basic XXXXXX'},
        };
        const requestWithHeaders = {
          method: 'POST',
          headers: {'content-type': 'application/json'},
        };
        expect(mergeRequest(requestWithHeaders, config)).to.deep.equal({
          method: requestWithHeaders.method,
          mode: config.mode,
          headers: {
            authorization: config.headers.authorization,
            'content-type': requestWithHeaders.headers['content-type'],
          },
        });
      });
    });
  });
});
