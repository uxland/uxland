import isNil from 'ramda/es/isNil';
import mergeDeepRight from 'ramda/es/mergeDeepRight';
import {Configuration} from '../domain';

export const mergeRequest = (requestInit: RequestInit, config: Configuration): unknown => {
  if (isNil(config)) return requestInit;
  else return mergeDeepRight(requestInit, config);
};
