import IntlMessageFormat from 'intl-messageformat';
import { Lens, lensPath, view } from 'ramda';

const getArgs = (args: any[]): any[] => {
  let result = args;
  if (args && args.length == 1) {
    if (Object.prototype.toString.call(args[0]) === '[object Array]') result = args[0];
    else if (typeof args[0] === 'object') {
      const argObj = args[0];
      result = Object.keys(argObj).reduce((previous: any[], currentKey: string) => {
        return previous.concat(currentKey, argObj[currentKey]);
      }, []);
    }
  }

  return result;
};
const getLens = (key: string): Lens => lensPath(String(key).split('.'));
export type Localizer = (key: string, ...args: any[]) => IntlMessageFormat | string;
export type LocalizerFactory = (
  language: string,
  locales: Record<string, any>,
  formats?: any,
  useKeyIfMissing?: boolean
) => Localizer;
export const localizerFactory: LocalizerFactory = (
  language: string,
  locales: Record<string, any>,
  formats = {},
  useKeyIfMissing = false
) =>
  function localize(key: string, ...args: any[]): IntlMessageFormat | string {
    if (!key || !locales || !language || !locales[language]) return '';
    const translatedValue: string = view(getLens(key), locales[language]);
    if (!translatedValue) return useKeyIfMissing ? key : '';
    if (!args || !args.length) return translatedValue;

    const cachedMessages: Record<string, IntlMessageFormat> = {};
    const messageKey = `${key}${translatedValue}`;
    let translatedMessage = cachedMessages[messageKey];
    if (!translatedMessage) {
      translatedMessage = new IntlMessageFormat(translatedValue, language, formats);
      cachedMessages[messageKey] = translatedMessage;
    }

    args = getArgs(args);
    const arg = {};
    for (let i = 0; i < args.length; i += 2) arg[args[i]] = args[i + 1];
    return translatedMessage.format(arg);
  };
