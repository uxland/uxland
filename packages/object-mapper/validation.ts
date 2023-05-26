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
import { isArray } from "./utilities";

export const invalidSerializerFn = "invalid-serializer-fn";
export const requiredFrom = "Serializer requires a from property";
export const requiredSerializeFn = "required-serializer-fn";
export const invalidSerializerStructure =
  "Cannot define serializerFn and serializers at the same time";
export const invalidPath =
  "Path can only be used for objects and single object arrays";

export const validateSerializer = <S, D>(
  serializer: SerializerInfo<S, D>
): SerializerInfo<S, D> => {
  if (!serializer.from) throw new Error(requiredFrom);
  if (
    serializer.from &&
    isArray(serializer.from) &&
    !isArray(serializer.to) &&
    !serializer.serializerFn
  )
    throw new Error(requiredSerializeFn);
  if (serializer.serializerFn && serializer.serializers)
    throw new Error(invalidSerializerStructure);
  return serializer;
};
export const validateSerializers = <S, D>(
  serializers: SerializerInfo<S, D>[]
): SerializerInfo<S, D>[] => serializers?.map((s) => validateSerializer(s));

export const validSerializers = <S, L>(
  serializers: SerializerInfo<S, L>[]
): SerializerInfo<S, L>[] => validateSerializers<S, L>(serializers);
export const invalidSerializers = <S, L>(
  serializers: SerializerInfo<S, L>[]
): boolean => !validSerializers(serializers);
