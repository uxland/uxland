import { expect } from "@open-wc/testing";
import { actionNameBuilder } from "../../../legacy";

describe("constant builder", () => {
  it("action", () => {
    const action = actionNameBuilder("prefix")("my-action");
    expect(action).to.equal("prefix:my-action:ACTION");
  });
});
