import { assert, expect } from "@open-wc/testing";
import { flatten } from "ramda";
import { spy as spySinon, stub } from "sinon";
import { createActionThunk } from "../../../legacy";

const type = "ACTION";
const actionCreator =
  (base: string) =>
  (action: string): string =>
    `${base}_${action}`;
const endedAction = actionCreator(type)("ENDED");
const startedAction = actionCreator(type)("STARTED");
const failedAction = actionCreator(type)("FAILED");
const succeededAction = actionCreator(type)("SUCCEEDED");

describe("create action thunk fixture", () => {
  const createAsyncSucceededThunkFactory = (result?, meta?): any =>
    createActionThunk(type, () => Promise.resolve(result), meta);
  const createAsyncFailedThunkFactory = (error?, meta?): any =>
    createActionThunk(type, () => Promise.reject(error || false), meta);
  const createSucceededThunkFactory = (result?, metaCreator?): any =>
    createActionThunk(type, () => result, metaCreator);
  const createFailedThunkFactory = (error?, metaCreator?): any =>
    createActionThunk(
      type,
      () => {
        if (error) throw error;
        throw new Error();
      },
      metaCreator
    );
  const dispatchAsyncAction =
    (factoryCreator) =>
    async (result?, meta?, ...args: any[]): Promise<any> => {
      const factory = factoryCreator(result, meta);
      const thunk = factory(...args);
      const spy = spySinon();
      try {
        await thunk(spy);
      } catch (e) {
        //console.log(e);
      }
      return spy;
    };
  const dispatchAction =
    (factoryCreator) =>
    (result?, meta?, ...args): any => {
      const factory = factoryCreator(result, meta);
      const thunk = factory(...args);
      const spy = spySinon();
      try {
        thunk(spy);
      } catch (e) {
        //console.log(e);
      }
      return spy;
    };
  const dispatchAsyncSucceededActionThunk = dispatchAsyncAction(
    createAsyncSucceededThunkFactory
  );
  const dispatchAsyncFailedActionThunk = dispatchAsyncAction(
    createAsyncFailedThunkFactory
  );
  const dispatchSucceededActionThunk = dispatchAction(
    createSucceededThunkFactory
  );
  const dispatchFailedActionThunk = dispatchAction(createFailedThunkFactory);

  it("dispatches started action first", (done) => {
    dispatchAsyncSucceededActionThunk()
      .then((spy) => {
        let started: any = spy.getCalls()[0];
        expect(started.args[0].type).to.deep.equal(startedAction);
        dispatchAsyncFailedActionThunk().then((spy) => {
          started = spy.getCalls()[0];
          expect(started.firstArg.type).to.deep.equal(startedAction);
        });
        // spy = await dispatchAsyncFailedActionThunk();
      })
      .catch((e) => console.log(e))
      .finally(done);
    // let spy = await dispatchAsyncSucceededActionThunk();
  });
  it("started action payload should not exist", async () => {
    let spy = await dispatchAsyncSucceededActionThunk();
    let started: any = spy.getCalls()[0];
    expect(started.args[0].payload).to.be.undefined;
    spy = await dispatchAsyncFailedActionThunk();
    started = spy.getCalls()[0];
    expect(started.args[0].payload).to.be.undefined;
  });
  it("started action should contain meta if supplied", async () => {
    const meta = { id: 1 };
    let spy = await dispatchAsyncSucceededActionThunk(
      undefined,
      (meta) => meta,
      meta
    );
    let started: any = spy.getCalls()[0];
    expect(started.args[0].meta).to.not.be.undefined;
    expect(started.args[0].meta).to.equal(meta);
    spy = await dispatchAsyncFailedActionThunk(undefined, (meta) => meta, meta);
    started = spy.getCalls()[0];
    expect(started.args[0].meta).to.not.be.undefined;
    expect(started.args[0].meta).to.equal(meta);
  });
  it("dispatches started, succeeded and ended actions if function succeeds", async () => {
    const spy = await dispatchAsyncSucceededActionThunk();
    const actions: any[] = flatten(spy.getCalls());
    expect(actions.length).to.equal(3);
    expect(actions[0].firstArg.type).to.equal(startedAction);
    expect(actions[1].firstArg.type).to.equal(succeededAction);
    expect(actions[2].firstArg.type).to.equal(endedAction);
  });

  it("succeeded action should contain meta if supplied", async () => {
    const result = { result: 10 };
    const meta1 = { id: 1 };
    const meta2 = { id: 2 };
    const spy = await dispatchAsyncSucceededActionThunk(
      result,
      (meta1, meta2) => ({ meta1, meta2 }),
      meta1,
      meta2
    );
    const succeeded: any = flatten(spy.getCalls())[1];
    expect(succeeded.args[0].meta).to.not.be.undefined;
    expect(succeeded.args[0].meta.meta1).to.not.be.undefined;
    expect(succeeded.args[0].meta.meta1).to.equal(meta1);
    expect(succeeded.args[0].meta.meta2).to.not.be.undefined;
    expect(succeeded.args[0].meta.meta2).to.equal(meta2);
  });
  it("succeeded action payload is result of function", async () => {
    const result = { result: 10 };
    const meta1 = { id: 1 };
    const meta2 = { id: 2 };
    const spy = await dispatchAsyncSucceededActionThunk(
      result,
      (meta1, meta2) => ({ meta1, meta2 }),
      meta1,
      meta2
    );
    const succeeded: any = flatten(spy.getCalls())[1];
    expect(succeeded.args[0].payload).to.equal(result);
  });
  it("params are passed to function (dispatch and getState too)", async () => {
    const param1 = 1;
    const param2 = 2;
    const param3 = 3;
    const func = { fn: (): Promise<boolean> => Promise.resolve(true) };
    const functionSpy = stub(func, "fn");
    const factory = createActionThunk(
      type,
      func.fn.bind(func),
      (p1, p2, p3) => ({ p1, p2, p3 })
    );
    const thunk = factory(param1, param2, param3);
    const spy = spySinon();
    await thunk(spy);
    const succeeded: any = flatten(spy.getCalls())[1];
    expect(succeeded.args[0].meta).to.not.be.undefined;
    expect(succeeded.args[0].meta).to.deep.equal({
      p1: param1,
      p2: param2,
      p3: param3,
    });
    assert(
      functionSpy.calledWith(param1, param2, param3, {
        getState: undefined,
        extra: undefined,
        dispatch: spy,
      })
    );
    assert(functionSpy.calledOnce);
  });
  it("dispatches started, failed and ended if function fails", async () => {
    const spy = await dispatchAsyncFailedActionThunk();
    const actions: any[] = flatten(spy.getCalls());
    expect(actions.length).to.equal(3);
    expect(actions[0].firstArg.type).to.deep.equal(startedAction);
    expect(actions[1].firstArg.type).to.deep.equal(failedAction);
    expect(actions[2].firstArg.type).to.deep.equal(endedAction);
  });
  it("failed action should contain meta if supplied", async () => {
    const result = { result: 10 };
    const meta1 = { id: 1 };
    const meta2 = { id: 2 };
    const spy = await dispatchAsyncFailedActionThunk(
      result,
      (meta1, meta2) => ({ meta1, meta2 }),
      meta1,
      meta2
    );
    const failed: any = flatten(spy.getCalls())[1];
    expect(failed.args[0].meta).to.not.be.undefined;
    expect(failed.args[0].meta.meta1).to.not.be.undefined;
    expect(failed.args[0].meta.meta1).to.equal(meta1);
    expect(failed.args[0].meta.meta2).to.not.be.undefined;
    expect(failed.args[0].meta.meta2).to.equal(meta2);
  });
  it("failed action payload should contain error", async () => {
    const result = new Error("error");
    const meta1 = { id: 1 };
    const meta2 = { id: 2 };
    const spy = await dispatchAsyncFailedActionThunk(
      result,
      (meta1, meta2) => ({ meta1, meta2 }),
      meta1,
      meta2
    );
    const failed: any = flatten(spy.getCalls())[1];
    expect(failed.args[0].payload).to.deep.equal(result);
    expect(failed.args[0].error).to.equal(true);
  });
  it("ended action payload contains elapsed", async () => {
    const metaCreator = (meta1, meta2): any => ({ meta1, meta2 });
    let spy = await dispatchAsyncSucceededActionThunk(
      "eureka!",
      metaCreator,
      1,
      2
    );
    let ended: any = flatten(spy.getCalls())[2];
    expect(ended.args[0].payload.elapsed).to.not.be.undefined;
    spy = await dispatchAsyncFailedActionThunk(
      new Error("eureka!"),
      metaCreator,
      1,
      2
    );
    ended = flatten(spy.getCalls())[2];
    expect(ended.args[0].payload.elapsed).to.not.be.undefined;
  });
  it("ended action should contain meta if supplied", async () => {
    const meta1 = { id: 1 };
    const meta2 = { id: 2 };
    const metaCreator = (meta1, meta2): any => ({ meta1, meta2 });
    let spy = await dispatchAsyncSucceededActionThunk(
      "eureka!",
      metaCreator,
      meta1,
      meta2
    );
    let ended: any = flatten(spy.getCalls())[2];
    expect(ended.args[0].meta).to.not.be.undefined;
    expect(ended.args[0].meta.meta1).to.not.be.undefined;
    expect(ended.args[0].meta.meta1).to.deep.equal(meta1);
    expect(ended.args[0].meta.meta2).to.not.be.undefined;
    expect(ended.args[0].meta.meta2).to.deep.equal(meta2);
    spy = await dispatchAsyncFailedActionThunk(
      new Error("eureka!"),
      metaCreator,
      meta1,
      meta2
    );
    ended = flatten(spy.getCalls())[2];
    expect(ended.args[0].meta).to.not.be.undefined;
    expect(ended.args[0].meta.meta1).to.not.be.undefined;
    expect(ended.args[0].meta.meta1).to.deep.equal(meta1);
    expect(ended.args[0].meta.meta2).to.not.be.undefined;
    expect(ended.args[0].meta.meta2).to.deep.equal(meta2);
  });
  it("(Not promise)dispatches started, succeeded and ended actions if function succeeds", () => {
    const spy = dispatchSucceededActionThunk();
    const actions: any[] = flatten(spy.getCalls());
    expect(actions.length).to.equal(3);
    expect(actions[0].firstArg.type).to.equal(startedAction);
    expect(actions[1].firstArg.type).to.equal(succeededAction);
    expect(actions[2].firstArg.type).to.equal(endedAction);
  });

  it("(Not promise) succeeded action should contain meta if supplied", () => {
    const result = { result: 10 };
    const meta1 = { id: 1 };
    const meta2 = { id: 2 };
    const spy = dispatchSucceededActionThunk(
      result,
      (meta1, meta2) => ({ meta1, meta2 }),
      meta1,
      meta2
    );
    const succeeded: any = flatten(spy.getCalls())[1];
    expect(succeeded.args[0].meta).to.not.be.undefined;
    expect(succeeded.args[0].meta.meta1).to.not.be.undefined;
    expect(succeeded.args[0].meta.meta1).to.deep.equal(meta1);
    expect(succeeded.args[0].meta.meta2).to.not.be.undefined;
    expect(succeeded.args[0].meta.meta2).to.deep.equal(meta2);
  });

  it("(Not promise) succeeded action payload is result of function", () => {
    const expected = { result: 10 };
    const meta1 = { id: 1 };
    const meta2 = { id: 2 };
    const spy = dispatchSucceededActionThunk(
      expected,
      (meta1, meta2) => ({ meta1, meta2 }),
      meta1,
      meta2
    );
    const succeeded: any = flatten(spy.getCalls())[1];
    expect(succeeded.args[0].payload).to.deep.equal(expected);
  });

  it("(Not promise) params are passed to function (dispatch and getState too)", () => {
    const param1 = 1;
    const param2 = 2;
    const param3 = 3;
    const func = { fn: (): boolean => true };
    const functionSpy = stub(func, "fn");
    const factory = createActionThunk(
      type,
      func.fn.bind(func),
      (p1, p2, p3) => ({ p1, p2, p3 })
    );
    const thunk = factory(param1, param2, param3);
    const spy = spySinon();
    thunk(spy);
    const succeeded: any = flatten(spy.getCalls())[1];
    expect(succeeded.args[0].meta).to.not.be.undefined;
    expect(succeeded.args[0].meta).to.deep.equal({
      p1: param1,
      p2: param2,
      p3: param3,
    });
    assert(
      functionSpy.calledWith(param1, param2, param3, {
        getState: undefined,
        extra: undefined,
        dispatch: spy,
      })
    );
    assert(functionSpy.calledOnce);
  });

  it("(Not promise) dispatches started, failed and ended if function fails", () => {
    const spy = dispatchFailedActionThunk();
    const actions: any[] = flatten(spy.getCalls());
    expect(actions.length).to.equal(3);
    expect(actions[0].firstArg.type).to.equal(startedAction);
    expect(actions[1].firstArg.type).to.equal(failedAction);
    expect(actions[2].firstArg.type).to.equal(endedAction);
  });

  it("(Not promise) failed action should contain meta if supplied", () => {
    const result = { result: 10 };
    const meta1 = { id: 1 };
    const meta2 = { id: 2 };
    const spy = dispatchFailedActionThunk(
      result,
      (meta1, meta2) => ({ meta1, meta2 }),
      meta1,
      meta2
    );
    const failed: any = flatten(spy.getCalls())[1];
    expect(failed.args[0].meta).to.not.be.undefined;
    expect(failed.args[0].meta.meta1).to.not.be.undefined;
    expect(failed.args[0].meta.meta1).to.equal(meta1);
    expect(failed.args[0].meta.meta2).to.not.be.undefined;
    expect(failed.args[0].meta.meta2).to.equal(meta2);
  });

  it("(Not Promise) failed action payload should contain error", () => {
    const result = new Error("error");
    const meta1 = { id: 1 };
    const meta2 = { id: 2 };
    const spy = dispatchFailedActionThunk(
      result,
      (meta1, meta2) => ({ meta1, meta2 }),
      meta1,
      meta2
    );
    const failed: any = flatten(spy.getCalls())[1];
    expect(failed.args[0].payload).to.equal(result);
    expect(failed.args[0].error).to.equal(true);
  });

  it("(Not Promise) ended action payload contains elapsed", () => {
    const metaCreator = (meta1, meta2): any => ({ meta1, meta2 });
    let spy = dispatchSucceededActionThunk("eureka!", metaCreator, 1, 2);
    let ended: any = flatten(spy.getCalls())[2];
    expect(ended.args[0].payload.elapsed).to.not.be.undefined;
    spy = dispatchFailedActionThunk(new Error("eureka!"), metaCreator, 1, 2);
    ended = flatten(spy.getCalls())[2];
    expect(ended.args[0].payload.elapsed).to.not.be.undefined;
  });
  it("(Not promise) ended action should contain meta if supplied", () => {
    const meta1 = { id: 1 };
    const meta2 = { id: 2 };
    const metaCreator = (meta1, meta2): any => ({ meta1, meta2 });
    let spy = dispatchSucceededActionThunk(
      "eureka!",
      metaCreator,
      meta1,
      meta2
    );
    let ended: any = flatten(spy.getCalls())[2];
    expect(ended.args[0].meta).to.not.be.undefined;
    expect(ended.args[0].meta.meta1).to.not.be.undefined;
    expect(ended.args[0].meta.meta1).to.deep.equal(meta1);
    expect(ended.args[0].meta.meta2).to.not.be.undefined;
    expect(ended.args[0].meta.meta2).to.deep.equal(meta2);
    spy = dispatchFailedActionThunk(
      new Error("eureka!"),
      metaCreator,
      meta1,
      meta2
    );
    ended = flatten(spy.getCalls())[2];
    expect(ended.args[0].meta).to.not.be.undefined;
    expect(ended.args[0].meta.meta1).to.not.be.undefined;
    expect(ended.args[0].meta.meta1).to.deep.equal(meta1);
    expect(ended.args[0].meta.meta2).to.not.be.undefined;
    expect(ended.args[0].meta.meta2).to.deep.equal(meta2);
  });
});
