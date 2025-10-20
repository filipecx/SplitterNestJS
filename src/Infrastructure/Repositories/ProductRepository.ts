import { ProductItem } from "src/Core/Domain/Entities/ProductItem";
import { Id } from "src/Core/Domain/ValueObjects/Id";
import { IntProductRepository } from "../Interfaces/IntProductRepository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductRepository implements IntProductRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(product: ProductItem): Promise<ProductItem> {
        const persistedProduct: any = await this.prisma.products.create({
            data: {
                storeId: product.storeId.getValue(),
                artisanId: product.artisanId.getValue(),
                name: product.name,
                price: product.price,
                barcode: product.barcode,
                stockQuantity: product.stockQuantity
            }
        });
        const responseProduct: ProductItem = new ProductItem({
            id: new Id(persistedProduct.id),
            storeId: new Id(persistedProduct.storeId),
            artisanId: new Id(persistedProduct.artisanId),
            name: persistedProduct.name,
            price: persistedProduct.price,
            barcode: persistedProduct.barcode,
            stockQuantity: persistedProduct.stockQuantity
        });

        return responseProduct;
    }
    async get(id: Id): Promise<ProductItem> {
        const persistedProduct = await this.prisma.products.findUnique({
            where: {
                id: id.getValue()
            }
        })
        if (!persistedProduct) {
            throw new Error("No product found by this id");
        }
        const product: ProductItem = new ProductItem({
            id: new Id(persistedProduct.id),
            storeId: new Id(persistedProduct.storeId),
            artisanId: new Id(persistedProduct.artisanId),
            name: persistedProduct.name,
            price: persistedProduct.price,
            barcode: persistedProduct.barcode,
            stockQuantity: persistedProduct.stockQuantity
        })
        return product
    }
    async getAll(): Promise<ProductItem[]> {
        const productsData = await this.prisma.products.findMany();
        const products = productsData.map((product) => {
            return new ProductItem({
                id: new Id(product.id),
                storeId: new Id(product.storeId),
                artisanId: new Id(product.artisanId),
                name: product.name,
                price: product.price,
                barcode: product.barcode,
                stockQuantity: product.stockQuantity
            })
        })
        return products;
    }
    getAllActiveProducts(): Promise<ProductItem[]> {
        throw new Error("Method not implemented.");
    }
    getProductsByArtisanId(id: Id): Promise<ProductItem[]> {
        throw new Error("Method not implemented.");
    }
    update(product: ProductItem): Promise<ProductItem> {
        throw new Error("Method not implemented.");
    }
    async updateMany(products: ProductItem[]): Promise<void> {
        for (const product of products) {
            if (!product.id) {
                throw new Error("Nenhum produto encontrado com esse id")
            }
            await this.prisma.products.updateMany({
                where: { id: product.id.getValue() },
                data: { stockQuantity: product.stockQuantity }
            });
        }

        /*
        products.forEach(async (product) => {
            await this.prisma.products.updateMany({
                where: { id: product.id.getValue() },
                data: { stockQuantity: product.stockQuantity }
            });
        });*/
    }
    delete(id: Id): void {
        throw new Error("Method not implemented.");
    }

}