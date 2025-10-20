import { CreditCardMethod } from "../../Core/Domain/ValueObjects/CreditCardMethod";
import { PaymentMethod } from "../../Core/Domain/ValueObjects/PaymentMethod";
import { IntPaymentMethod } from "../Interfaces/IntPaymentMethod";
import { CashMethod } from "../../Core/Domain/ValueObjects/CashMethod"
import { PixMethod } from "../../Core/Domain/ValueObjects/PixMethod";
export class PaymentMethodFactory implements IntPaymentMethod {
    create(type: string, details: {instalments: number, feeRate: number}): PaymentMethod {
        switch (type) {
            case 'CREDIT_CARD':
                const feeRate = details.feeRate;
                return new CreditCardMethod(details.instalments, feeRate)
            case 'CASH':
                return new CashMethod()
            case 'PIX':
                return new PixMethod();
            default: 
                throw new Error("Método de pagmento não suportado")
        }
    }
}