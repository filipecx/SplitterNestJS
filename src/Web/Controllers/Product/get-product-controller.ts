import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ResponseProductDTO } from '../../DTOS/Product/ResponseProductDTO';
import { GetProductUseCase } from "src/Core/Domain/UseCases/GetProductUseCase";
import { ProductItem } from "src/Core/Domain/Entities/ProductItem";
import { Id } from "src/Core/Domain/ValueObjects/Id";

@Controller('products')
export class GetProductController {
    constructor( private getProductUsecase: GetProductUseCase){}

    @Get(':id')
    async handle(@Param('id') id: string): Promise<ResponseProductDTO> {
        const product: ProductItem = await this.getProductUsecase.execute(new Id(id));
        if (!product.id) {
            throw new Error("No product found")
        }
        const responseProduct: ResponseProductDTO = {
            id: product.id?.getValue(),
            storeId: product.storeId.getValue(),
            artisanId: product.artisanId.getValue(),
            name: product.name,
            price: product.price,
            barcode: product.barcode,
            stockQuantity: product.stockQuantity
        }
        return responseProduct;
    }

}