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
import { isNotNullNeitherEmpty } from "@uxland/ramda-extensions/is-not-nil-neither-empty";
import allPass from "ramda/es/allPass";
import complement from "ramda/es/complement";
import equals from "ramda/es/equals";
import has from "ramda/es/has";
import ifElse from "ramda/es/ifElse";
import indexOf from "ramda/es/indexOf";
import is from "ramda/es/is";
import isNil from "ramda/es/isNil";
import length from "ramda/es/length";
import lensPath from "ramda/es/lensPath";
import RlensProp from "ramda/es/lensProp";
import pipe from "ramda/es/pipe";
import prop from "ramda/es/prop";
import split from "ramda/es/split";
import { SerializerInfo } from "../model";

export const isTrue = equals(true);
export const isFalse = equals(false);
export const isArray = is(Array);
export const isObject = allPass([complement(isArray), is(Object)]);

export const thrower = (message: string): never => {
  throw new Error(message);
};
export const getFrom = (serializer?: any): string | string[] =>
  serializer?.from;
export const getTo = (serializer?: any): string | string[] => serializer?.to;
export const getSerializerFn = (serializer?: any): (() => any) =>
  serializer?.serializerFn;
export const getDeserializerFn = (serializer?: any): (() => any) =>
  serializer?.deserializerFn;
export const getSerializers = (serializer?: any): SerializerInfo<any, any>[] =>
  serializer?.serializers;
export const hasFrom = pipe(getFrom, isNotNullNeitherEmpty);
export const hasTo = pipe(getTo, isNotNullNeitherEmpty);
export const hasSerializerFn = pipe(getSerializerFn, isNotNullNeitherEmpty);
export const hasDeserializerFn = pipe(getDeserializerFn, isNotNullNeitherEmpty);
export const hasSerializers = pipe(getSerializers, isNotNullNeitherEmpty);
export const noSerializers = complement(hasSerializers);
export const hasFromTo = allPass([hasFrom, hasTo]);
export const hasDeserializeProp = has("deserializeProp");
export const hasBoth = allPass([hasDeserializeProp, hasSerializerFn]);
export const hasInvalidStructure = allPass([hasSerializerFn, hasSerializers]);
export const multipleSerializeProp = pipe(prop("serializeProp"), isArray);
export const isPath = pipe(indexOf("."), complement(equals(-1)));
export const isSingleObject = allPass([isArray, pipe(length, equals(1))]);
export const lensProp = (prop: string): any =>
  ifElse(
    isPath,
    () => lensPath(split(".")(prop)),
    () => RlensProp(prop)
  )(prop);

export const getPath = (prop: string): string =>
  ifElse(
    isPath,
    () => split(".")(prop),
    () => prop
  )(prop);

export const setProperty =
  (from: string, to: string, value: any) =>
  (obj: any = {}): any => {
    const path = getPath(to || from);
    const parsedValue = isNil(value) ? undefined : value;
    return ifElse(
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
