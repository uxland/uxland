import {AsyncQueue} from '../../async/async-queue';
describe('Given an instance of AsyncQueue', () => {
  describe('and no item is enqueued', () => {
    it('should not call executor', () => {
      const spy = jest.fn();
      const queue = new AsyncQueue(spy);
      expect(spy).not.toBeCalled();
    });
  });
  describe('and an item is enqueued', () => {
    it('should call executor one time', () => {
      const spy = jest.fn();
      const queue = new AsyncQueue(spy);
      queue.enqueueItem(1);
      expect(spy).toBeCalled();
    });
  });
  describe('and N items are enqueued', () => {
    it('should call executor one time, with first enqueued item arguments', () => {
      const spy = jest.fn();
      const queue = new AsyncQueue(spy);
      queue.enqueueItem(1);
      queue.enqueueItem(2);
      queue.enqueueItem(3);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(1);
    });
  });
});
