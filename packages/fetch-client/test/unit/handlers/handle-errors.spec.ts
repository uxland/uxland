import {subscribe} from '@uxland/event-aggregator';
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
    it('should return response', async done => {
      expect(await handleErrors(response)).toEqual(response);
      done();
    });
  });
  describe('and response is not ok', () => {
    describe('if result contains body', () => {
      it('should throw a new error containing data body, status and statusText', async done => {
        const response: any = {
          ok: false,
          status: 401,
          statusText: 'Crendentials invalid',
          json: () => Promise.resolve({foo: 'bar'}),
        };
        const data = await response.json();
        const error = {
          ...new Error(),
          data,
          status: response.status,
          statusText: response.statusText,
        };
        try {
          await handleErrors(response);
        } catch (err) {
          expect(err).toEqual(error);
        } finally {
          done();
        }
      });
    });
    describe('if body deserialization fails', () => {
      it('should return error containing status and statusText', async done => {
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
        try {
          await handleErrors(response);
        } catch (err) {
          expect(err).toEqual(error);
        } finally {
          done();
        }
      });
    });
    describe('if status is 401', () => {
      it('should publish INVALID_CREDENTIALS_EVENT', async done => {
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
        const subscriber = jest.fn();
        subscribe(INVALID_CREDENTIALS_EVENT, (err: Error) => subscriber(err));
        try {
          await handleErrors(r);
        } catch (err) {
          expect(subscriber).toHaveBeenCalled();
          expect(subscriber).toHaveBeenCalledWith(error);
        } finally {
          done();
        }
      });
    });
    describe('for any other status', () => {
      it('should publish INVALID_REQUEST_EVENT', async done => {
        const r: any = {ok: false, status: 400, statusText: 'Dump'};
        const error = {
          ...new Error(),
          status: r.status,
          statusText: r.statusText,
        };
        const subscriber = jest.fn();
        subscribe(INVALID_REQUEST_EVENT, (err: Error) => subscriber(err));
        try {
          await handleErrors(r);
        } catch (err) {
          expect(subscriber).toHaveBeenCalled();
          expect(subscriber).toHaveBeenCalledWith(error);
        } finally {
          done();
        }
      });
    });
  });
});
