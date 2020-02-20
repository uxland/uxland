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

let STUB = 1;
/**
 * SerializerInfo interface
 * @interface SerializerInfo
 * @memberof ObjectMapper
 * @since v1.0.0
 * @property {(string|Array.<string>)} from key or array of keys from which to serialize
 * @property {(string|Array.<string>)=} to key/s to which serialize
 * @property {function=} serializerFn Serializer function to be called to serialize 'from' into 'to'
 * @property {function=} deserializerFn Deserializer function to be called to deserialize 'to' into 'from'
 * @property {Array.<ObjectMapper.SerializerInfo>=} serializers Serializers array to be used recursively instead of serializerFn
 */
STUB = 1;
export interface SerializerInfo<I, O, S = any, T = any> {
  from: keyof I | Array<keyof I>;
  to?: keyof O | Array<keyof O>;
  serializerFn?: (...args: I[keyof I][]) => O[keyof O];
  deserializerFn?: (...args: I[keyof I][]) => O[keyof O];
  serializers?: SerializerInfo<S, T>[];
}
