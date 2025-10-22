import { Body, Controller, Get, Post } from "@nestjs/common";
import type { CreateProductDTO } from "../../DTOS/Product/CreateProductDTO";
import { AddProductItemUseCase } from "src/Core/Domain/UseCases/AddProductItemUseCase";
import { ProductItem } from "src/Core/Domain/Entities/ProductItem";
import { GetAllProductsUseCase } from "src/Core/Domain/UseCases/GetAllProductsUseCase";
import { Id } from "src/Core/Domain/ValueObjects/Id";

@Controller('products')
export class CreateProductController {
    constructor(private addProduct: AddProductItemUseCase, private getAllProducts: GetAllProductsUseCase){}

    @Post()
    async post(@Body() product: CreateProductDTO) {
        
        const newProduct = new ProductItem({
            storeId: new Id(product.storeId),
            artisanId: new Id(product.artisanId),
            name: product.name,
            price: product.price,
            barcode: product.barcode,
            stockQuantity: product.stockQuantity
        })
        await this.addProduct.execute(newProduct);
    }

    @Get()
    async get(): Promise<ProductItem[]> {
        const products: ProductItem[] = await this.getAllProducts.execute();
        return products;
    }
}