import { AxiosResponse } from "axios";
import { handleResponse } from "../../../src/handlers/handle-response";

describe("Given a response", () => {
  describe("and response content-type is json", () => {
    it("should return deserialized response body", async (done) => {
      const response: AxiosResponse = {
        headers: {
          "content-type": "application/json",
        },
        config: undefined,
        status: 200,
        statusText: "ok",
        data: { foo: "bar" },
      };
      expect(await handleResponse(response)).toEqual({ foo: "bar" });
      done();
    });
    describe("and responseHandlers are provided", () => {
      it("should return deserialized response body applying handlers", async (done) => {
        const response: AxiosResponse = {
          headers: {
            "content-type": "application/json",
          },
          config: undefined,
          status: 200,
          statusText: "ok",
          data: { foo: "bar" },
        };
        const handlers = [
          (input) => ({ ...input, foo: input.foo.toUpperCase() }),
        ];
        expect(await handleResponse(response, handlers)).toEqual({
          foo: "BAR",
        });
        done();
      });
    });
  });
  describe("and response content-type is text", () => {
    it("should return deserialized response body", async (done) => {
      const response: AxiosResponse = {
        headers: {
          "content-type": "application/json",
        },
        config: undefined,
        status: 200,
        statusText: "ok",
        data: "dummy",
      };
      expect(await handleResponse(response)).toEqual("dummy");
      done();
    });
  });
});
