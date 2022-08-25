export class InvalidArgumentException extends Error{
    constructor(public argument: string, msg: string) {
        super(msg);
    }
}

