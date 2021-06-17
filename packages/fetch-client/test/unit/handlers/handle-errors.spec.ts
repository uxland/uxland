import {assert, expect} from '@open-wc/testing';
import {subscribe} from '@uxland/event-aggregator';
import {spy} from 'sinon';
import {
  handleErrors,
  INVALID_CREDENTIALS_EVENT,
  INVALID_REQUEST_EVENT,
} from '../../../handlers/handle-errors';

describe('Given a response', () => {
  describe('and response is ok', () => {
    const response: any = {
      ok: true,
      status: 200,
      json: () => Promise.resolve({foo: 'bar'}),
    };
    it('should return response', done => {
      handleErrors(response).then(r => {
        expect(r).to.deep.equal(response);
        done();
      });
    });
  });
  describe('and response is not ok', () => {
    describe('if result contains body', () => {
      it('should throw a new error containing data body, status and statusText', done => {
        const response: any = {
          ok: false,
          status: 401,
          statusText: 'Crendentials invalid',
          json: () => Promise.resolve({foo: 'bar'}),
        };
        response.json().then(data => {
          const error = {
            ...new Error(),
            data,
            status: response.status,
            statusText: response.statusText,
          };
          handleErrors(response)
            .then()
            .catch(err => {
              expect(err).to.deep.equal(error);
            })
            .finally(() => done());
        });
      });
    });
    describe('if body deserialization fails', () => {
      it('should return error containing status and statusText', done => {
        const response: any = {
          ok: false,
          status: 401,
          statusText: 'Crendentials invalid',
          json: () => Promise.reject(),
        };
        const error = {
          ...new Error(),
          status: response.status,
          statusText: response.statusText,
        };
        handleErrors(response)
          .then()
          .catch(err => {
            expect(err).to.deep.equal(error);
          })
          .finally(done);
      });
    });
    describe('if status is 401', () => {
      it('should publish INVALID_CREDENTIALS_EVENT', done => {
        const r: any = {
          ok: false,
          status: 401,
          statusText: 'Crendentials invalid',
        };
        const error = {
          ...new Error(),
          status: r.status,
          statusText: r.statusText,
        };
        const subscriber = spy();
        subscribe(INVALID_CREDENTIALS_EVENT, (err: Error) => subscriber(err));
        handleErrors(r)
          .then()
          .catch(err => {
            assert(subscriber.calledOnce);
            assert(subscriber.calledWith(error));
          })
          .finally(done);
      });
    });
    describe('for any other status', () => {
      it('should publish INVALID_REQUEST_EVENT', done => {
        const r: any = {ok: false, status: 400, statusText: 'Dump'};
        const error = {
          ...new Error(),
          status: r.status,
          statusText: r.statusText,
        };
        const subscriber = spy();
        subscribe(INVALID_REQUEST_EVENT, (err: Error) => subscriber(err));
        handleErrors(r)
          .then(r)
          .catch(err => {
            assert(subscriber.calledOnce);
            assert(subscriber.calledWith(error));
          })
          .finally(done);
      });
    });
  });
});
