import { IntArtisanRepository } from '../../../Infrastructure/Interfaces/IntArtisanRepository'
import { Artisan } from '../Entities/Artisan';

export class GetAllArtisanUseCase {
    constructor(private repository: IntArtisanRepository){}

    async execute(): Promise<Artisan[]>{
        const artisans  = await this.repository.getAll();
        return artisans;
    }
}