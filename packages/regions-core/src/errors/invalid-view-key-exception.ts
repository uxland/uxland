import {InvalidArgumentException} from "./invalid-argument-exception";

export class InvalidViewKeyException extends InvalidArgumentException {
    constructor(msg: string) {
        super('key', msg);
    }
}
