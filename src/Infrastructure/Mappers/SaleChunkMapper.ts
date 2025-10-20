import { Inject, Injectable } from "@nestjs/common";
import { Artisan } from "src/Core/Domain/Entities/Artisan";
import { Sale } from "src/Core/Domain/Entities/Sale";
import { GetArtisanUseCase } from "src/Core/Domain/UseCases/GetArtisanUseCase";
import { Id } from "src/Core/Domain/ValueObjects/Id";
import { SaleChunk } from "src/Core/Domain/ValueObjects/SaleChunk";

export class ChunkMapper {
    //private useCase: GetArtisanUseCase;
    static toEntity(sale: Sale) {
        if (!sale) {
            throw new Error("No sale found");
        }
        const chunks = sale.saleChunks.map((salechunk) => ({
            artisanId: salechunk.artisan.id?.getValue(),
            items: salechunk.items.map((item) => ({
                productId: item.getProductId().getValue(),
                quantity: item.getQuantity(),
                price: item.getPrice(),
            })),
        }));
        return chunks;
    }

    static toDomain(sale: any) {
        if (!sale) {
            throw new Error("No sale found")
        }
        const chunks = sale.saleChunks.map(async (salechunk) => {
            new SaleChunk({
                artisan: new Artisan(salechunk),
                items: salechunk.items.map((item) => ({
                    productId: item.getProductId().getValue(),
                    quantity: item.getQuantity(),
                    price: item.getPrice(),
                })),
            })
        });
        return chunks
    }
}