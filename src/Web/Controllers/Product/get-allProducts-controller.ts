import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ResponseProductDTO } from '../../DTOS/Product/ResponseProductDTO';
import { ProductItem } from "src/Core/Domain/Entities/ProductItem";
import { Id } from "src/Core/Domain/ValueObjects/Id";
import { GetAllProductsUseCase } from "src/Core/Domain/UseCases/GetAllProductsUseCase";

@Controller('products')
export class GetAllProductsController {
    constructor(@Inject() private getAllProducstUsecase: GetAllProductsUseCase){}

    @Get()
    async handle(): Promise<ResponseProductDTO[]> {
        const products: ProductItem[] = await this.getAllProducstUsecase.execute();
        if (products.length < 1) {
            throw new Error("No product found")
        }
        const responseProduct: ResponseProductDTO[] = products.map((product) => ({
            id: product.id?.getValue()!,
            storeId: product.storeId.getValue(),
            artisanId: product.artisanId.getValue(),
            name: product.name,
            price: product.price,
            barcode: product.barcode,
            stockQuantity: product.stockQuantity
    }))
        return responseProduct;
    }

}