import { Inject, Injectable } from "@nestjs/common";
import type { IntProductRepository } from "../../../Infrastructure/Interfaces/IntProductRepository";
import { ProductItem } from "../Entities/ProductItem";
import { Id } from "../ValueObjects/Id";

@Injectable()
export class GetProductUseCase {
    constructor(@Inject('IntProductRepository')private repository: IntProductRepository){}
    async execute(id: Id): Promise<ProductItem>{
        const product = await this.repository.get(id);
        return product;
    }
}