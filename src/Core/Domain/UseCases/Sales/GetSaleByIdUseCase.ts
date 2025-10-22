import { Inject, Injectable } from "@nestjs/common";
import type { IntSaleRepository } from "src/Infrastructure/Interfaces/IntSaleRepository";
import { Id } from "../../ValueObjects/Id";
import { Sale } from "../../Entities/Sale";


@Injectable()
export class GetSaleByIdUseCase {
    constructor(@Inject('IntSaleRepository') private repositoy: IntSaleRepository) { }

    public async execute(id: Id): Promise<Sale> {
        const sale: Sale = await this.repositoy.getSale(id);
        
        return sale;
    }
}