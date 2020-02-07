
import IntlMessageFormat from "intl-messageformat";
import lensPath from 'ramda/es/lensPath'
import view from 'ramda/es/view';
const getArgs = (args: any[]): any[] =>{
    let result = args;
    if(args && args.length == 1){
        if(Object.prototype.toString.call( args[0] ) === '[object Array]')
            result = args[0];
        else if (typeof args[0] === 'object'){
            let argObj = args[0];
            result = Object.keys(argObj).reduce((previous: any[], currentKey: string) =>{
                return previous.concat(currentKey, argObj[currentKey]);
            }, []);
        }
    }

    return result;
};
const getLens = (key: string) => lensPath(String(key).split('.'));
export type Localizer = (key: string, ...args: any[]) => string;
export type LocalizerFactory = (language: string, locales: Object, formats: any, useKeyIfMissing: boolean) => Localizer;
export const localizerFactory: LocalizerFactory = (language: string, locales: Object, formats: any, useKeyIfMissing: boolean) =>{
    let cachedMessages = {};
    return function localize(key: string, ...args: any[]) {
        if(!key || !locales || !language || !locales[language])
            return '';
        let translatedValue :string = view(getLens(key), locales[language]);
        if(!translatedValue)
            return useKeyIfMissing ? key : '';
        if(!args || !args.length)
            return translatedValue;

        let messageKey = key + translatedValue;
        let translatedMessage = cachedMessages[messageKey];
        if (!translatedMessage) {
            translatedMessage = new IntlMessageFormat(translatedValue, language, formats);
            cachedMessages[messageKey] = translatedMessage;
        }
        args = getArgs(args);
        let arg = {};
        for (let i = 0; i < args.length; i += 2)
            arg[args[i]] = args[i+1];

        return translatedMessage.format(arg);
    }
};
