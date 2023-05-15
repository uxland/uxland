import all from 'ramda/es/all';
import anyPass from 'ramda/es/anyPass';
import equals from 'ramda/es/equals';
import is from 'ramda/es/is';
import keys from 'ramda/es/keys';

const isType = equals('type');
const isPayload = equals('payload');
const isErrorProp = equals('error');
const isMeta = equals('meta');
const isValidKey: (key: string) => boolean = anyPass([isType, isPayload, isErrorProp, isMeta]);
export const isFSA: (action) => boolean = action =>
  is(Object, action) && is(String, action.type) && all(isValidKey, keys(action) as any[]);
