import {InvalidArgumentException} from "./invalid-argument-exception";

export class InvalidViewFactoryException extends InvalidArgumentException {
    constructor(msg: string) {
        super('factory', msg);
    }
}