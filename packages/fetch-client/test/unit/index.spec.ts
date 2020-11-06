import Axios from "axios";
import * as FC from "../../src";
jest.mock("Axios");

describe("Given a fetch client", () => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  describe("when setting base url", () => {
    it("should update fetch base url", () => {
      expect(FC.getBaseUrl()).toEqual(undefined);
      FC.setBaseUrl("http://localhost");
      expect(FC.getBaseUrl()).toEqual("http://localhost");
    });
  });
  describe("when configuring client", () => {
    it("should update client configuration", () => {
      expect(FC.getConfiguration()).toEqual({
        headers: {
          "Content-Type": "application/json",
        },
      });
      FC.configure({ auth: { username: "admin", password: "admin" } });
      expect(FC.getConfiguration()).toEqual({
        headers: {
          "Content-Type": "application/json",
        },
        auth: { username: "admin", password: "admin" },
      });
    });
  });
  describe("when setting headers", () => {
    it("should update headers in configuration", () => {
      expect(FC.getHeaders()).toEqual(defaultHeaders);
      FC.setHeaders({ authorization: "Basic <token>" });
      expect(FC.getHeaders()).toEqual({
        "Content-Type": "application/json",
        authorization: "Basic <token>",
      });
    });
  });
  describe("when resetting headers", () => {
    it("should set headers as default", () => {
      expect(FC.getHeaders()).toEqual({
        "Content-Type": "application/json",
        authorization: "Basic <token>",
      });
      FC.resetHeaders();
      expect(FC.getHeaders()).toEqual(defaultHeaders);
    });
  });
  describe("and deleting a header", () => {
    it("should update headers in configuration", () => {
      expect(FC.getHeaders()).toEqual(defaultHeaders);
      FC.removeHeader("Content-Type");
      expect(FC.getHeaders()).toEqual({});
    });
  });
  describe("and registering a handler", () => {
    it("should update handlers collection", () => {
      const dummyHandler = jest.fn().mockImplementation((a) => a);
      expect(FC.getResponseHandlers()).toEqual([]);
      FC.registerResponseHandler(dummyHandler);
      expect(FC.getResponseHandlers()).toEqual([dummyHandler]);
      dummyHandler.mockClear();
    });
  });
  describe("when calling doFetch", () => {
    // beforeEach(() => {
    //   (Axios as any).mockClear();
    // });
    describe("and a handler has been registered", () => {
      it("should call handler", async () => {
        const dummyHandler = jest.fn();
        FC.registerResponseHandler(dummyHandler);
        (Axios.get as any).mockResolvedValue({
          data: { foo: "bar" },
          status: 200,
        });
        await FC.doFetch("/dummy");
        expect(dummyHandler).toHaveBeenCalled();
      });
    });
    // describe("and not specifying method", () => {
    //   it("should call GET and return data", async (done) => {
    //     (Axios.get as any) = jest.fn(() =>
    //       Promise.resolve({
    //         status: 200,
    //         statusText: "ok",
    //         data: { foo: "bar" },
    //       })
    //     );
    //     try {
    //       const result = await FC.doFetch("/dummy");
    //       expect(result).toEqual({ foo: "bar" });
    //     } catch (error) {
    //     } finally {
    //       done();
    //     }
    //   });
    // });
    // describe("and specifying POST method", () => {
    //   it("should return data", async (done) => {
    //     (Axios.post as any) = jest.fn(() =>
    //       Promise.resolve({
    //         status: 200,
    //         statusText: "ok",
    //         data: { foo: "bar" },
    //       })
    //     );
    //     try {
    //       const result = await FC.doFetch("/dummy", { method: "POST" });
    //       expect(result).toEqual({ foo: "bar" });
    //     } catch (error) {
    //     } finally {
    //       done();
    //     }
    //   });
    // });
    // describe("and specifying custom method", () => {
    //   it("should throw error", async (done) => {
    //     FC.doFetch("/dummy", { method: "CUSTOM" })
    //       .catch((e) => expect(e).toEqual(FC.METHOD_NOT_IMPLEMENTED))
    //       .finally(done);
    //   });
    // });
  });
});
