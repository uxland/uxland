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
import forEachObjIndexed from "ramda/es/forEachObjIndexed";
import ifElse from "ramda/es/ifElse";
import path from "ramda/es/path";
import pipe from "ramda/es/pipe";
import prop from "ramda/es/prop";
import reduce from "ramda/es/reduce";
import remove from "ramda/es/remove";
import set from "ramda/es/set";
import split from "ramda/es/split";
import { SerializerInfo } from "../model";
import {
  getDeserializerFn,
  getFrom,
  getSerializers,
  getTo,
  hasDeserializerFn,
  hasFromTo,
  hasSerializers,
  isArray,
  isObject,
  isPath,
  isSingleObject,
  lensProp,
  setProperty,
  thrower,
} from "./_utilities";
import { invalidPath, validSerializers } from "./_validation";

const buildFirstIndexPath = pipe(split("."), (paths: string[]) => [
  paths[0],
  0,
  ...remove(0, 1, paths),
]);
const getProp = (from: string | string[], data: any): any =>
  cond([
    [
      isArray,
      (): any[] =>
        reduce(
          (collection, fromK: string) =>
            collection.concat(data ? data[fromK] : undefined),
          [],
          from as string[]
        ),
    ],
    [
      isPath,
      (): any =>
        cond([
          [isObject, (): any => path(split(".", from as string), data)],
          [
            isSingleObject,
            (): any => path(buildFirstIndexPath(from as string), data),
          ],
          [T, (): never => thrower(invalidPath)],
        ])(prop(split(".", from as string)[0], data)),
    ],
    [T, (): any => prop(from as string, data)],
  ])(from);
const setOutputMultipleTo = (
  to: string[],
  values: any[],
  output
): Record<string, unknown> => {
  forEachObjIndexed((toK: string, i) => {
    output = set(lensProp(toK), values[i])(output);
    return output;
  }, to as string[]);
  return output;
};
const setOutput =
  (from: string, to: string | string[], value: any) =>
  (output: any): any =>
    ifElse(
      isArray,
      () =>
        ifElse(
          isArray,
          () => setOutputMultipleTo(to as string[], value, output),
          () => setProperty(from, to as string, value)(output)
        )(value),
      () => setProperty(from, to as string, value)(output)
    )(to);
const executeFn = (
  data: any,
  from: string | string[],
  fn: (data: any | any[]) => any
): any =>
  ifElse(
    isArray,
    //@ts-ignore
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
    deserializerFn?: () => any,
    serializers?: any[]
  ) =>
  (output: any): any =>
    cond([
      [
        hasDeserializerFn,
        (): any =>
          setOutput(
            from as string,
            to,
            executeFn(data, from, deserializerFn)
          )(output),
      ],
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      [
        hasSerializers,
        (): any =>
          setOutput(from as string, to, deserialize(data, serializers))(output),
      ],
      [T, (): any => setOutput(from as string, to, data)(output)],
    ])({
      deserializerFn,
      serializers,
    });
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
  (output: any): any =>
    cond([
      [
        hasFromTo,
        cond([
          [
            bothArray,
            (): Record<string, unknown> =>
              reduce(
                (collection, fromK) =>
                  assignInputToOutput(
                    getProp(fromK, data),
                    fromK,
                    (to as string[]).find((toK) => toK == fromK),
                    fn,
                    serializers
                  )(collection),
                {},
                from as string[]
              ),
          ],
          [
            fromIsArray,
            (): any =>
              assignInputToOutput(
                getProp(from[0], data),
                from[0],
                to as string,
                fn,
                serializers
              )(output),
          ],
          [
            T,
            (): any =>
              assignInputToOutput(
                getProp(from, data),
                from,
                to as string,
                fn,
                serializers
              )(output),
          ],
        ]),
      ],
      [
        T,
        (): any =>
          assignInputToOutput(
            getProp(from, data),
            from,
            undefined,
            fn,
            serializers
          )(output),
      ],
    ])({
      from,
      to,
    });

const serializeArray = <I, O>(
  i: I[],
  serializers: SerializerInfo<I, O>[]
): O[] =>
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  reduce<I, O[]>(
    (collection, d) => collection.concat(deserialize(d, serializers)),
    [],
    i
  );
const serializeObject = <I, O>(i: I, serializers: SerializerInfo<I, O>[]): O =>
  reduce<SerializerInfo<I, O>, O>(
    (o, s) =>
      inToOut(
        i,
        getTo(s) || getFrom(s),
        getFrom(s),
        getDeserializerFn(s),
        getSerializers(s as any)
      )(o),
    {} as O,
    serializers
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
  if (validSerializers(serializers))
    return cond([
      [isNullOrEmpty, (): I | I[] => i],
      [
        T,
        (): any[] | Record<string, unknown> =>
          ifElse(
            isArray,
            () => serializeArray(i as I[], serializers),
            () => serializeObject(i as I, serializers)
          )(i),
      ],
    ])(serializers);
  return i as any;
}
