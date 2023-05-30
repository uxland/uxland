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

function _isString(x) {
  return Object.prototype.toString.call(x) === "[object String]";
}
function _isObject(x) {
  return Object.prototype.toString.call(x) === "[object Object]";
}
var _isArguments = (function () {
  return toString.call(arguments) === "[object Arguments]"
    ? function _isArguments(x) {
        return toString.call(x) === "[object Arguments]";
      }
    : function _isArguments(x) {
        return Object.prototype.hasOwnProperty.call(x, "callee");
      };
})();
function _isTypedArray(val) {
  var type = Object.prototype.toString.call(val);
  return (
    type === "[object Uint8ClampedArray]" ||
    type === "[object Int8Array]" ||
    type === "[object Uint8Array]" ||
    type === "[object Int16Array]" ||
    type === "[object Uint16Array]" ||
    type === "[object Int32Array]" ||
    type === "[object Uint32Array]" ||
    type === "[object Float32Array]" ||
    type === "[object Float64Array]" ||
    type === "[object BigInt64Array]" ||
    type === "[object BigUint64Array]"
  );
}
function empty(x) {
  return x != null && typeof x["fantasy-land/empty"] === "function"
    ? x["fantasy-land/empty"]()
    : x != null &&
      x.constructor != null &&
      typeof x.constructor["fantasy-land/empty"] === "function"
    ? x.constructor["fantasy-land/empty"]()
    : x != null && typeof x.empty === "function"
    ? x.empty()
    : x != null &&
      x.constructor != null &&
      typeof x.constructor.empty === "function"
    ? x.constructor.empty()
    : isArray(x)
    ? []
    : _isString(x)
    ? ""
    : _isObject(x)
    ? {}
    : _isArguments(x)
    ? (function () {
        return arguments;
      })()
    : _isTypedArray(x)
    ? x.constructor.from("")
    : void 0; // else
}

export const isEmpty = (value) => {
  return value != null && value === empty(value);
};

export const isNil = (value) => value == null;
export const isNullOrEmpty = (value) => isNil(value) || isEmpty(value);
export const isNotNil = (value) => !isNil(value);
export const isNotEmpty = (value) => !isEmpty(value);
export const isNotNullNeitherEmpty = (value) =>
  isNotNil(value) && isNotEmpty(value);
export const isTrue = (value: boolean) => value === true;
export const isFalse = (value: boolean) => value === false;
export const isArray = (value) => Array.isArray(value);
export const isObject = (value) =>
  typeof value === "object" && !Array.isArray(value) && value != null;

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
export const hasFrom = (obj) => isNotNullNeitherEmpty(getFrom(obj));
export const hasTo = (obj) => isNotNullNeitherEmpty(getTo(obj));
// export const hasSerializerFn = (obj) =>
//   isNotNullNeitherEmpty(getSerializerFn(obj));
export const hasDeserializerFn = (obj) =>
  isNotNullNeitherEmpty(getDeserializerFn(obj));
export const hasSerializers = (obj) =>
  isNotNullNeitherEmpty(getSerializers(obj));
export const noSerializers = (obj) => !hasSerializers(obj);
export const hasFromTo = (obj) => hasFrom(obj) && hasTo(obj);
export const hasDeserializeProp = (obj) => obj.hasOwn("deserializeProp");
// export const hasBoth = (obj) => hasDeserializeProp(obj) && hasSerializerFn(obj);
// export const hasInvalidStructure = (obj) =>
//   hasSerializerFn(obj) && hasSerializers(obj);
export const multipleSerializeProp = (obj) => Array.isArray(obj?.serializeProp); // pipe(prop("serializeProp"), isArray);}
export const isPath = (value) => value.indexOf(".") != -1;
export const getPathValue = (path: (string | number)[], data) => {
  let value = data;
  for (let fragment of path) {
    value = value ? value[fragment] : undefined;
    if (!value) break;
  }
  return value;
};
export const isSingleObject = (obj) => Array.isArray(obj) && obj.length === 1; // allPass([isArray, (value) => value.length === 1]);

export const buildFirstIndexPath = (path: string): (string | number)[] => {
  const fragments = path.split(".");
  const result = [fragments[0], 0, fragments.slice(1, fragments.length)[0]];
  return result;
};

export const getPath = (prop: string): string | string[] =>
  isPath(prop) ? prop.split(".") : prop;

export const setProperty =
  (from: string, to: string, value: any) =>
  (obj: any = {}): any => {
    const path = getPath(to || from);
    const parsedValue =
      value === undefined || value === null ? undefined : value;
    if (Array.isArray(path)) {
      for (let i = path.length - 1; i >= 0; i--) {
        const prop = path[i];
        if (i == path.length - 1) obj[prop] = parsedValue;
        else obj = { [prop]: obj };
      }
      return obj;
    } else {
      obj[path] = parsedValue;
      return obj;
    }
  };
