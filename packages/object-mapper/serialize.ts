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

import { SerializerInfo } from "./model";
import {
  buildFirstIndexPath,
  getFrom,
  getPathValue,
  getSerializerFn,
  getSerializers,
  getTo,
  isArray,
  isObject,
  isPath,
  isSingleObject,
  setProperty,
  thrower,
} from "./utilities";
import { invalidPath, validSerializers } from "./validation";

const getPropForArray = (from: string[], data: any): any =>
  from.map((fromK: string) => (data ? data[fromK] : undefined));
const getPropForPath = (from: string, data: any): any => {
  const path = from.split(".") || [];
  const item = data ? data[path[0]] : undefined;
  return isObject(item)
    ? getPathValue(path, data)
    : isSingleObject(item)
    ? getPathValue(buildFirstIndexPath(from as string), data)
    : thrower(invalidPath);
};
const getProp = (from: string | string[], data: any): any =>
  isArray(from)
    ? getPropForArray(from as string[], data)
    : isPath(from as string[])
    ? getPropForPath(from as string, data)
    : data[from as string];
const multipleTo = (
  data: any,
  from: string | string[],
  to: string[],
  fn: () => any
): Record<string, unknown> =>
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  to.reduce(
    (collection, toK: string) =>
      inToOut(
        data,
        JSON.stringify(from) === JSON.stringify(to) ? toK : from,
        toK,
        fn
      )(collection),
    {}
  );
const executeFn = (
  data: any,
  from: string | string[],
  fn: (payload: any) => any
): any =>
  isArray(from)
    ? //@ts-ignore
      fn(...data)
    : isArray(data)
    ? data.map((d) => fn(d))
    : fn(data);
const assignInputToOutput =
  (
    data: any,
    from: string | string[],
    to?: string,
    serializerFn?: () => any,
    serializers?: any[]
  ) =>
  (output: any): any => {
    if (!serializerFn && !serializers)
      return setProperty(from as string, to, data)(output);
    else if (serializerFn)
      return setProperty(
        from as string,
        to,
        executeFn(data, from, serializerFn)
      )(output);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    else
      return setProperty(
        from as string,
        to,
        serialize(data, serializers)
      )(output);
  };
const inToOut =
  (
    data: any,
    from: string | string[],
    to?: string | string[],
    fn?: () => any,
    serializers?: any
  ) =>
  (output: any): any =>
    isArray(to)
      ? multipleTo(data, from, to as string[], fn)
      : assignInputToOutput(
          getProp(from, data),
          from,
          to as string,
          fn,
          serializers
        )(output);

const serializeArray = <I, O>(
  i: I[],
  serializers: SerializerInfo<I, O>[]
): O[] =>
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  i.map((d) => serialize<I, O>(d, serializers));
const serializeObject = <I, O>(i: I, serializers: SerializerInfo<I, O>[]): O =>
  serializers.reduce(
    (o, s) =>
      inToOut(
        i,
        getFrom(s) as string | string[],
        getTo(s),
        getSerializerFn(s as any),
        getSerializers(s as any)
      )(o),
    {} as O
  );

export function serialize<I, O>(
  i: I[],
  serializers?: SerializerInfo<I, O>[]
): O[];
export function serialize<I, O>(i: I, serializers?: SerializerInfo<I, O>[]): O;
/**
 * Serialize data using serializers
 * @memberof ObjectMapper
 * @function
 * @name serialize
 * @param {(*|Array.<*>)} i Input data or array data to be serialized
 * @param {ObjectMapper.SerializerInfo=} serializers Serializers array. Must contain at least a "from" property.
 */
export function serialize<I, O>(
  i: I | I[],
  serializers?: SerializerInfo<I, O>[]
): O | O[] {
  if (validSerializers(serializers))
    return isArray(i)
      ? serializeArray(i as I[], serializers)
      : serializeObject(i as I, serializers);
  return i as any;
}

/**
 //TODO: Prepare console warnings for inconsistencies between serialization and deserialization.
 * i.e.: When using sub-serializers with non-object structure:
 * const input = {foo: 'bar'};
 * const serializers = [{from: 'foo', serializers: [{from: 'bar'}]}];
 * const output = serialize(input, serializers); // {foo: {bar: undefined}};
 * This is not possible to deserialize
 */
