import { Inject, Injectable } from "@nestjs/common";
import type { IntSaleRepository } from "src/Infrastructure/Interfaces/IntSaleRepository";
import { Id } from "../../ValueObjects/Id";
import { Sale } from "../../Entities/Sale";

@Injectable()
export class GetSalesByStoreIdUseCase {
    constructor(@Inject('IntSalesRepository') private repository: IntSaleRepository){}

    async execute(storeId: Id): Promise<Sale[]> {

        return await this.repository.getSalesByStoreId(storeId);
    }
}