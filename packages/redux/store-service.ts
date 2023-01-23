/*
 * @license
 * BSD License
 *
 * Copyright (c) 2023, UXLand
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

import {
  EnhancedStore,
  Reducer,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { resetAction } from "./reset-action";

/**
 * Creates a Redux Store service
 * @class
 * @name StoreService
 * @memberof ReactServices
 * @param {{[key: string]: Reducer}} reducers - Initial store reducers
 * @param {string} name - Store name
 * @param {boolean} devTools - Devtools middleware activation
 * @since v1.0.0
 * @returns {Slice}
 * @example
 *
 * createAsyncSlice('sliceName', {foo: 'bar'});
 */
export class StoreService {
  private store: EnhancedStore<any, any, any>;

  constructor(
    private reducers: { [key: string]: Reducer },
    name: string,
    devTools: boolean
  ) {
    // const appReducer = combineReducers(reducers);
    // const rootReducer = (
    //   state: ReturnType<typeof rootReducer>,
    //   action: AnyAction
    // ) => {
    //   console.log(action.type);
    //   if (action.type === this.RESET_ACTION) {
    //     return appReducer(undefined, action);
    //   }
    //   return appReducer(state, action);
    // };

    this.store = configureStore({
      // reducer: rootReducer,
      reducer: reducers,
      devTools: devTools ? { name } : false,
    });
  }

  getStore() {
    return this.store;
  }

  resetStore() {
    this.store?.dispatch(resetAction());
  }

  getState() {
    return this.store?.getState();
  }

  injectReducer(key: string, reducer: Reducer) {
    this.reducers[key] = reducer;
    const rootReducer = combineReducers(this.reducers);
    this.store?.replaceReducer(rootReducer as any);
  }

  dispatch<T = any>(action: T) {
    console.log("dispatching");
    return this.store?.dispatch(action);
  }
}
