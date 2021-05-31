import {isNil, mergeDeepRight} from 'ramda';
import {Configuration} from '../domain';

export const mergeRequest = (requestInit: RequestInit, config: Configuration): unknown => {
  if (isNil(config)) return requestInit;
  else return mergeDeepRight(requestInit, config);
};
