import { IntArtisanRepository } from "../../../Infrastructure/Interfaces/IntArtisanRepository";
import { Artisan } from "../Entities/Artisan";
import { Id } from "../ValueObjects/Id";
import { NotFoundError } from "./Errors/NotFoundError";

export class GetArtisanUseCase {
    constructor(private repository: IntArtisanRepository){}

    async execute(id: Id): Promise<Artisan> {
        const artisan = this.repository.getArtisan(id);
        if (!artisan) {
            throw new NotFoundError('Nenhum artesão com esse id encontrado');
        }
        return artisan;
    }
}