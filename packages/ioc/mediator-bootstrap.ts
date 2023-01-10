// This is needed in order to use ioc on mediator handlers to inject our own injectables, otherwise injection cannot be used.
// https://github.com/m4ss1m0g/mediatr-ts#inversify-resolver
import { IResolver, mediatorSettings } from "mediatr-ts";
import { iocContainer } from "./container";

class InversifyResolver implements IResolver {
  add(name: string, instance: Function): void {
    iocContainer.bind(name).to(instance as any);
  }

  clear(): void {
    throw new Error("Method not implemented");
  }

  remove(name: string): void {
    iocContainer.unbind(name);
  }

  resolve<T>(name: string): T {
    return iocContainer.get<T>(name);
  }
}

export const setMediatorResolver = () => {
  mediatorSettings.resolver = new InversifyResolver();
};
