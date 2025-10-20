import { IntProductRepository } from "../../../Infrastructure/Interfaces/IntProductRepository";
import { ProductItem } from "../Entities/ProductItem";
import { Id } from "../ValueObjects/Id";

export class GetProductUseCase {
    constructor(private repository: IntProductRepository){}
    async execute(id: Id): Promise<ProductItem>{
        const product = await this.repository.get(id);
        return product;
    }
}