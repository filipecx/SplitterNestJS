import { Id } from "src/Core/Domain/ValueObjects/Id";
import { Artisan, ArtisanProps } from "../../Core/Domain/Entities/Artisan";

export class ArtisanMapper {
    static toDomain(artisanData: any): Artisan {
        if (!artisanData) {
            throw new Error("No artisan data")
        }
        const artisanDomain: Artisan = new Artisan({
            id: new Id(artisanData.id),
            storeId: new Id(artisanData.storeId),
            name: artisanData.name,
            email: artisanData.email,
            comissionRate: artisanData.comissionRate,
            isActive: artisanData.isActive,
        });
        return artisanDomain;
    }

    static toDomainList(artisanData: any[]): Artisan[] {
        return artisanData.map((artisan) => {
            return new Artisan({
                id: new Id(artisan.id),
                storeId: new Id(artisan.storeId),
                name: artisan.name,
                email: artisan.email,
                comissionRate: artisan.comissionRate,
                isActive: artisan.isActive,
            })
        })
    }
}