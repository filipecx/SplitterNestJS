import { Inject, Injectable } from '@nestjs/common';
import type { IntArtisanRepository } from '../../../Infrastructure/Interfaces/IntArtisanRepository'
import { Artisan } from '../Entities/Artisan';

@Injectable()
export class AddArtisanUseCase {
    constructor(@Inject('IntArtisanRepository') private repository: IntArtisanRepository){}
    async execute(artisan: Artisan): Promise<Artisan> {
        
        const persistedArtisan = await this.repository.create(artisan);
        return persistedArtisan;
    }
}