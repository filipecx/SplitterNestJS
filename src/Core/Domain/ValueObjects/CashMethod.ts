import { PaymentMethod } from "./PaymentMethod";

export class CashMethod extends PaymentMethod {
    public readonly type = "CASH"
    constructor() {
        super();
    }

    public requiresExternalTransaction(): boolean {
        return false;
    }
}