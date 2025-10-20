import { Artisan } from '../../Core/Domain/Entities/Artisan'
import { Id } from '../../Core/Domain/ValueObjects/Id';

export interface IntArtisanRepository {
    create(artisan: Artisan): Promise<Artisan>;
    getAll(): Promise<Artisan[]>;
    getArtisan(id: Id): Promise<Artisan>;
    getAllActiveArtisans(): Promise<Artisan[]>
    update(artisan: Artisan): Promise<Artisan>;
    delete(id: Id): void;
}