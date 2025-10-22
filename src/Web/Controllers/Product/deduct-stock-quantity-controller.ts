import { Body, Controller, Inject, Param, Put } from "@nestjs/common";
import { InvalidValueError } from "src/Core/Domain/Errors/InvalidValueError";
import { DeductStockUseCase } from "src/Core/Domain/UseCases/DeductStockUseCase";
import { Id } from "src/Core/Domain/ValueObjects/Id";
import { ResponseProductDTO } from "src/Web/DTOS/Product/ResponseProductDTO";

@Controller('products')
export class DeductStockQuantityController {
    constructor(@Inject() private useCase: DeductStockUseCase){}
    @Put(':id')
    async handle(@Param('id') id: string, @Body() quantity: number): Promise<ResponseProductDTO> {
        if (id.length < 1 || quantity < 1) {
            throw new InvalidValueError("Valores invalidos")
        }
        const product = await this.useCase.execute(new Id(id), quantity);
        const responseProduct: ResponseProductDTO = {
            id: product.id?.getValue()!,
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