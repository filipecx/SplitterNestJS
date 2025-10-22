import { Inject, Injectable } from '@nestjs/common';
import type { IntArtisanRepository } from '../../../Infrastructure/Interfaces/IntArtisanRepository'
import { Id } from '../ValueObjects/Id';
import { NotFoundError } from './Errors/NotFoundError'

@Injectable()
export class DeleteArtisanUseCase {
    constructor(@Inject('IntArtisanRepository') private repository: IntArtisanRepository){}

    async execute(id: Id): Promise<void> {
        const existes = this.repository.getArtisan(id);
        if (!existes) {
            throw new NotFoundError('Nenhum artesão com esse id encontrado')
        }
        this.repository.delete(id);
    }
}