/* eslint-disable  */
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
import { isNullOrEmpty } from "@uxland/ramda-extensions/is-null-or-empty";
import T from "ramda/es/T";
import cond from "ramda/es/cond";
import equals from "ramda/es/equals";
import ifElse from "ramda/es/ifElse";
import isNil from "ramda/es/isNil";
import path from "ramda/es/path";
import pipe from "ramda/es/pipe";
import prop from "ramda/es/prop";
import reduce from "ramda/es/reduce";
import remove from "ramda/es/remove";
import set from "ramda/es/set";
import split from "ramda/es/split";
import { SerializerInfo } from "../model";
import {
  getFrom,
  getSerializerFn,
  getSerializers,
  getTo,
  hasFromTo,
  hasSerializerFn,
  hasSerializers,
  isArray,
  isObject,
  isPath,
  isSingleObject,
  lensProp,
  thrower,
} from "./_utilities";
import { invalidPath, invalidSerializers } from "./_validation";

const buildFirstIndexPath = pipe(split("."), (paths: string[]) => [
  paths[0],
  0,
  ...remove(0, 1, paths),
]);
const getProp = (from: string | string[], data: any) =>
  cond([
    [
      isArray,
      () =>
        reduce(
          (collection, fromK: string) =>
            collection.concat(data ? data[fromK] : undefined),
          [],
          from as string[]
        ),
    ],
    [
      isPath,
      () =>
        cond([
          [isObject, () => path(split(".", from as string), data)],
          [
            isSingleObject,
            () => path(buildFirstIndexPath(from as string), data),
          ],
          [T, () => thrower(invalidPath)],
        ])(prop(split(".", from as string)[0], data)),
    ],
    [T, () => prop(from as string, data)],
  ])(from);
const setOutput = (from: string, to: string, value: any) =>
  set(lensProp(to || from), isNil(value) ? undefined : value);
const multipleTo = (
  data: any,
  from: string | string[],
  to: string[],
  fn: Function
) =>
  cond([
    [
      equals,
      () =>
        reduce(
          (collection, toK: string) => inToOut(data, toK, toK, fn)(collection),
          {},
          to
        ),
    ],
    [
      T,
      () =>
        reduce(
          (collection, toK: string) => inToOut(data, from, toK, fn)(collection),
          {},
          to
        ),
    ],
  ])(from, to);
const executeFn = (data: any, from: string | string[], fn: Function) =>
  ifElse(
    isArray,
    () => fn(...data),
    () =>
      ifElse(
        isArray,
        () =>
          reduce((collection: any[], d) => collection.concat(fn(d)), [], data),
        () => fn(data)
      )(data)
  )(from);
const assignInputToOutput =
  (
    data: any,
    from: string | string[],
    to?: string,
    serializerFn?: Function,
    serializers?: any[]
  ) =>
  (output: any) =>
    cond([
      [
        hasSerializerFn,
        () =>
          setOutput(
            from as string,
            to,
            executeFn(data, from, serializerFn)
          )(output),
      ],
      [
        hasSerializers,
        () =>
          setOutput(from as string, to, serialize(data, serializers))(output),
      ],
      [T, () => setOutput(from as string, to, data)(output)],
    ])({
      serializerFn,
      serializers,
    });
const inToOut =
  (
    data: any,
    from: string | string[],
    to?: string | string[],
    fn?: Function,
    serializers?: any
  ) =>
  (output: any) =>
    cond([
      [
        hasFromTo,
        () =>
          cond([
            [isArray, () => multipleTo(data, from, to as string[], fn)],
            [
              T,
              () =>
                assignInputToOutput(
                  getProp(from, data),
                  from,
                  to as string,
                  fn,
                  serializers
                )(output),
            ],
            // [T, always(assignInputToOutput(getProp(from, data), from, to as string, fn, serializers)(output))]
          ])(to),
      ],
      [
        T,
        () =>
          assignInputToOutput(
            getProp(from, data),
            from,
            undefined,
            fn,
            serializers
          )(output),
      ],
      // [T, always(assignInputToOutput(getProp(from, data), from, undefined, fn, serializers)(output))]
    ])({
      from,
      to,
    });

const serializeArray = <I, O>(
  i: I[],
  serializers: SerializerInfo<I, O>[]
): O[] =>
  reduce<I, O[]>(
    (collection, d) => collection.concat(serialize(d, serializers)),
    [],
    i
  );
const serializeObject = <I, O>(i: I, serializers: SerializerInfo<I, O>[]): O =>
  reduce<SerializerInfo<I, O>, O>(
    (o, s) =>
      inToOut(
        i,
        getFrom(s) as string | string[],
        getTo(s),
        getSerializerFn(s as any),
        getSerializers(s as any)
      )(o),
    {} as O,
    serializers
  );

/**
 * Serialize data using serializers
 * @param i Input data. Can be an object or an array
 * @param serializers Serializers array. Must contain at least a "from" property.
 */
export function serialize<I, O>(
  i: I[],
  serializers?: SerializerInfo<I, O>[]
): O[];
export function serialize<I, O>(i: I, serializers?: SerializerInfo<I, O>[]): O;
export function serialize<I, O>(
  i: I | I[],
  serializers?: SerializerInfo<I, O>[]
): O | O[] {
  return cond([
    [isNullOrEmpty, () => i],
    [invalidSerializers, () => i],
    [
      T,
      () =>
        ifElse(
          isArray,
          () => serializeArray(i as I[], serializers),
          () => serializeObject(i as I, serializers)
        )(i),
    ],
  ])(serializers);
}

/**
 * TODO: Prepare console warnings for inconsistencies between serialization and deserialization.
 * i.e.: When using sub-serializers with non-object structure:
 * const input = {foo: 'bar'};
 * const serializers = [{from: 'foo', serializers: [{from: 'bar'}]}];
 * const output = serialize(input, serializers); // {foo: {bar: undefined}};
 * This is not possible to deserialize
 */
