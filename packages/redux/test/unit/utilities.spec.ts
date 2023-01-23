import { createAsyncSlice } from "../../create-async-slice";
import { AsyncStateStatus } from "../../domain";

describe("When creating a new slice", () => {
  it("should have 4 actions", () => {
    const initialState = {
      status: AsyncStateStatus.idle,
      data: { foo: "bar" },
      error: null,
    };
    const slice = createAsyncSlice("slice", initialState);
    expect(slice.actions.setData).toBeDefined();
    expect(slice.actions.setError).toBeDefined();
    expect(slice.actions.setStatus).toBeDefined();
    expect(slice.name).toEqual("slice");
    expect(slice.getInitialState()).toEqual(initialState);
    expect(slice.reducer).toBeDefined();
  });
});
