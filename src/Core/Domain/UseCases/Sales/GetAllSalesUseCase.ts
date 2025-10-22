import { Inject, Injectable } from "@nestjs/common";
import type { IntSaleRepository } from "src/Infrastructure/Interfaces/IntSaleRepository";
import { Id } from "../../ValueObjects/Id";
import { Sale } from "../../Entities/Sale";


@Injectable()
export class GetAllSalesUseCase {
    constructor(@Inject('IntSaleRepository') private repositoy: IntSaleRepository) { }

    public async execute(): Promise<Sale[]> {
        const sales: Sale[] = await this.repositoy.getAllSales();
        
        return sales;
    }
}