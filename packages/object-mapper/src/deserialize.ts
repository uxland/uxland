import {isNullOrEmpty} from '@uxland/ramda-extensions';
import * as R from 'ramda';
import {SerializerInfo} from './model';
import {
  getDeserializerFn,
  getFrom,
  getSerializers,
  getTo,
  hasDeserializerFn,
  hasFromTo,
  hasSerializers,
  isArray,
  isObject,
  isPath,
  isSingleObject,
  lensProp,
  setProperty,
  thrower,
} from './utilities';
import {invalidPath, validSerializers} from './validation';

const buildFirstIndexPath = R.pipe(R.split('.'), (paths: string[]) => [
  paths[0],
  0,
  ...R.remove(0, 1, paths),
]);
const getProp = (from: string | string[], data: any): any =>
  R.cond([
    [
      isArray,
      (): any[] =>
        R.reduce(
          (collection, fromK: string) => collection.concat(data ? data[fromK] : undefined),
          [],
          from as string[]
        ),
    ],
    [
      isPath,
      (): any =>
        R.cond([
          [isObject, (): any => R.path(R.split('.', from as string), data)],
          [isSingleObject, (): any => R.path(buildFirstIndexPath(from as string), data)],
          [R.T, (): never => thrower(invalidPath)],
        ])(R.prop(R.split('.', from as string)[0], data)),
    ],
    [R.T, (): any => R.prop(from as string, data)],
  ])(from);
const setOutputMultipleTo = (to: string[], values: any[], output): Record<string, unknown> => {
  R.forEachObjIndexed((toK: string, i) => {
    output = R.set(lensProp(toK), values[i])(output);
    return output;
  }, to as string[]);
  return output;
};
const setOutput = (from: string, to: string | string[], value: any) => (output: any): any =>
  R.ifElse(
    isArray,
    () =>
      R.ifElse(
        isArray,
        () => setOutputMultipleTo(to as string[], value, output),
        () => setProperty(from, to as string, value)(output)
      )(value),
    () => setProperty(from, to as string, value)(output)
  )(to);
const executeFn = (data: any, from: string | string[], fn: (data: any | any[]) => any): any =>
  R.ifElse(
    isArray,
    //@ts-ignore
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
  deserializerFn?: () => any,
  serializers?: any[]
) => (output: any): any =>
  R.cond([
    [
      hasDeserializerFn,
      (): any => setOutput(from as string, to, executeFn(data, from, deserializerFn))(output),
    ],
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    [
      hasSerializers,
      (): any => setOutput(from as string, to, deserialize(data, serializers))(output),
    ],
    [R.T, (): any => setOutput(from as string, to, data)(output)],
  ])({
    deserializerFn,
    serializers,
  });
const bothArray = (s: {from: string | string[]; to: string | string[]}): boolean =>
  isArray(s.from) && isArray(s.to);
const fromIsArray = (s: {from: string | string[]; to: string | string[]}): boolean =>
  isArray(s.from);
const inToOut = (
  data: any,
  from: string | string[],
  to?: string | string[],
  fn?: () => any,
  serializers?: any
) => (output: any): any =>
  R.cond([
    [
      hasFromTo,
      R.cond([
        [
          bothArray,
          (): Record<string, unknown> =>
            R.reduce(
              (collection, fromK) =>
                assignInputToOutput(
                  getProp(fromK, data),
                  fromK,
                  (to as string[]).find(toK => toK == fromK),
                  fn,
                  serializers
                )(collection),
              {},
              from as string[]
            ),
        ],
        [
          fromIsArray,
          (): any =>
            assignInputToOutput(
              getProp(from[0], data),
              from[0],
              to as string,
              fn,
              serializers
            )(output),
        ],
        [
          R.T,
          (): any =>
            assignInputToOutput(getProp(from, data), from, to as string, fn, serializers)(output),
        ],
      ]),
    ],
    [
      R.T,
      (): any => assignInputToOutput(getProp(from, data), from, undefined, fn, serializers)(output),
    ],
  ])({
    from,
    to,
  });

const serializeArray = <I, O>(i: I[], serializers: SerializerInfo<I, O>[]): O[] =>
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  R.reduce<I, O[]>((collection, d) => collection.concat(deserialize(d, serializers)), [], i);
const serializeObject = <I, O>(i: I, serializers: SerializerInfo<I, O>[]): O =>
  R.reduce<SerializerInfo<I, O>, O>(
    (o, s) =>
      inToOut(
        i,
        getTo(s) || getFrom(s),
        getFrom(s),
        getDeserializerFn(s),
        getSerializers(s as any)
      )(o),
    {} as O,
    serializers
  );

export function deserialize<I, O>(i: I[], serializers?: SerializerInfo<I, O>[]): O[];
export function deserialize<I, O>(i: I, serializers?: SerializerInfo<I, O>[]): O;
/**
 * Deserialize data using serializers. This should be used only on objects serialized with the same serializers array,
 * and the object should not have change its structure.
 * @memberof ObjectMapper
 * @function
 * @name deserialize
 * @param {(*|Array.<*>)} i Input data or array data to be deserialized
 * @param {ObjectMapper.SerializerInfo=} serializers Serializers array. Must contain at least a "from" property.
 */
export function deserialize<I, O>(i: I | I[], serializers?: SerializerInfo<I, O>[]): O | O[] {
  if (validSerializers(serializers))
    return R.cond([
      [isNullOrEmpty, (): I | I[] => i],
      [
        R.T,
        (): any[] | Record<string, unknown> =>
          R.ifElse(
            isArray,
            () => serializeArray(i as I[], serializers),
            () => serializeObject(i as I, serializers)
          )(i),
      ],
    ])(serializers);
  return i as any;
}
