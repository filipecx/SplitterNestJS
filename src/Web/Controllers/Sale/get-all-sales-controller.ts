import { Controller, Get, Inject, Param } from "@nestjs/common";
import { Sale } from "src/Core/Domain/Entities/Sale";
import { GetAllSalesUseCase } from "src/Core/Domain/UseCases/Sales/GetAllSalesUseCase";
import { ResponseSaleDTO } from "src/Web/DTOS/Sale/SaleResponseDTO";

@Controller('sales')
export class GetAllSaleController {

    constructor(@Inject() private useCase: GetAllSalesUseCase){}

    @Get()
    async handle(): Promise<ResponseSaleDTO[]> {
        const sales: Sale[] = await this.useCase.execute();

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