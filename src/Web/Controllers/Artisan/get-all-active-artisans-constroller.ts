import { Controller, Get, Inject } from "@nestjs/common";
import { GetAllAcitveArtisansUseCase } from "src/Core/Domain/UseCases/GetAllActiveArtisansUseCase";
import { ResponseArtisanDto } from "src/Web/DTOS/Artisan/ResponseArtisanDto";

@Controller('artisans')
export class GetAllActiveArtisanController {
    constructor( private useCase: GetAllAcitveArtisansUseCase){}
    @Get('/active')
    async handle(): Promise<ResponseArtisanDto[]> {
        const artisansList = await this.useCase.execute();

        const responseList: ResponseArtisanDto[] = artisansList.map((artisan) => ({
            id: artisan.id?.getValue(),
            storeId: artisan.storeId.getValue(),
            name: artisan.name,
            email: artisan.email,
            comissionRate: artisan.comissionRate,
            isActive: artisan.isActive
        }));

        return responseList;
    }
}