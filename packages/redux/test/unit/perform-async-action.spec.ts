import { createAsyncSlice } from "../../create-async-slice";
import { AsyncStateStatus } from "../../domain";
import { performAsyncAction } from "../../perform-async-action";
import { StoreService } from "../../store-service";
describe("Given a store", () => {
  let service: StoreService, slice;
  beforeAll(() => {
    slice = createAsyncSlice("foo", {
      status: AsyncStateStatus.idle,
      data: null,
      error: null,
    });
    service = new StoreService({ foo: slice.reducer }, "test", true);
  });
  describe("when performing async action", () => {
    it("should update store state for provided reducer if succeeded", async () => {
      const callback = () => {
        return Promise.resolve(true);
      };
      await performAsyncAction(
        service.dispatch.bind(service),
        slice.actions,
        callback
      );
      expect(service.getState().foo?.status).toEqual(
        AsyncStateStatus.succeeded
      );
      expect(service.getState().foo?.data).toEqual(true);
    });
    it("should update store state for provided reducer if failed", async () => {
      const callback = () => {
        return Promise.reject(new Error("true"));
      };
      performAsyncAction(
        service.dispatch.bind(service),
        slice.actions,
        callback
      ).catch((e) => {
        expect(service.getState().foo?.status).toEqual(AsyncStateStatus.failed);
        expect(service.getState().foo?.error).toEqual("true");
      });
    });
  });
});
