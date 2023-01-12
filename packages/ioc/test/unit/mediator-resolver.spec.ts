import { Container } from "inversify";
import { setMediatorResolver } from "../../mediator-resolver";
describe("Given a container", () => {
  describe("When setting new resolver for mediator", () => {
    it("should attach instance to mediator", (done) => {
      const container = new Container();
      setMediatorResolver(container).then(() => {
        done();
      });
    });
  });
});
