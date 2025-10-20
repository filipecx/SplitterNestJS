import { Body, Controller, Post } from "@nestjs/common";
import { Sale } from "src/Core/Domain/Entities/Sale";
import type { RegisterSaleRequestDTO } from "src/Core/Domain/UseCases/DTOs/RegisterSaleRequestDTO";
import { RegisterSaleUseCase } from "src/Core/Domain/UseCases/Sales/RegisterSaleUseCase";

@Controller('sales')
export class SendSaleController {
    constructor(private registerSaleUsecase: RegisterSaleUseCase) { }

    @Post()
    async handle(@Body() sale: RegisterSaleRequestDTO) {
        this.registerSaleUsecase.execute(sale);
    }

}