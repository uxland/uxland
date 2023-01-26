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

import { CreateSliceOptions, Slice, createSlice } from "@reduxjs/toolkit";
import { AsyncCaseReducers, AsyncState, AsyncStateStatus } from "./domain";
import { resetAction } from "./reset-action";

/**
 * Creates an async state
 * @function
 * @name createAsyncState
 * @memberof ReactServices
 * @param {*=} payload - Slice name
 * @since v1.0.0
 * @returns {AsyncState}
 * @example
 *
 * createAsyncState({foo: 'bar'});
 */
export const createAsyncState = (payload?: any) => ({
  status: AsyncStateStatus.idle,
  data: payload,
  error: null,
});

/**
 * Creates a slice that can be used to control asynchronous cases in state
 * @function
 * @name createAsyncSlice
 * @memberof ReactServices
 * @param {string} name - Slice name
 * @param {*} initialState - Reducer initial state
 * @param {boolean} [resetable=true] - Indicates if slice is resetable
 * @since v1.0.0
 * @returns {Slice}
 * @example
 *
 * createAsyncSlice('sliceName', {status: AsyncStateStatus.idle, data: {foo: 'bar'}, error: null});
 */
export const createAsyncSlice = <State, T>(
  name: string,
  initialState: T,
  resetable: boolean = true
) => {
  let sliceConfig: CreateSliceOptions = {
    name,
    initialState,
    reducers: {
      setStatus: (state, action) => ({ ...state, status: action.payload }),
      setError: (state, action) => ({ ...state, error: action.payload }),
      setData: (state, action) => ({
        ...state,
        data: action.payload,
      }),
    },
  };
  if (resetable)
    sliceConfig = {
      ...sliceConfig,
      extraReducers: (builder) =>
        builder.addCase(resetAction, () => initialState),
    };
  //@ts-ignore
  return createSlice<State, AsyncCaseReducers<State>>(sliceConfig);
};