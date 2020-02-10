import * as R from 'ramda';
import { isArray, notInitial } from '.';
import { SerializerInfo } from './model';

export const thrower = (message: string) => {
  throw new Error(message);
};
export const getFrom = (serializer?: any): string | string[] => serializer?.from;
export const getTo = (serializer?: any): string | string[] => serializer?.to;
export const getSerializerFn = (serializer?: any): Function => serializer?.serializerFn;
export const getDeserializerFn = (serializer?: any): Function => serializer?.deserializerFn;
export const getSerializers = (serializer?: any): SerializerInfo<any, any>[] => serializer?.serializers;
export const hasFrom = R.pipe(
  getFrom,
  notInitial
);
export const hasTo = R.pipe(
  getTo,
  notInitial
);
export const hasSerializerFn = R.pipe(
  getSerializerFn,
  notInitial
);
export const hasDeserializerFn = R.pipe(
  getDeserializerFn,
  notInitial
);
export const hasSerializers = R.pipe(
  getSerializers,
  notInitial
);
export const noSerializers = R.complement(hasSerializers);
export const hasFromTo = R.allPass([hasFrom, hasTo]);
export const isPath = R.pipe(
  R.indexOf('.'),
  R.complement(R.equals(-1))
);
export const isSingleObject = R.allPass([
  isArray,
  R.pipe(
    R.length,
    R.equals(1)
  )
]);
export const lensProp = (prop: string) =>
  R.ifElse(isPath, () => R.lensPath(R.split('.')(prop)), () => R.lensProp(prop))(prop);

export const getPath = (prop: string) => R.ifElse(isPath, () => R.split('.')(prop), () => prop)(prop);

export const setProperty = (from: string, to: string, value: any) => (obj: any = {}) => {
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
