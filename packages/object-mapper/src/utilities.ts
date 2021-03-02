/*
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
import {isNotNullNeitherEmpty} from '@uxland/ramda-extensions';
import * as R from 'ramda';
import {SerializerInfo} from './model';

export const isTrue = R.equals(true);
export const isFalse = R.equals(false);
export const isArray = R.is(Array);
export const isObject = R.allPass([R.complement(isArray), R.is(Object)]);

export const thrower = (message: string): never => {
  throw new Error(message);
};
export const getFrom = (serializer?: any): string | string[] => serializer?.from;
export const getTo = (serializer?: any): string | string[] => serializer?.to;
export const getSerializerFn = (serializer?: any): (() => any) => serializer?.serializerFn;
export const getDeserializerFn = (serializer?: any): (() => any) => serializer?.deserializerFn;
export const getSerializers = (serializer?: any): SerializerInfo<any, any>[] =>
  serializer?.serializers;
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
        else obj = {[prop]: obj};
      }
      return obj;
    },
    () => {
      obj[path] = parsedValue;
      return obj;
    }
  )(path);
};
