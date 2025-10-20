import { InvalidValueError } from '../Errors/InvalidValueError';
import { PaymentMethod } from '../ValueObjects/PaymentMethod'

export class CreditCardMethod extends PaymentMethod {
    public readonly type = "CREDIT_CARD";
    //parcelas
    private readonly installments: number;
    private readonly feeRate: number;

    constructor(installments: number, feeRate: number) {
        super();
        this.validateInstallments(installments);
        this.installments = installments;
        this.feeRate = feeRate;
    }

    public requiresExternalTransaction(): boolean {
        return true;
    }


    validateInstallments(installments: number) {
        if (installments <= 0 || installments > 12) {
            throw new InvalidValueError("Parcelas inválidas")
        }
    }


}