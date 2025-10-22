import { Inject, Injectable } from '@nestjs/common';
import type { IntArtisanRepository } from '../../../Infrastructure/Interfaces/IntArtisanRepository'
import { Artisan } from '../Entities/Artisan';

@Injectable()
export class GetAllArtisanUseCase {
    constructor(@Inject('IntArtisanRepository') private repository: IntArtisanRepository){}

    async execute(): Promise<Artisan[]>{
        const artisans  = await this.repository.getAll();
        return artisans;
    }
}