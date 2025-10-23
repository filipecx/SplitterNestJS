import { Controller, Delete, Inject, Param } from "@nestjs/common";
import { DeleteArtisanUseCase } from "src/Core/Domain/UseCases/DeleteArtisanUseCase";
import { Id } from "src/Core/Domain/ValueObjects/Id";

@Controller('artisans')
export class DeleteArtisanController {
    constructor(private useCase: DeleteArtisanUseCase){}

    @Delete(':id')
    async handle(@Param('id') id: string): Promise<boolean> {
        if (id.length < 0) {
            throw new Error("No id present")
        }
        await this.useCase.execute(new Id(id));

        return true;
    }
}