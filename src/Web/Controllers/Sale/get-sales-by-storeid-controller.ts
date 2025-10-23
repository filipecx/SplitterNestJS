import { Controller, Get, Inject, Param } from "@nestjs/common";
import { Sale } from "src/Core/Domain/Entities/Sale";
import { GetSalesByStoreIdUseCase } from "src/Core/Domain/UseCases/Sales/GetSalesByStoreIdUseCase";
import { Id } from "src/Core/Domain/ValueObjects/Id";
import { ResponseSaleDTO } from "src/Web/DTOS/Sale/SaleResponseDTO";

@Controller('sales')
export class GetSaleByStoreIdController {

    constructor(private useCase: GetSalesByStoreIdUseCase){}

    @Get('/storeid/:id')
    async handle(@Param('id') id: string): Promise<ResponseSaleDTO[]> {
        const sales: Sale[] = await this.useCase.execute(new Id(id));

        const response: ResponseSaleDTO[] = sales.map((sale) => ({
            id: sale.id?.getValue()!,
            storeId: sale.storeId.getValue(),
            employeeId: sale.employeeId.getValue(),
            paymentMethod: sale.paymentMethod,
            totalGrossAmount: sale.totalGrossAmount,
            totalComission: sale.totalComission,
            saleChunks: sale.saleChunks
        }))

        return response;
    }
}