let STUB = 1;
/**
 * SerializerInfo interface
 * @interface
 * @memberof ObjectMapper
 * @since v1.0.0
 * @property {(string|Array.<string>)} from key or array of keys from which to serialize
 * @property {(string|Array.<string>)=} to key/s to which serialize
 * @property {function=} serializerFn Serializer function to be called to serialize 'from' into 'to'
 * @property {function=} deserializerFn Deserializer function to be called to deserialize 'to' into 'from'
 * @property {Array.<SerializerInfo>=} serializers Serializers array to be used recursively instead of serializerFn
 */
STUB = 1;
export interface SerializerInfo<I, O, S = any, T = any> {
  from: keyof I | Array<keyof I>;
  to?: keyof O | Array<keyof O>;
  serializerFn?: (...args: I[keyof I][]) => O[keyof O];
  deserializerFn?: (...args: I[keyof I][]) => O[keyof O];
  serializers?: SerializerInfo<S, T>[];
}
