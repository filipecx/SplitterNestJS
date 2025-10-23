import type { IntSaleRepository } from '../../../../Infrastructure/Interfaces/IntSaleRepository';
import type { IntArtisanRepository } from '../../../../Infrastructure/Interfaces/IntArtisanRepository';
import type { IntProductRepository } from '../../../../Infrastructure/Interfaces/IntProductRepository';
import type { IntPaymentMethod } from '../../../../Infrastructure/Interfaces/IntPaymentMethod';
import type { IntMessagePublisher } from "../../../../Infrastructure/Communication/IntMessagePublisher";
import { Inject, Injectable } from '@nestjs/common';
import { RegisterSaleRequestDTO } from '../DTOs/RegisterSaleRequestDTO';
import { Sale } from '../../Entities/Sale';
import { SaleChunk } from '../../ValueObjects/SaleChunk';
import { SaleItem } from '../../ValueObjects/SaleItem';
import { ProductItem } from '../../Entities/ProductItem';
import { Artisan } from '../../Entities/Artisan';
import { Id } from '../../ValueObjects/Id';
import { NotFoundError } from '../Errors/NotFoundError';

@Injectable()
export class RegisterSaleUseCase {
    constructor(
        @Inject('IntArtisanRepository') private artisanRepository: IntArtisanRepository,
        @Inject('IntProductRepository') private productRepository: IntProductRepository,
        @Inject('IntSaleRepository') private repository: IntSaleRepository,
        @Inject('IntPaymentMethod') private paymentFactory: IntPaymentMethod,
        @Inject('IntMessagePublisher') private rabbit: IntMessagePublisher
    ) {}

    async execute(sale: RegisterSaleRequestDTO): Promise<void> {

        const productsToUpdate: ProductItem[] = [];
        const itemsByArtisan = new Map<string, SaleItem[]>();
        const artisansInSale = new Map<string, Artisan>();

        let totalGrossAmount = 0;
        
        if (sale.items.length < 1) {
            throw new Error("Nenhum item registrado na venda");
        }
        
        for (const item of sale.items) {
            const productId = new Id(item.id);
            const product = await this.productRepository.get(productId);
            if (!product) throw new NotFoundError(`Nenhum item com id ${item.id} encontrado`);

            product.deductQuantity(item.quantity);
            productsToUpdate.push(product);

            const saleItem = new SaleItem({
                productId: productId,
                quantity: item.quantity,
                unitPrice: product.price
            });
            
            totalGrossAmount += saleItem.getPrice() * saleItem.getQuantity();

            const artisanId = product.artisanId.getValue();

            if (!artisansInSale.has(artisanId)) {
                const artisan = await this.artisanRepository.getArtisan(product.artisanId);
                if (!artisan) throw new NotFoundError(`Nenhum artesão com id ${artisanId} encontrado`);
                artisansInSale.set(artisanId, artisan);
            }

            if (!itemsByArtisan.has(artisanId)) {
                itemsByArtisan.set(artisanId, []);
            }
            itemsByArtisan.get(artisanId)!.push(saleItem);
        }
        const saleChunks: SaleChunk[] = [];
        for (const [artisanId, items] of itemsByArtisan.entries()) {
            const artisan = artisansInSale.get(artisanId)!;
            saleChunks.push(new SaleChunk({ artisan, items }));
        }
        const totalComission = saleChunks.reduce((sum, chunk) => sum + chunk.getStoreComission(), 0);

        const paymentMethod = this.paymentFactory.create(sale.paymentMethod, sale.paymentDetails);

        const newSale: Sale = new Sale({
            storeId: new Id("123-storeid-uuid"),
            employeeId: new Id("123-storeid-uuid"),
            paymentMethod: paymentMethod,
            totalGrossAmount: totalGrossAmount,
            totalComission: totalComission,
            saleChunks: saleChunks
        });

        await this.productRepository.updateMany(productsToUpdate);
        const createdSale = await this.repository.create(newSale);

        for (const chunk of createdSale.saleChunks) {
            
            if (!chunk.artisan.id) {
                throw new NotFoundError("No artisan found by this id");
            }
             if (!createdSale.id) {
                throw new NotFoundError("No artisan found by this id");
            }

            const payload = {
                saleId: createdSale.id.getValue(),
                storeId: createdSale.storeId.getValue(),
                artisanId: chunk.artisan.id.getValue(),
                artisanName: chunk.artisan.name,
                artisanEmail: chunk.artisan.email,
                grossAmount: chunk.getGrossAmount(),
                commissionRate: chunk.getStoreComission(),
                paymentType: createdSale.paymentMethod.type
            };
            await this.rabbit.publish(payload);
        }
    }
}
