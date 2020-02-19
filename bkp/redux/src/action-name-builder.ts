import { constantBuilder } from '@uxland/utilities';

export const actionNameBuilder = (prefix: string, separator?: string) => {
  const builder = constantBuilder(prefix, 'action', separator);
  return (name: string) => builder(name);
};
