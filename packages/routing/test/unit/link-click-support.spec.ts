import {initializeLinkClickSupport} from '../../src/link-click-support';
import Router from './router-mock';
jest.mock('./router-mock');

describe('Link click support', () => {
  describe('given an anchor element', () => {
    beforeEach(() => (Router as any).mockClear());

    it('should call router navigate fn if origin and link url are the same', done => {
      expect(Router).not.toHaveBeenCalled();
      const router = new Router();
      expect(Router).toHaveBeenCalledTimes(1);
      initializeLinkClickSupport(router);
      const anchor = document.createElement('a');
      anchor.href = 'http://localhost/path';
      document.body.appendChild(anchor);
      anchor.click();

      const routerInstance = (Router as any).mock.instances[0];
      const mockNavigate = routerInstance.navigate;
      queueMicrotask(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        done();
      });
    });
    it('should not call router navigate fn if origin and link url are the same', done => {
      expect(Router).not.toHaveBeenCalled();
      const router = new Router();
      expect(Router).toHaveBeenCalledTimes(1);
      initializeLinkClickSupport(router);
      const anchor = document.createElement('a');
      anchor.href = 'http://google/path';
      document.body.appendChild(anchor);
      anchor.click();

      const routerInstance = (Router as any).mock.instances[0];
      const mockNavigate = routerInstance.navigate;
      queueMicrotask(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(0);
        done();
      });
    });
    it('should not call router navigate fn if anchor target is _blank', done => {
      expect(Router).not.toHaveBeenCalled();
      const router = new Router();
      expect(Router).toHaveBeenCalledTimes(1);
      initializeLinkClickSupport(router);
      const anchor = document.createElement('a');
      anchor.href = 'http://localhost/path';
      anchor.target = '_blank';
      document.body.appendChild(anchor);
      anchor.click();

      const routerInstance = (Router as any).mock.instances[0];
      const mockNavigate = routerInstance.navigate;
      queueMicrotask(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(0);
        done();
      });
    });
    it('should not call router navigate fn if anchor target is _top', done => {
      expect(Router).not.toHaveBeenCalled();
      const router = new Router();
      expect(Router).toHaveBeenCalledTimes(1);
      initializeLinkClickSupport(router);
      const anchor = document.createElement('a');
      anchor.href = 'http://localhost/path';
      anchor.target = '_top';
      document.body.appendChild(anchor);
      anchor.click();

      const routerInstance = (Router as any).mock.instances[0];
      const mockNavigate = routerInstance.navigate;
      queueMicrotask(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(0);
        done();
      });
    });
    it('should not call router navigate fn if anchor target is _parent', done => {
      expect(Router).not.toHaveBeenCalled();
      const router = new Router();
      expect(Router).toHaveBeenCalledTimes(1);
      initializeLinkClickSupport(router);
      const anchor = document.createElement('a');
      anchor.href = 'http://localhost/path';
      anchor.target = '_parent';
      document.body.appendChild(anchor);
      anchor.click();

      const routerInstance = (Router as any).mock.instances[0];
      const mockNavigate = routerInstance.navigate;
      queueMicrotask(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(0);
        done();
      });
    });
    it('should not call router navigate fn if anchor is downloader', done => {
      expect(Router).not.toHaveBeenCalled();
      const router = new Router();
      expect(Router).toHaveBeenCalledTimes(1);
      initializeLinkClickSupport(router);
      const anchor = document.createElement('a');
      anchor.href = 'http://localhost/path';
      anchor.download = 'true';
      document.body.appendChild(anchor);
      anchor.click();

      const routerInstance = (Router as any).mock.instances[0];
      const mockNavigate = routerInstance.navigate;
      queueMicrotask(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });

  describe('given a button element', () => {
    beforeEach(() => (Router as any).mockClear());

    it('should call router navigate fn if origin and link url are the same', done => {
      expect(Router).not.toHaveBeenCalled();
      const router = new Router();
      expect(Router).toHaveBeenCalledTimes(1);
      initializeLinkClickSupport(router);
      const button = document.createElement('button');
      document.body.appendChild(button);
      button.click();

      const routerInstance = (Router as any).mock.instances[0];
      const mockNavigate = routerInstance.navigate;
      queueMicrotask(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(0);
        done();
      });
    });
    it('should not call router navigate fn if origin and link url are the same', done => {
      expect(Router).not.toHaveBeenCalled();
      const router = new Router();
      expect(Router).toHaveBeenCalledTimes(1);
      initializeLinkClickSupport(router);
      const button = document.createElement('button');
      document.body.appendChild(button);
      button.click();

      const routerInstance = (Router as any).mock.instances[0];
      const mockNavigate = routerInstance.navigate;
      queueMicrotask(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });
});
