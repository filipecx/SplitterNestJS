export abstract class PaymentMethod {
    public abstract readonly type: string;

    public abstract requiresExternalTransaction(): boolean     

    public toString(): string {
        return this.type;
    }
}