export class DuplicatedViewException extends Error {
    constructor() {
        super("A view with same key already exists in region");
    }
}