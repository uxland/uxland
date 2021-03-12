import {AsyncInterface} from './async-interface';

const run = (fn: (...args: any[]) => void, delay: number): number => setTimeout(fn, delay) as any;
const cancel = (handle: number): void => clearTimeout(handle);
const after: (delay: number) => AsyncInterface = delay =>
  ({
    run: (callback: (...args: any[]) => void) => run(callback, delay),
    cancel,
  } as AsyncInterface);
export const timeOut = {
  after,
  cancel,
  run,
};
