import { IntProductRepository } from "../../../Infrastructure/Interfaces/IntProductRepository";
import { ProductItem } from "../Entities/ProductItem";

export class GetAllActiveProductsUseCase {
    constructor(private repository: IntProductRepository){}
    async execute(): Promise<ProductItem[]> {
        const products = await this.repository.getAllActiveProducts();
        return products;
    }
}