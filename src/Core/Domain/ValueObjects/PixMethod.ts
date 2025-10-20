import { PaymentMethod } from "./PaymentMethod"

export class PixMethod extends PaymentMethod {
    public readonly type = "PIX"
    constructor(){
        super();
    }

    public requiresExternalTransaction(): boolean {
        return true;
    }


}

