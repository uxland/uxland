import {timeOut} from '../../async/time-out';
describe('timeout fixture', () => {
  describe('when providing a callback', () => {
    it('should call callback after timeout', done => {
      const callback = jest.fn();
      expect(callback).not.toHaveBeenCalled();
      timeOut.run(callback, 100);
      setTimeout(() => {
        expect(callback).toHaveBeenCalled();
        done();
      }, 100);
    });
  });
  describe('when cancelling timeout before delay', () => {
    it('should not call callback after timeout', done => {
      const callback = jest.fn();
      expect(callback).not.toHaveBeenCalled();
      const handler = timeOut.run(callback, 1000);
      timeOut.cancel(handler);
      setTimeout(() => {
        expect(callback).not.toHaveBeenCalled();
        done();
      }, 1000);
    });
  });
  describe('when using after', () => {
    it('should call callback after timeout', done => {
      const callback = jest.fn();
      expect(callback).not.toHaveBeenCalled();
      timeOut.after(1000).run(callback);
      setTimeout(() => {
        expect(callback).toHaveBeenCalled();
        done();
      }, 1000);
    });
  });
});
