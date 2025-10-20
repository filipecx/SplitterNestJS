import { IntArtisanRepository } from "../../../Infrastructure/Interfaces/IntArtisanRepository";
import { Artisan } from "../Entities/Artisan";
import { NotFoundError } from "./Errors/NotFoundError";

export class UpdateArtisanUseCase {
    constructor(private repository: IntArtisanRepository){}

    async execute(artisan: Artisan): Promise<Artisan> {
        const art = await this.repository.getArtisan(artisan.id!);
        if (!art) {
            throw new NotFoundError("Nenhum artesão com esse id encontrado")
        }
        const updatedArtisan = this.repository.update(artisan)
        return updatedArtisan;
    }
}