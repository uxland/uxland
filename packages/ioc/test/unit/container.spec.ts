import { injectable } from "inversify";
import { iocContainer, provideSingleton } from "../../container";

@injectable()
@provideSingleton()
//@ts-ignore
class Adapter {}

describe("Given a container", () => {
  describe("and when using provideSingleton", () => {
    it("must create a reference of the class for provided constructor", () => {
      const reference = iocContainer.get(Adapter);
      expect(reference).toBeInstanceOf(Adapter);
    });
  });
});
