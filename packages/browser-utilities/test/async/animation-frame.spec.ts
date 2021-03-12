import {animationFrame} from '../../async/animation-frame';
class RequestAnimationFrameMockSession {
  handleCounter = 0;
  queue = new Map();
  requestAnimationFrame(callback) {
    const handle = this.handleCounter++;
    this.queue.set(handle, callback);
    return handle;
  }
  cancelAnimationFrame(handle) {
    this.queue.delete(handle);
  }
  triggerNextAnimationFrame(time = performance.now()) {
    const nextEntry = this.queue.entries().next().value;
    if (nextEntry === undefined) return;

    const [nextHandle, nextCallback] = nextEntry;

    nextCallback(time);
    this.queue.delete(nextHandle);
  }
  triggerAllAnimationFrames(time = performance.now()) {
    while (this.queue.size > 0) this.triggerNextAnimationFrame(time);
  }
  reset() {
    this.queue.clear();
    this.handleCounter = 0;
  }
}

export const requestAnimationFrameMock = new RequestAnimationFrameMockSession();

window.requestAnimationFrame = requestAnimationFrameMock.requestAnimationFrame.bind(
  requestAnimationFrameMock
);
window.cancelAnimationFrame = requestAnimationFrameMock.cancelAnimationFrame.bind(
  requestAnimationFrameMock
);
//@ts-ignore
window.triggerNextAnimationFrame = requestAnimationFrameMock.triggerNextAnimationFrame.bind(
  requestAnimationFrameMock
);

describe('Given the animationFrame functionality', () => {
  describe('when providing a callback', () => {
    it('should call the provided callback after the animation frame', () => {
      const callback = jest.fn();
      const handler = animationFrame.run(callback);
      expect(callback).not.toHaveBeenCalled();
      //@ts-ignore
      window.triggerNextAnimationFrame();
      expect(callback).toHaveBeenCalled();
      // expect(animationFrame).toBeDefined();
    });
    describe('when cancelling', () => {
      it('should not call callback after next animation frame', () => {
        const callback = jest.fn();
        const handler = animationFrame.run(callback);
        expect(callback).not.toHaveBeenCalled();
        animationFrame.cancel(handler);
        //@ts-ignore
        window.triggerNextAnimationFrame();
        expect(callback).not.toHaveBeenCalled();
      });
    });
  });
});
