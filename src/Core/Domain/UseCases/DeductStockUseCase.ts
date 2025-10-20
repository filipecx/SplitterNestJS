import { IntProductRepository } from "../../../Infrastructure/Interfaces/IntProductRepository";
import { ProductItem } from "../Entities/ProductItem";
import { Id } from "../ValueObjects/Id";
import { NotFoundError } from "./Errors/NotFoundError";

export class DeductStockUseCase {
    constructor(private repository: IntProductRepository){}
    async execute(id: Id, quantity: number): Promise<ProductItem> {
        const product = await this.repository.get(id);
        if (!product) {
            throw new NotFoundError("Nenhum produto com esse id encontrado");
        }
        product.deductQuantity(quantity);
        const updatedProduct = this.repository.update(product);
        return updatedProduct;
    }
}