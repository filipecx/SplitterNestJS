export class NotFoundError extends Error{
    constructor(message: string) {
        super();
        this.name = "Not found error"
    }
}