import {expect} from '@open-wc/testing';
import {handleResponse} from '../../../handlers/handle-response';

describe('Given a response', () => {
  describe('and response content-type is json', () => {
    it('should return deserialized response body', done => {
      const response: any = {
        headers: {
          'content-type': 'application/json',
          get: (key: string) => 'application/json',
        },
        json: () => Promise.resolve({foo: 'bar'}),
      };
      handleResponse(response).then(r => {
        expect(r).to.deep.equal({foo: 'bar'});
        done();
      });
    });
    describe('and responseHandlers are provided', () => {
      it('should return deserialized response body applying handlers', done => {
        const response: any = {
          headers: {
            'content-type': 'application/json',
            get: (key: string) => 'application/json',
          },
          json: () => Promise.resolve({foo: 'bar'}),
        };
        const handlers = [input => ({...input, foo: input.foo.toUpperCase()})];
        handleResponse(response, handlers).then(r => {
          expect(r).to.deep.equal({
            foo: 'BAR',
          });
          done();
        });
      });
    });
  });
  describe('and response content-type is text', () => {
    it('should return deserialized response body', done => {
      const response: any = {
        headers: {
          'content-type': 'text/plain',
          get: (key: string) => 'text/plain',
        },
        text: () => Promise.resolve('dummy'),
      };
      handleResponse(response).then(r => {
        expect(r).to.deep.equal('dummy');
        done();
      });
    });
  });
});
