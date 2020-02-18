import {anyPass, isEmpty, isNil} from 'ramda'
export const isNullOrEmpty = anyPass([isNil, isEmpty]);
