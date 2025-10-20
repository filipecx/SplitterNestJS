import { IntProductRepository } from "../../../Infrastructure/Interfaces/IntProductRepository";
import { IntArtisanRepository } from "../../../Infrastructure/Interfaces/IntArtisanRepository"
import { NotFoundError } from "./Errors/NotFoundError"
import { ProductItem } from "../Entities/ProductItem";
import { Id } from "../ValueObjects/Id";

export class GetProductsByArtisanIdUseCase {
    constructor(
        private repository: IntProductRepository,
        private artisanRepository: IntArtisanRepository
    ){}

    async execute(id: Id): Promise<ProductItem[]> {
        const artisan = await this.artisanRepository.getArtisan(id);
        if (!artisan) {
            throw new NotFoundError('Nenhum artesão com esse id foi encontrado');
        }
        const products = await this.repository.getProductsByArtisanId(id);
        return products;
    }
}