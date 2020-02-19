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
import { isNotNullNeitherEmpty } from '@uxland/functional-utilities';
import * as R from 'ramda';
import { SerializerInfo } from './model';

export const isTrue = R.equals(true);
export const isFalse = R.equals(false);
export const isArray = R.is(Array);
export const isObject = R.allPass([R.complement(isArray), R.is(Object)]);

export const thrower = (message: string): never => {
  throw new Error(message);
};
export const getFrom = (serializer?: any): string | string[] => serializer?.from;
export const getTo = (serializer?: any): string | string[] => serializer?.to;
export const getSerializerFn = (serializer?: any): Function => serializer?.serializerFn;
export const getDeserializerFn = (serializer?: any): Function => serializer?.deserializerFn;
export const getSerializers = (serializer?: any): SerializerInfo<any, any>[] => serializer?.serializers;
export const hasFrom = R.pipe(getFrom, isNotNullNeitherEmpty);
export const hasTo = R.pipe(getTo, isNotNullNeitherEmpty);
export const hasSerializerFn = R.pipe(getSerializerFn, isNotNullNeitherEmpty);
export const hasDeserializerFn = R.pipe(getDeserializerFn, isNotNullNeitherEmpty);
export const hasSerializers = R.pipe(getSerializers, isNotNullNeitherEmpty);
export const noSerializers = R.complement(hasSerializers);
export const hasFromTo = R.allPass([hasFrom, hasTo]);
export const hasDeserializeProp = R.has('deserializeProp');
export const hasBoth = R.allPass([hasDeserializeProp, hasSerializerFn]);
export const hasInvalidStructure = R.allPass([hasSerializerFn, hasSerializers]);
export const multipleSerializeProp = R.pipe(R.prop('serializeProp'), isArray);
export const isPath = R.pipe(R.indexOf('.'), R.complement(R.equals(-1)));
export const isSingleObject = R.allPass([isArray, R.pipe(R.length, R.equals(1))]);
export const lensProp = (prop: string): any =>
  R.ifElse(
    isPath,
    () => R.lensPath(R.split('.')(prop)),
    () => R.lensProp(prop)
  )(prop);

export const getPath = (prop: string): string =>
  R.ifElse(
    isPath,
    () => R.split('.')(prop),
    () => prop
  )(prop);

export const setProperty = (from: string, to: string, value: any) => (obj: any = {}): any => {
  const path = getPath(to || from);
  const parsedValue = R.isNil(value) ? undefined : value;
  return R.ifElse(
    isArray,
    () => {
      for (let i = path.length - 1; i >= 0; i--) {
        const prop = path[i];
        if (i == path.length - 1) obj[prop] = parsedValue;
        else obj = { [prop]: obj };
      }
      return obj;
    },
    () => {
      obj[path] = parsedValue;
      return obj;
    }
  )(path);
};
