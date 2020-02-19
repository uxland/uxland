/* eslint-disable  */
/*
 * MIT License
 *
 * Copyright (c) 2020 ${company}
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
 * THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { isNullOrEmpty } from '@uxland/functional-utilities';
import * as R from 'ramda';
import { SerializerInfo } from './model';
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
  thrower
} from './utilities';
import { invalidPath, invalidSerializers } from './validation';

const buildFirstIndexPath = R.pipe(R.split('.'), (paths: string[]) => [paths[0], 0, ...R.remove(0, 1, paths)]);
const getProp = (from: string | string[], data: any) =>
  R.cond([
    [
      isArray,
      () =>
        R.reduce((collection, fromK: string) => collection.concat(data ? data[fromK] : undefined), [], from as string[])
    ],
    [
      isPath,
      () =>
        R.cond([
          [isObject, () => R.path(R.split('.', from as string), data)],
          [isSingleObject, () => R.path(buildFirstIndexPath(from as string), data)],
          [R.T, () => thrower(invalidPath)]
        ])(R.prop(R.split('.', from as string)[0], data))
    ],
    [R.T, () => R.prop(from as string, data)]
  ])(from);
const setOutput = (from: string, to: string, value: any) =>
  R.set(lensProp(to || from), R.isNil(value) ? undefined : value);
const multipleTo = (data: any, from: string | string[], to: string[], fn: Function) =>
  R.cond([
    [R.equals, () => R.reduce((collection, toK: string) => inToOut(data, toK, toK, fn)(collection), {}, to)],
    [R.T, () => R.reduce((collection, toK: string) => inToOut(data, from, toK, fn)(collection), {}, to)]
  ])(from, to);
const executeFn = (data: any, from: string | string[], fn: Function) =>
  R.ifElse(
    isArray,
    () => fn(...data),
    () =>
      R.ifElse(
        isArray,
        () => R.reduce((collection: any[], d) => collection.concat(fn(d)), [], data),
        () => fn(data)
      )(data)
  )(from);
const assignInputToOutput = (
  data: any,
  from: string | string[],
  to?: string,
  serializerFn?: Function,
  serializers?: any[]
) => (output: any) =>
  R.cond([
    [hasSerializerFn, () => setOutput(from as string, to, executeFn(data, from, serializerFn))(output)],
    [hasSerializers, () => setOutput(from as string, to, serialize(data, serializers))(output)],
    [R.T, () => setOutput(from as string, to, data)(output)]
  ])({
    serializerFn,
    serializers
  });
const inToOut = (data: any, from: string | string[], to?: string | string[], fn?: Function, serializers?: any) => (
  output: any
) =>
  R.cond([
    [
      hasFromTo,
      () =>
        R.cond([
          [isArray, () => multipleTo(data, from, to as string[], fn)],
          [R.T, () => assignInputToOutput(getProp(from, data), from, to as string, fn, serializers)(output)]
          // [R.T, R.always(assignInputToOutput(getProp(from, data), from, to as string, fn, serializers)(output))]
        ])(to)
    ],
    [R.T, () => assignInputToOutput(getProp(from, data), from, undefined, fn, serializers)(output)]
    // [R.T, R.always(assignInputToOutput(getProp(from, data), from, undefined, fn, serializers)(output))]
  ])({
    from,
    to
  });

const serializeArray = <I, O>(i: I[], serializers: SerializerInfo<I, O>[]): O[] =>
  R.reduce<I, O[]>((collection, d) => collection.concat(serialize(d, serializers)), [], i);
const serializeObject = <I, O>(i: I, serializers: SerializerInfo<I, O>[]): O =>
  R.reduce<SerializerInfo<I, O>, O>(
    (o, s) =>
      inToOut(i, getFrom(s) as string | string[], getTo(s), getSerializerFn(s as any), getSerializers(s as any))(o),
    {} as O,
    serializers
  );

/**
 * Serialize data using serializers
 * @param i Input data. Can be an object or an array
 * @param serializers Serializers array. Must contain at least a "from" property.
 */
export function serialize<I, O>(i: I[], serializers?: SerializerInfo<I, O>[]): O[];
export function serialize<I, O>(i: I, serializers?: SerializerInfo<I, O>[]): O;
export function serialize<I, O>(i: I | I[], serializers?: SerializerInfo<I, O>[]): O | O[] {
  return R.cond([
    [isNullOrEmpty, () => i],
    [invalidSerializers, () => i],
    [
      R.T,
      () =>
        R.ifElse(
          isArray,
          () => serializeArray(i as I[], serializers),
          () => serializeObject(i as I, serializers)
        )(i)
    ]
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
