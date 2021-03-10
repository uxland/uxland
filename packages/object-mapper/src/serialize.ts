import * as R from 'ramda';
import {SerializerInfo} from './model';
import {
  getFrom,
  getSerializerFn,
  getSerializers,
  getTo,
  isArray,
  isObject,
  isPath,
  isSingleObject,
  setProperty,
  thrower,
} from './utilities';
import {invalidPath, validSerializers} from './validation';

const buildFirstIndexPath = R.pipe(R.split('.'), (paths: string[]) => [
  paths[0],
  0,
  ...R.remove(0, 1, paths),
]);
const getPropForArray = (from: string[], data: any): any =>
  from.map((fromK: string) => (data ? data[fromK] : undefined));
const getPropForPath = (from: string, data: any): any => {
  const path = R.split('.', from as string);
  const item = data[path[0]];
  return isObject(item)
    ? R.path(path, data)
    : isSingleObject(item)
    ? R.path(buildFirstIndexPath(from as string), data)
    : thrower(invalidPath);
};
const getProp = (from: string | string[], data: any): any =>
  isArray(from)
    ? getPropForArray(from as string[], data)
    : isPath(from as string[])
    ? getPropForPath(from as string, data)
    : data[from as string];
const multipleTo = (
  data: any,
  from: string | string[],
  to: string[],
  fn: () => any
): Record<string, unknown> =>
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  to.reduce(
    (collection, toK: string) =>
      inToOut(data, R.equals(from, to) ? toK : from, toK, fn)(collection),
    {}
  );
const executeFn = (data: any, from: string | string[], fn: (payload: any) => any): any =>
  isArray(from)
    ? //@ts-ignore
      fn(...data)
    : isArray(data)
    ? data.map(d => fn(d))
    : fn(data);
const assignInputToOutput = (
  data: any,
  from: string | string[],
  to?: string,
  serializerFn?: () => any,
  serializers?: any[]
) => (output: any): any => {
  if (!serializerFn && !serializers) return setProperty(from as string, to, data)(output);
  else if (serializerFn)
    return setProperty(from as string, to, executeFn(data, from, serializerFn))(output);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  else return setProperty(from as string, to, serialize(data, serializers))(output);
};
const inToOut = (
  data: any,
  from: string | string[],
  to?: string | string[],
  fn?: () => any,
  serializers?: any
) => (output: any): any =>
  isArray(to)
    ? multipleTo(data, from, to as string[], fn)
    : assignInputToOutput(getProp(from, data), from, to as string, fn, serializers)(output);

const serializeArray = <I, O>(i: I[], serializers: SerializerInfo<I, O>[]): O[] =>
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  i.map(d => serialize<I, O>(d, serializers));
const serializeObject = <I, O>(i: I, serializers: SerializerInfo<I, O>[]): O =>
  serializers.reduce(
    (o, s) =>
      inToOut(
        i,
        getFrom(s) as string | string[],
        getTo(s),
        getSerializerFn(s as any),
        getSerializers(s as any)
      )(o),
    {} as O
  );

export function serialize<I, O>(i: I[], serializers?: SerializerInfo<I, O>[]): O[];
export function serialize<I, O>(i: I, serializers?: SerializerInfo<I, O>[]): O;
/**
 * Serialize data using serializers
 * @memberof ObjectMapper
 * @function
 * @name serialize
 * @param {(*|Array.<*>)} i Input data or array data to be serialized
 * @param {ObjectMapper.SerializerInfo=} serializers Serializers array. Must contain at least a "from" property.
 */
export function serialize<I, O>(i: I | I[], serializers?: SerializerInfo<I, O>[]): O | O[] {
  if (validSerializers(serializers))
    return isArray(i)
      ? serializeArray(i as I[], serializers)
      : serializeObject(i as I, serializers);
  return i as any;
}

/**
 //TODO: Prepare console warnings for inconsistencies between serialization and deserialization.
 * i.e.: When using sub-serializers with non-object structure:
 * const input = {foo: 'bar'};
 * const serializers = [{from: 'foo', serializers: [{from: 'bar'}]}];
 * const output = serialize(input, serializers); // {foo: {bar: undefined}};
 * This is not possible to deserialize
 */
