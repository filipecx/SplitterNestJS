import { DomainErrors } from "../Errors/DomainError"
import { Id } from "./Id";

export interface SaleItemProps {
    productId: Id;
    quantity: number;
    unitPrice: number;
}

export class SaleItem {
    constructor(private saleItemProps: SaleItemProps){
        this.validateQuantity(saleItemProps.quantity);    
        this.validatePrice(saleItemProps.unitPrice);
    }

    getProductId(): Id {
        return this.saleItemProps.productId;
    }

    getPrice(): number {
        return this.saleItemProps.unitPrice
    }

    getQuantity(): number {
        return this.saleItemProps.quantity;
    }

    validatePrice(price: number) {
        if (price <= 0) {
            throw new DomainErrors("The price can't be zero or less")
        }
    }
    validateQuantity(quantity: number) {
        if (quantity < 0) {
            throw new DomainErrors("The item quantity can't be less than zero")
        }
    }
}