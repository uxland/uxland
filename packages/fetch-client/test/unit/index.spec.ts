import {expect} from '@open-wc/testing';
import * as FC from '../../';

describe('Given a fetch client', () => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  describe('when setting base url', () => {
    it('should update fetch base url', () => {
      expect(FC.getBaseUrl()).to.deep.equal(undefined);
      FC.setBaseUrl('http://localhost');
      expect(FC.getBaseUrl()).to.deep.equal('http://localhost');
    });
  });
  describe('when configuring client', () => {
    it('should update client configuration', () => {
      expect(FC.getConfiguration()).to.deep.equal({
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      });
      FC.configure({mode: 'no-cors'});
      expect(FC.getConfiguration()).to.deep.equal({
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'no-cors',
      });
    });
  });
  describe('when setting headers', () => {
    it('should update headers in configuration', () => {
      expect(FC.getHeaders()).to.deep.equal(defaultHeaders);
      FC.setHeaders({authorization: 'Basic <token>'});
      expect(FC.getHeaders()).to.deep.equal({
        'Content-Type': 'application/json',
        authorization: 'Basic <token>',
      });
    });
  });
  describe('when resetting headers', () => {
    it('should set headers as default', () => {
      expect(FC.getHeaders()).to.deep.equal({
        'Content-Type': 'application/json',
        authorization: 'Basic <token>',
      });
      FC.resetHeaders();
      expect(FC.getHeaders()).to.deep.equal(defaultHeaders);
    });
  });
  describe('and deleting a header', () => {
    it('should update headers in configuration', () => {
      expect(FC.getHeaders()).to.deep.equal(defaultHeaders);
      FC.removeHeader('Content-Type');
      expect(FC.getHeaders()).to.deep.equal({});
    });
  });
  describe('and registering a handler', () => {
    it('should update handlers collection', () => {
      const dummyHandler = jest.fn().mockImplementation(a => a);
      expect(FC.getResponseHandlers()).to.deep.equal([]);
      FC.registerResponseHandler(dummyHandler);
      expect(FC.getResponseHandlers()).to.deep.equal([dummyHandler]);
      dummyHandler.mockClear();
    });
  });
  describe('when using fetch', () => {
    beforeEach(() => (fetch as any).mockClear());
    // describe('and fetch fails', () => {
    //   (global as any).fetch = jest.fn(() =>
    //     Promise.resolve({
    //       ok: false,
    //       status: 401,
    //       statusText: 'Credentials invalid',
    //       json: () => Promise.reject(),
    //     })
    //   );
    //   it('it should throw an exception with received status and statusText', async (done) => {
    //     try {
    //       await FC.doFetch('dummy');
    //     } catch (error) {
    //       expect(error).to.deep.equal({
    //         ...new Error(),
    //         status: 401,
    //         statusText: 'Credentials invalid',
    //       });
    //     } finally {
    //       done();
    //     }
    //   });
    // });
    describe('and fetch is successfull', () => {
      (global as any).fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({foo: 'bar'}),
        })
      );
      it('should return data', async done => {
        try {
          const data = await FC.doFetch('dummy');
          expect(data).to.deep.equal({foo: 'bar'});
        } finally {
          done();
        }
      });
    });
  });
});
