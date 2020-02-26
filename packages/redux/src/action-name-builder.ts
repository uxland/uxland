import { constantBuilder, ConstantBuilder } from '@uxland/functional-utilities';

export const actionNameBuilder = (prefix: string, separator?: string): ConstantBuilder => {
  const builder = constantBuilder(prefix, 'action', separator);
  return (name: string): string => builder(name);
};
