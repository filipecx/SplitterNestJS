import { Controller, Get, Inject, Param } from "@nestjs/common";
import { Sale } from "src/Core/Domain/Entities/Sale";
import { GetSaleByIdUseCase } from "src/Core/Domain/UseCases/Sales/GetSaleByIdUseCase";
import { Id } from "src/Core/Domain/ValueObjects/Id";
import { ResponseSaleDTO } from "src/Web/DTOS/Sale/SaleResponseDTO";

@Controller('sales')
export class GetSaleController {

    constructor(@Inject() private useCase: GetSaleByIdUseCase){}

    @Get(':id')
    async handle(@Param('id') id: string): Promise<ResponseSaleDTO> {
        const sale: Sale = await this.useCase.execute(new Id(id));

        const response: ResponseSaleDTO = {
            id: sale.id?.getValue()!,
            storeId: sale.storeId.getValue(),
            employeeId: sale.employeeId.getValue(),
            paymentMethod: sale.paymentMethod,
            totalGrossAmount: sale.totalGrossAmount,
            totalComission: sale.totalComission,
            saleChunks: sale.saleChunks
        }

        return response;
    }
}