import { InvalidValueError } from '../Errors/InvalidValueError'

export class Id {
    private readonly value: string;

    constructor(value: string) {
        this.validateValue(value);
        this.value = value;
    }

    private validateValue(value: string) {
        if (!value || typeof value !== 'string') {
            throw new InvalidValueError("O ID fornecido não é um UUID válido")
        }
    }

    public getValue(): string {
        return this.value;
    }


}