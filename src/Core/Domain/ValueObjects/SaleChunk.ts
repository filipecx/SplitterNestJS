import { SaleItem } from "./SaleItem";
import { InvalidValueError } from "../Errors/InvalidValueError";
import { Artisan } from "../Entities/Artisan";
import { Id } from "./Id";

export interface SaleChunkProps {
    artisan: Artisan;
    items: SaleItem[];
}

export class SaleChunk {
    private readonly grossAmount: number;

    constructor(private saleChunkProps: SaleChunkProps){
        this.validateItems();     
        this.grossAmount = this.calculateGrossAmount(saleChunkProps.items);
    }

    getGrossAmount(): number {
        return this.grossAmount;
    }

    getStoreComission(): number {
        const rate = this.saleChunkProps.artisan.comissionRate;
        return this.getGrossAmount() / rate;
    }

     public getArtisanPayoutBase(): number {
        return this.grossAmount - this.getStoreComission();
    }

    get artisan(): Artisan {
        return this.saleChunkProps.artisan;
    }

    get items(): SaleItem[] {
        return this.saleChunkProps.items;
    }

    private validateItems() {
        if ( !this.saleChunkProps.items || this.saleChunkProps.items.length <= 0) {
            throw new InvalidValueError("Deve conter pelo menos um item")
        }
/*
        if (!this.saleChunkProps.artisan.isActive) {
            throw new InvalidValueError("O artesão deve estar ativo para fazer uma venda")
        } */
    }

    private calculateGrossAmount(items: SaleItem[]): number {
        return items.reduce((sum, item) => sum + (item.getPrice() * item.getQuantity()), 0);
    }

    //todo add message publisher


}