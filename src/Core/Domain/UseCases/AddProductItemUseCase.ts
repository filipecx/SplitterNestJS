import { Inject, Injectable } from '@nestjs/common';
import type { IntProductRepository } from '../../../Infrastructure/Interfaces/IntProductRepository'
import { ProductItem } from '../Entities/ProductItem';
import { QRCodeGenerator } from 'src/Infrastructure/QRCode/qrCodeGenerator';

@Injectable()
export class AddProductItemUseCase {
    private baseUrl: string = 'http:/localhost:3000/products/'
    constructor(@Inject('IntProductRepository') private repository: IntProductRepository, @Inject() private qrCode: QRCodeGenerator){}

    async execute(product: ProductItem): Promise<ProductItem> {
        const persistedProduct = await this.repository.create(product);
        const url = this.baseUrl + persistedProduct.id?.getValue();
        this.qrCode.generateQR(url, persistedProduct.name)
        return persistedProduct;
    }
}