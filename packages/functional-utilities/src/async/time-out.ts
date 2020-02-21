import { AsyncInterface } from './async-interface';

const run = (fn: Function, delay: number): number => setTimeout(fn, delay);
const cancel = (handle: number): void => window.clearTimeout(handle);
const after: (delay: number) => AsyncInterface = delay =>
  ({ run: (callback: Function) => run(callback, delay), cancel } as AsyncInterface);
export const timeOut = {
  after,
  cancel,
  run
};
