import { expect } from "@open-wc/testing";
import { subMinutes } from "date-fns";
import { Duration, getDefaultState, isAsyncStateStale } from "../../../legacy";

describe("isAsyncStale-fixture", () => {
  it("should return true is state is null or undefined", () => {
    expect(isAsyncStateStale(null)).to.equal(true);
    expect(isAsyncStateStale(undefined)).to.equal(true);
  });
  it("should return true if is initial state", () => {
    expect(isAsyncStateStale(getDefaultState())).to.equal(true);
  });
  it("should return false if is already fetching", () => {
    expect(isAsyncStateStale({ isFetching: true })).to.equal(false);
  });
  it("should return true if is invalidated or has error", () => {
    expect(
      isAsyncStateStale({ didInvalidate: true, isFetching: false })
    ).to.equal(true);
    expect(isAsyncStateStale({ error: true, isFetching: false })).to.equal(
      true
    );
  });
  it("should return false if timestamp is null or undefined", () => {
    const interval: Duration = { amount: 10, unit: "days" };
    expect(
      isAsyncStateStale({ isFetching: false, timestamp: null }, interval)
    ).to.equal(false);
    expect(
      isAsyncStateStale({ isFetching: false, timestamp: undefined }, interval)
    ).to.equal(false);
  });
  it("should return false if timestamp is invalid date", () => {
    expect(
      isAsyncStateStale({ isFetching: false, timestamp: "hello" as any })
    ).to.equal(false);
  });
  it("should return false if timestamp plus stale interval is before now", () => {
    const timeStamp = subMinutes(new Date(), 10);
    expect(
      isAsyncStateStale(
        { isFetching: false, timestamp: timeStamp },
        { amount: 9, unit: "minutes" }
      )
    ).to.equal(false);
  });
  it("should return false if timestamp plus stale interval is afte now", () => {
    const timeStamp = subMinutes(new Date(), 10);
    expect(
      isAsyncStateStale(
        { isFetching: false, timestamp: timeStamp },
        { amount: 11, unit: "minutes" }
      )
    ).to.equal(true);
  });
});
