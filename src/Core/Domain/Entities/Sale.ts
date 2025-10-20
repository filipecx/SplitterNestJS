import { InvalidValueError } from "../Errors/InvalidValueError";
import { Id } from "../ValueObjects/Id";
import { PaymentMethod } from "../ValueObjects/PaymentMethod";
import { SaleChunk } from "../ValueObjects/SaleChunk";

export interface SaleProps {
    id?: Id;
    storeId: Id;
    employeeId: Id;
    paymentMethod: PaymentMethod;
    totalGrossAmount: number;
    totalComission: number;
    saleChunks: SaleChunk[];
}

export class Sale {
    constructor(private saleProps: SaleProps) {
        this.validateTotalGrossAmount();
        this.verifyIfGrossAmountIsEqualToChunksAmount();
    }

    get id(): Id | undefined{
        return this.saleProps.id;
    }

    get storeId(): Id {
        return this.saleProps.storeId;
    }

    get employeeId(): Id {
        return this.saleProps.employeeId;
    }

    get paymentMethod(): PaymentMethod {
        return this.saleProps.paymentMethod;
    }

    get totalGrossAmount(): number {
        return this.saleProps.totalGrossAmount;
    }

    get saleChunks(): SaleChunk[] {
        return this.saleProps.saleChunks;
    }

    get totalComission(): number {
        return this.saleProps.totalComission;
    }

    private validateTotalGrossAmount(): void {
        if (this.saleProps.totalGrossAmount <= 0) {
            throw new InvalidValueError("O valor total da compra não pode ser menor ou igual a zero")
        }
        return
    }

    private verifyIfGrossAmountIsEqualToChunksAmount() {
        
        const totalChunk = this.saleProps.saleChunks.reduce((sum, chunk) => sum + chunk.getGrossAmount(), 0);

        const tolerance = 0.001; 
        if (Math.abs(this.saleProps.totalGrossAmount - totalChunk) > tolerance) {
            throw new InvalidValueError(
                "Inconsistência de Agregado: A soma dos SaleChunks não corresponde ao Total Bruto da Venda.")
            }
    }

}