import * as FC from "../../src";
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
        credentials: "include",
        mode: "cors",
      });
      FC.configure({ mode: "no-cors" });
      expect(FC.getConfiguration()).toEqual({
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "no-cors",
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
  describe("when using fetch", () => {
    beforeEach(() => (fetch as any).mockClear());
    // describe('and fetch fails', () => {
    //   (global as any).fetch = jest.fn(() =>
    //     Promise.resolve({
    //       ok: false,
    //       status: 401,
    //       statusText: 'Credentials invalid',
    //       json: () => Promise.reject(),
    //     })
    //   );
    //   it('it should throw an exception with received status and statusText', async (done) => {
    //     try {
    //       await FC.doFetch('dummy');
    //     } catch (error) {
    //       expect(error).toEqual({
    //         ...new Error(),
    //         status: 401,
    //         statusText: 'Credentials invalid',
    //       });
    //     } finally {
    //       done();
    //     }
    //   });
    // });
    describe("and fetch is successfull", () => {
      (global as any).fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ foo: "bar" }),
        })
      );
      it("should return data", async (done) => {
        try {
          const data = await FC.doFetch("dummy");
          expect(data).toEqual({ foo: "bar" });
        } finally {
          done();
        }
      });
    });
  });
});
