import { Body, Controller, Inject, Param, Put } from "@nestjs/common";
import { ProductItem } from "src/Core/Domain/Entities/ProductItem";
import { UpdateProductUseCase } from "src/Core/Domain/UseCases/UpdateProductUseCase";
import { Id } from "src/Core/Domain/ValueObjects/Id";
import type { RequestProductDTO } from "src/Web/DTOS/Product/RequestProductDTO";
import { ResponseProductDTO } from "src/Web/DTOS/Product/ResponseProductDTO";

@Controller('products')
export class UpdateProductController {
    constructor(@Inject() private useCase: UpdateProductUseCase){}
    @Put(':id')
    async handle(@Param('id') id: string, @Body() productData: RequestProductDTO): Promise<ResponseProductDTO> {
        const productToUpdate: ProductItem = new ProductItem({
            id: new Id(productData.id),
            storeId: new Id(productData.storeId),
            artisanId: new Id(productData.artisanId),
            name:productData.name,
            price: productData.price,
            barcode: productData.barcode,
            stockQuantity: productData.stockQuantity
        })
        const updatedProduct: ProductItem = await this.useCase.execute(productToUpdate);

        const responseProduct: ResponseProductDTO = {
            id: updatedProduct.id?.getValue()!,
            storeId: updatedProduct.storeId.getValue(),
            artisanId: updatedProduct.artisanId.getValue(),
            name:updatedProduct.name,
            price: updatedProduct.price,
            barcode: updatedProduct.barcode,
            stockQuantity: updatedProduct.stockQuantity
        }

        return responseProduct;
    }
}