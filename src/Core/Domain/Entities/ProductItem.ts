import { InvalidValueError } from "../Errors/InvalidValueError";
import { Id } from "../ValueObjects/Id";

export interface ProductProps  {
    id?: Id;
    storeId: Id;
    artisanId: Id;
    name: string;
    price: number;
    barcode: string;
    stockQuantity: number;
}

export class ProductItem {
    constructor(private productProps: ProductProps){
        this.validatePrice(productProps.price);
    }

    get id(): Id | undefined{
        return this.productProps.id
    }

    get storeId(): Id {
        return this.productProps.storeId;
    }

    get artisanId(): Id  {
        return this.productProps.artisanId;
    }

    get name(): string{
        return this.productProps.name;
    }

    get price(): number {
        return this.productProps.price;
    }

    get barcode(): string{
        return this.productProps.barcode;
    }

    get stockQuantity(): number {
        return this.productProps.stockQuantity;
    }

    changePrice(newPrice: number) {
        this.validatePrice(newPrice);
        this.productProps.price = newPrice;
    }

    addQuantity(quantity: number) {
        this.validateQuantity(quantity);
        this.productProps.stockQuantity += quantity;
    }

    deductQuantity(quantity: number) {
        this.validateQuantity(quantity);
        this.productProps.stockQuantity -= quantity;
    }

    validatePrice(price: number) {
        if (price <= 0) {
            throw new InvalidValueError(" O preço não pode ser menor ou igual a zero")
        }
    }

    validateQuantity(quantity: number) {
        if ( quantity <= 0) {
            throw new InvalidValueError("Você não pode remover zero ou menos itens do estoque")
        }
    }

}