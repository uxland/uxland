export class ViewNotFoundException extends Error{
    constructor(key: string) {
        super(`View with key ${key} not found in region`);
    }
}