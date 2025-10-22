import { Body, Controller, Inject, Param, Put } from "@nestjs/common";
import type { CreateArtisanDto } from "../../DTOS/Artisan/CreateArtisanDto";
import { UpdateArtisanUseCase } from "src/Core/Domain/UseCases/UpdateArtisanUseCase";
import { Artisan } from "src/Core/Domain/Entities/Artisan";
import { Id } from "src/Core/Domain/ValueObjects/Id";
import { ResponseArtisanDto } from "../../DTOS/Artisan/ResponseArtisanDto";

@Controller('artisans')
export class UpdateArtisanStatusController {
    constructor(@Inject('UpdateArtisanUseCase') private useCase: UpdateArtisanUseCase){}
    @Put('changeStatus/:id')
    async handle(@Param('id') id: string, @Body() artisanData: CreateArtisanDto): Promise<ResponseArtisanDto> {
        if (!artisanData) {
            throw new Error("No artisan data found")
        }
        const artisanToUpdate: Artisan = new Artisan({
            id: new Id(id),
            storeId: new Id(artisanData.storeId),
            name: artisanData.name,
            email: artisanData.email,
            comissionRate: artisanData.comissionRate,
            isActive: artisanData.isActive

        })
        const updatedArtisan: Artisan = await this.useCase.execute(artisanToUpdate)

        const artisanResponse: ResponseArtisanDto = {
            id: updatedArtisan.id?.getValue(),
            storeId: updatedArtisan.storeId.getValue(),
            name: updatedArtisan.name,
            email: updatedArtisan.email,
            comissionRate: updatedArtisan.comissionRate,
            isActive: updatedArtisan.isActive
        }
        return artisanResponse;
    }
}