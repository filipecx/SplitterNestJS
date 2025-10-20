export class DomainErrors extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Domain Error"
    }
}