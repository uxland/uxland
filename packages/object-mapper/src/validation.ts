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
import { SerializerInfo } from './model';
import { isArray } from './utilities';

export const invalidSerializerFn = 'invalid-serializer-fn';
export const requiredFrom = 'Serializer requires a from property';
export const requiredSerializeFn = 'required-serializer-fn';
export const invalidSerializerStructure = 'Cannot define serializerFn and serializers at the same time';
export const invalidPath = 'Path can only be used for objects and single object arrays';

export const validateSerializer = <S, D>(serializer: SerializerInfo<S, D>): SerializerInfo<S, D> => {
  if (!serializer.from) throw new Error(requiredFrom);
  if (serializer.from && isArray(serializer.from) && !isArray(serializer.to) && !serializer.serializerFn)
    throw new Error(requiredSerializeFn);
  if (serializer.serializerFn && serializer.serializers) throw new Error(invalidSerializerStructure);
  return serializer;
};
export const validateSerializers = <S, D>(serializers: SerializerInfo<S, D>[]): SerializerInfo<S, D>[] =>
  serializers?.map(s => validateSerializer(s));

export const validSerializers = <S, L>(serializers: SerializerInfo<S, L>[]): SerializerInfo<S, L>[] =>
  validateSerializers<S, L>(serializers);
export const invalidSerializers = <S, L>(serializers: SerializerInfo<S, L>[]): boolean =>
  !validSerializers(serializers);
