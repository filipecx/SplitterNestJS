import { Body, Controller, Post } from "@nestjs/common";
import { Artisan } from "src/Core/Domain/Entities/Artisan";
import type { CreateArtisanDto } from "../../DTOS/Artisan/CreateArtisanDto";
import { AddArtisanUseCase } from "src/Core/Domain/UseCases/AddArtisanUseCase";
import type { ResponseArtisanDto } from "../../DTOS/Artisan/ResponseArtisanDto";
import { Id } from "src/Core/Domain/ValueObjects/Id";

@Controller('artisans')
export class CreateArtisanController {
    constructor(
        private createUsecase: AddArtisanUseCase
    ){}

    @Post()
    async handle(@Body() artisanData: CreateArtisanDto): Promise<ResponseArtisanDto> {
        const newArtisan = new Artisan(
            {
                storeId: new Id(artisanData.storeId),
                name: artisanData.name,
                email: artisanData.email,
                comissionRate: artisanData.comissionRate,
                isActive: artisanData.isActive
            }
        )
        const artisan = await this.createUsecase.execute(newArtisan);
        if (!artisan.id) {
            throw new Error("Não foi possível cadastrar artesão")
        }
        const responseDto: ResponseArtisanDto = {
            id: artisan.id.getValue(),
            storeId: artisan.storeId.getValue(),
            name: artisan.name,
            email: artisan.email,
            comissionRate: artisan.comissionRate,
            isActive: artisanData.isActive
        }

        return responseDto;
    }
}