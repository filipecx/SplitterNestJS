import { Id } from "src/Core/Domain/ValueObjects/Id";
import { PaymentMethod } from "src/Core/Domain/ValueObjects/PaymentMethod";
import { SaleChunk } from "src/Core/Domain/ValueObjects/SaleChunk";

export interface ResponseSale {
    id?: Id;
    storeId: Id;
    employeeId: Id;
    paymentMethod: PaymentMethod;
    totalGrossAmount: number;
    totalComission: number;
    saleChunks: SaleChunk[];
}