export class CommError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Communication error with message queue"
    }
}