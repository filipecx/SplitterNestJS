import { IntArtisanRepository } from '../../../Infrastructure/Interfaces/IntArtisanRepository'
import { Artisan } from '../Entities/Artisan';
export class GetAllAcitveArtisansUseCase {
    constructor(private repository: IntArtisanRepository){}

    async execute(): Promise<Artisan[]> {
        const artisans = await this.repository.getAllActiveArtisans();
        return artisans;
    }
}