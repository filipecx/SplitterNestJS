import { Sale, SaleProps } from "src/Core/Domain/Entities/Sale";
import { Id } from "src/Core/Domain/ValueObjects/Id";
import { IntSaleRepository } from "../Interfaces/IntSaleRepository";
import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SaleChunk } from "src/Core/Domain/ValueObjects/SaleChunk";
import { ChunkMapper } from "../Mappers/SaleChunkMapper";
import { ItemMapper } from "../Mappers/ItemMapper";
import { GetArtisanUseCase } from "src/Core/Domain/UseCases/GetArtisanUseCase";
import { CreditCardMethod } from "src/Core/Domain/ValueObjects/CreditCardMethod";
import { SaleItem } from "src/Core/Domain/ValueObjects/SaleItem";
import { Artisan } from "src/Core/Domain/Entities/Artisan";

@Injectable()
export class SaleRepository implements IntSaleRepository {
    constructor(private prisma: PrismaService, @Inject() private mapper: ChunkMapper) { }
    async create(sale: Sale): Promise<Sale> {
        const persistedSale = await this.prisma.sales.create({
            data: {
                storeId: sale.storeId.getValue(),
                employeeId: sale.employeeId.getValue(),
                paymentMethod: sale.paymentMethod.type,
                totalGrossAmount: sale.totalGrossAmount,
                totalComission: sale.totalComission,
                items: JSON.stringify(sale.saleChunks.flatMap((chunk) => chunk.items)),
                saleChunks: JSON.stringify(
                    sale.saleChunks.map((chunk) => ({
                        artisan: {
                            id: chunk.artisan.id?.getValue(),
                            storeId: chunk.artisan.storeId.getValue(),
                            name: chunk.artisan.name,
                            email: chunk.artisan.email,
                            comissionRate: chunk.artisan.comissionRate,
                            isActive: chunk.artisan.isActive,
                        },
                        items: chunk.items.map((item) => ({
                            productId: item.getProductId(),
                            quantity: item.getQuantity(),
                            unitPrice: item.getPrice(),
                        }))
                    })))
            }
        })

        let parseado: any[] = []
        if (!persistedSale.saleChunks) {
            throw new Error("Não tem chunk");
        }
        if (typeof persistedSale.saleChunks === 'string') {
            let loschunks: any[] = [];
            parseado = JSON.parse(persistedSale.saleChunks)
            /*
            parseado = loschunks.map((chunk) => ({
                ...chunk,
                artisan: JSON.parse(chunk.artisan)
            })); */
        }
        parseado.map((chunk) => console.log("artiasn id:  " + chunk.artisan))
        const returnSale: Sale = new Sale({
            id: new Id(persistedSale.id),
            storeId: new Id(persistedSale.storeId),
            employeeId: new Id(persistedSale.employeeId),
            paymentMethod: new CreditCardMethod(1, 1),
            totalGrossAmount: persistedSale.totalGrossAmount,
            totalComission: persistedSale.totalComission,
            saleChunks: parseado.map((chunk) =>
                new SaleChunk({
                    artisan: new Artisan({
                        id: new Id(chunk.artisan.id?.value ?? chunk.artisan.id),
                        storeId: new Id(chunk.artisan.storeId),
                        name: chunk.artisan.name,
                        email: chunk.artisan.email,
                        comissionRate: chunk.artisan.comissionRate,
                        isActive: chunk.artisan.isActive

                    }),
                    items: chunk.items.map((item) =>
                        new SaleItem({
                            productId: new Id(item.productId?.value ?? item.productId),
                            quantity: item.quantity,
                            unitPrice: item.unitPrice
                        })
                    )
                }))

        });

        return returnSale;
    }

    async getAllSales(): Promise<Sale[]> {

        const salesPrisma: any[] = await this.prisma.sales.findMany();



        const returnSales: Sale[] = salesPrisma.map((salePrisma) => {
            let parseado: any[] = [];
            if (typeof salePrisma.saleChunks === 'string') {
                parseado = JSON.parse(salePrisma.saleChunks);

            }
            return new Sale({
                id: new Id(salePrisma.id),
                storeId: new Id(salePrisma.storeId),
                employeeId: new Id(salePrisma.employeeId),
                paymentMethod: new CreditCardMethod(1, 1),
                totalGrossAmount: salePrisma.totalGrossAmount,
                totalComission: salePrisma.totalComission,
                saleChunks: parseado.map((chunk) =>
                    new SaleChunk({
                        artisan: new Artisan({
                            id: new Id(chunk.artisan.id?.value ?? chunk.artisan.id),
                            storeId: new Id(chunk.artisan.storeId),
                            name: chunk.artisan.name,
                            email: chunk.artisan.email,
                            comissionRate: chunk.artisan.comissionRate,
                            isActive: chunk.artisan.isActive

                        }),
                        items: chunk.items.map((item) =>
                            new SaleItem({
                                productId: new Id(item.productId?.value ?? item.productId),
                                quantity: item.quantity,
                                unitPrice: item.unitPrice
                            })
                        )
                    }))

            })
        });

        return returnSales;

    }

    async getSale(id: Id): Promise<Sale> {
        if (!id) {
            throw new Error("No id in the request")
        }

        const salePrisma = await this.prisma.sales.findUnique({
            where: {
                id: id.getValue()!
            }
        });
        if (!salePrisma) {
            throw new Error("No sale found")
        }
        let parseado: any[] = [];
        if (typeof salePrisma.saleChunks === 'string') {
            parseado = JSON.parse(salePrisma.saleChunks)

        }

        const returnSale: Sale = new Sale({
            id: new Id(salePrisma.id),
            storeId: new Id(salePrisma.storeId),
            employeeId: new Id(salePrisma.employeeId),
            paymentMethod: new CreditCardMethod(1, 1),
            totalGrossAmount: salePrisma.totalGrossAmount,
            totalComission: salePrisma.totalComission,
            saleChunks: parseado.map((chunk) =>
                new SaleChunk({
                    artisan: new Artisan({
                        id: new Id(chunk.artisan.id?.value ?? chunk.artisan.id),
                        storeId: new Id(chunk.artisan.storeId),
                        name: chunk.artisan.name,
                        email: chunk.artisan.email,
                        comissionRate: chunk.artisan.comissionRate,
                        isActive: chunk.artisan.isActive

                    }),
                    items: chunk.items.map((item) =>
                        new SaleItem({
                            productId: new Id(item.productId?.value ?? item.productId),
                            quantity: item.quantity,
                            unitPrice: item.unitPrice
                        })
                    )
                }))

        });

        return returnSale;


    }

    async getSalesByStoreId(storeId: Id): Promise<Sale[]> {
        const salesPrisma: any[] = await this.prisma.sales.findMany({
            where: {
                storeId: storeId.getValue()
            }
        });



        const returnSales: Sale[] = salesPrisma.map((salePrisma) => {
            let parseado: any[] = [];
            if (typeof salePrisma.saleChunks === 'string') {
                parseado = JSON.parse(salePrisma.saleChunks);

            }
            return new Sale({
                id: new Id(salePrisma.id),
                storeId: new Id(salePrisma.storeId),
                employeeId: new Id(salePrisma.employeeId),
                paymentMethod: new CreditCardMethod(1, 1),
                totalGrossAmount: salePrisma.totalGrossAmount,
                totalComission: salePrisma.totalComission,
                saleChunks: parseado.map((chunk) =>
                    new SaleChunk({
                        artisan: new Artisan({
                            id: new Id(chunk.artisan.id?.value ?? chunk.artisan.id),
                            storeId: new Id(chunk.artisan.storeId),
                            name: chunk.artisan.name,
                            email: chunk.artisan.email,
                            comissionRate: chunk.artisan.comissionRate,
                            isActive: chunk.artisan.isActive

                        }),
                        items: chunk.items.map((item) =>
                            new SaleItem({
                                productId: new Id(item.productId?.value ?? item.productId),
                                quantity: item.quantity,
                                unitPrice: item.unitPrice
                            })
                        )
                    }))

            })
        });

        return returnSales;
    }

}