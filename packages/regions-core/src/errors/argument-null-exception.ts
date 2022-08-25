export  class ArgumentNullException extends Error{
    constructor(argumentName: string) {
        super(`${argumentName} must be defined`);

    }
}
