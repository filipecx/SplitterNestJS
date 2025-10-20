import { Inject, Injectable } from "@nestjs/common";
import type { IntProductRepository } from "../../../Infrastructure/Interfaces/IntProductRepository";
import { ProductItem } from "../Entities/ProductItem";

@Injectable()
export class GetAllProductsUseCase {
    constructor(@Inject('IntProductRepository') private repository: IntProductRepository) {}

    async execute(): Promise<ProductItem[]> {
        const products = await this.repository.getAll();
        return products;
    }
}