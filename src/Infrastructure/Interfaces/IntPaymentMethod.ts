import { PaymentMethod } from "../../Core/Domain/ValueObjects/PaymentMethod";

export interface IntPaymentMethod {
    create(type: string, details: {instalments?: number, feeRate?: number}): PaymentMethod
}