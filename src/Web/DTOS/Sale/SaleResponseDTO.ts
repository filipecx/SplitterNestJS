import { Id } from "src/Core/Domain/ValueObjects/Id";
import { PaymentMethod } from "src/Core/Domain/ValueObjects/PaymentMethod";
import { SaleChunk } from "src/Core/Domain/ValueObjects/SaleChunk";

export interface ResponseSaleDTO {
    id: string;
    storeId: string;
    employeeId: string;
    paymentMethod: PaymentMethod;
    totalGrossAmount: number;
    totalComission: number;
    saleChunks: SaleChunk[];
}