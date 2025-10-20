import { Inject, Injectable } from '@nestjs/common';
import type { IntProductRepository } from '../../../Infrastructure/Interfaces/IntProductRepository'
import { ProductItem } from '../Entities/ProductItem';

@Injectable()
export class AddProductItemUseCase {
    constructor(@Inject('IntProductRepository') private repository: IntProductRepository){}

    async execute(product: ProductItem): Promise<ProductItem> {
        const persistedProduct = await this.repository.create(product);
        return persistedProduct;
    }
}