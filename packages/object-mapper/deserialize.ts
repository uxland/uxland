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
  getDeserializerFn,
  getFrom,
  getPathValue,
  getSerializers,
  getTo,
  hasDeserializerFn,
  hasFromTo,
  hasSerializers,
  isArray,
  isNullOrEmpty,
  isObject,
  isPath,
  isSingleObject,
  setProperty,
  thrower,
} from "./utilities";
import { invalidPath, validSerializers } from "./validation";

const getProp = (from: string | string[], data: any): any => {
  if (isArray(from))
    return (from as string[]).reduce((collection, fromK: string) => {
      collection.push(data ? data[fromK] : undefined);
      return collection;
    }, []);
  else if (isPath(from)) {
    const value = data && data[(from as string).split(".")[0]];
    if (isObject(value)) return getPathValue((from as string).split("."), data);
    else if (isSingleObject(value))
      return getPathValue(buildFirstIndexPath(from as string), data);
    return thrower(invalidPath);
  } else return data && data[from as string];
};

const setOutputMultipleTo = (
  to: string[],
  values: any[],
  output
): Record<string, unknown> => {
  Object.values(to).forEach((toK: string, i) => {
    output[toK] = values[i];
    return output;
  }, to as string[]);
  return output;
};
const setOutput =
  (from: string, to: string | string[], value: any) =>
  (output: any): any => {
    if (isArray(to)) {
      if (isArray(value))
        return setOutputMultipleTo(to as string[], value, output);
      else return setProperty(from, to as string, value)(output);
    } else return setProperty(from, to as string, value)(output);
  };
const executeFn = (
  data: any,
  from: string | string[],
  fn: (data: any | any[]) => any
): any => {
  if (isArray(from)) return fn(data);
  else {
    if (isArray(data))
      return data.reduce((collection: any[], d) => {
        collection.push(fn(d));
        return collection;
      }, []);
    else return fn(data);
  }
};
const assignInputToOutput =
  (
    data: any,
    from: string | string[],
    to?: string,
    deserializerFn?: () => any,
    serializers?: any[]
  ) =>
  (output: any): any => {
    if (hasDeserializerFn({ deserializerFn, serializers }))
      return setOutput(
        from as string,
        to,
        executeFn(data, from, deserializerFn)
      )(output);
    else if (hasSerializers({ deserializerFn, serializers }))
      return setOutput(
        from as string,
        to,
        deserialize(data, serializers)
      )(output);
    else return setOutput(from as string, to, data)(output);
  };
const bothArray = (s: {
  from: string | string[];
  to: string | string[];
}): boolean => isArray(s.from) && isArray(s.to);
const fromIsArray = (s: {
  from: string | string[];
  to: string | string[];
}): boolean => isArray(s.from);
const inToOut =
  (
    data: any,
    from: string | string[],
    to?: string | string[],
    fn?: () => any,
    serializers?: any
  ) =>
  (output: any): any => {
    if (hasFromTo({ from, to }))
      if (bothArray({ from, to }))
        return (from as string[]).reduce(
          (collection, fromK) =>
            assignInputToOutput(
              getProp(fromK, data),
              fromK,
              (to as string[]).find((toK) => toK == fromK),
              fn,
              serializers
            )(collection),
          {}
        );
      else if (fromIsArray({ from, to }))
        return assignInputToOutput(
          getProp(from[0], data),
          from[0],
          to as string,
          fn,
          serializers
        )(output);
      else
        return assignInputToOutput(
          getProp(from, data),
          from,
          to as string,
          fn,
          serializers
        )(output);
    else
      return assignInputToOutput(
        getProp(from, data),
        from,
        undefined,
        fn,
        serializers
      )(output);
  };

const serializeArray = <I, O>(
  i: I[],
  serializers: SerializerInfo<I, O>[]
): O[] =>
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  i.reduce((collection, d) => {
    collection.push(deserialize(d, serializers));
    return collection;
  }, []);
const serializeObject = <I, O>(i: I, serializers: SerializerInfo<I, O>[]): O =>
  serializers.reduce(
    (o, s) =>
      inToOut(
        i,
        getTo(s) || getFrom(s),
        getFrom(s),
        getDeserializerFn(s),
        getSerializers(s as any)
      )(o),
    {} as O
  );

export function deserialize<I, O>(
  i: I[],
  serializers?: SerializerInfo<I, O>[]
): O[];
export function deserialize<I, O>(
  i: I,
  serializers?: SerializerInfo<I, O>[]
): O;
/**
 * Deserialize data using serializers. This should be used only on objects serialized with the same serializers array,
 * and the object should not have change its structure.
 * @memberof ObjectMapper
 * @function
 * @name deserialize
 * @param {(*|Array.<*>)} i Input data or array data to be deserialized
 * @param {ObjectMapper.SerializerInfo=} serializers Serializers array. Must contain at least a "from" property.
 */
export function deserialize<I, O>(
  i: I | I[],
  serializers?: SerializerInfo<I, O>[]
): O | O[] {
  if (validSerializers(serializers) && !isNullOrEmpty(serializers))
    return isArray(i)
      ? serializeArray(i as I[], serializers)
      : serializeObject(i as I, serializers);
  else return i as any;
}
