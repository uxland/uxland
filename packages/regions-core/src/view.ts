import {InvalidViewFactoryException, InvalidViewKeyException} from './errors';

export type ViewDirectFactory = () => any;
export type ViewPromiseFactory = () => Promise<any>;

export type ViewFactory = ViewDirectFactory | ViewPromiseFactory;

export interface View {
  key: string;
  factory: ViewFactory;
}

export const validate = (view: View) => {
  validateKey(view.key);
  validateFactory(view.factory);
};

const validateKey = (key: string) => {
  if (!key || !key.trim()) throw new InvalidViewKeyException('View key cannot be nil or empty');
};

const validateFactory = (factory: ViewFactory) => {
  if (!factory) throw new InvalidViewFactoryException('View factory cannot be nil');
  if (!isADirectFactory(factory) && !isAPromiseFactory(factory))
    throw new InvalidViewFactoryException('View factory has to be a function or a promise');
};

const isADirectFactory = (factory: ViewFactory) => typeof factory === 'function';
const isAPromiseFactory = (factory: ViewFactory) => typeof factory['then'] == 'function';
