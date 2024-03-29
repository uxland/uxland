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
import identity from 'ramda/es/identity';
import ifElse from 'ramda/es/ifElse';
import is from 'ramda/es/is';
import {Lens} from 'ramda/tools';
import 'reflect-metadata';
import {Action} from './create-action';

let STUB = 1;
/**
 * Async action factory
 * @interface PathResolver
 * @memberof Redux
 * @since v1.0.0
 * @property {action => Lens} resolver Resolver function that returns path lens
 */
export interface PathResolver {
  resolver: (action: Action) => Lens;
}
STUB = 1;

export type Resolver = (action: Action) => Lens;
export const factory = (resolver: Resolver): PathResolver => ({resolver} as PathResolver);

/**
 * Resolves state path
 * @function
 * @memberof Redux
 * @name resolvePath
 * @since v1.0.0
 * @param {Redux.PathResolver} path - Path resolver function
 * @param {Action} action - Redux action
 * @returns {Lens}
 */
export const resolvePath: (path: Lens | PathResolver, action?: Action) => Lens = (path, action) =>
  ifElse(is(Function), identity, (pr: PathResolver) => pr.resolver(action))(path);
