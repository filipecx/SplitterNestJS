import { Inject, Injectable } from "@nestjs/common";
import type { IntArtisanRepository } from "src/Infrastructure/Interfaces/IntArtisanRepository";
import { Artisan } from "../Entities/Artisan";
import { NotFoundError } from "./Errors/NotFoundError";

@Injectable()
export class UpdateArtisanUseCase {
    constructor(@Inject('IntArtisanRepository') private repository: IntArtisanRepository){}

    async execute(artisan: Artisan): Promise<Artisan> {
        const art = await this.repository.getArtisan(artisan.id!);
        if (!art) {
            throw new NotFoundError("Nenhum artesão com esse id encontrado")
        }
        const updatedArtisan = this.repository.update(artisan)
        return updatedArtisan;
    }
}