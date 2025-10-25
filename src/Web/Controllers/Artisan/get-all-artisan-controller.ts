import { Controller, Get, Inject } from "@nestjs/common";
import { GetAllArtisanUseCase } from "src/Core/Domain/UseCases/GetAllArtisanUseCase";
import { ResponseArtisanDto } from "src/Web/DTOS/Artisan/ResponseArtisanDto";

@Controller('artisans')
export class GetAllArtisanController {
    constructor(private useCase: GetAllArtisanUseCase){}
    @Get()
    async handle(): Promise<ResponseArtisanDto[]> {
        const artisansList = await this.useCase.execute();
        if (artisansList.length < 1) {
            throw new Error("No artisan found")
        }
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