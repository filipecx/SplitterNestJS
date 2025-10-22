import { Controller, Delete, Inject, Param } from "@nestjs/common";
import { DeleteProductUseCase } from "src/Core/Domain/UseCases/DeleteProductUseCase";
import { Id } from "src/Core/Domain/ValueObjects/Id";


@Controller('products')
export class DeleteProductController {
    constructor(@Inject() private useCase: DeleteProductUseCase){}
    @Delete(':id')
    async handle(@Param('id') id: string): Promise<boolean> {
        if (id.length < 0) {
            throw new Error("No id found");
        }
        this.useCase.execute(new Id(id));
        return true;
    }
}