import { IntProductRepository } from "../../../Infrastructure/Interfaces/IntProductRepository";
import { ProductItem } from "../Entities/ProductItem";
import { NotFoundError } from "./Errors/NotFoundError";

export class UpdateProductUseCase {
    constructor(private repository: IntProductRepository){}

    async execute(product: ProductItem): Promise<ProductItem> {
        if (!product.id) {
            throw new NotFoundError("Produto sem id enviado")
        }
        const exists = this.repository.get(product.id);
        if (!exists) {
            throw new NotFoundError("Nenhum produto com esse id encontrado")
        }
        const updatedProduct = await this.repository.update(product);
        return updatedProduct;

    }
}