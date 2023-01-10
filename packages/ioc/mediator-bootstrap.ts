/*eslint no-useless-escape: "warn"*/

/*
 * @license
 * BSD License
 *
 * Copyright (c) 2020, UXLand
 *
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * 3. All advertising materials mentioning features or use of this software must display the following acknowledgement: This product includes software developed by the <copyright holder>.
 * 4. Neither the name of the <copyright holder> nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ''AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// This is needed in order to use ioc on mediator handlers to inject our own injectables, otherwise injection cannot be used.
// https://github.com/m4ss1m0g/mediatr-ts#inversify-resolver
import { Container } from "inversify";
import { IResolver, mediatorSettings } from "mediatr-ts";

class InversifyResolver implements IResolver {
  constructor(protected container: Container) {}

  add(name: string, instance: Function): void {
    this.container.bind(name).to(instance as any);
  }

  clear(): void {
    throw new Error("Method not implemented");
  }

  remove(name: string): void {
    this.container.unbind(name);
  }

  resolve<T>(name: string): T {
    return this.container.get<T>(name);
  }
}

/**
 * Sets custom mediator resolver linked with custom container
 * @function
 * @name setMediatorResolver
 * @memberof ioc
 * @since v1.0.0
 * @returns {void}
 * @example
 *
 * setMediatorResolver(new Container());
 */
export const setMediatorResolver = (container: Container) => {
  mediatorSettings.resolver = new InversifyResolver(container);
};
