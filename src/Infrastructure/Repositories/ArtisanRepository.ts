import { Artisan, ArtisanProps } from "../../Core/Domain/Entities/Artisan"
import { Id } from "../../Core/Domain/ValueObjects/Id"
import { IntArtisanRepository } from "../Interfaces/IntArtisanRepository"
import { ArtisanMapper } from "../Mappers/ArtisanMapper"
import { PrismaService } from "src/prisma/prisma.service"
import { Injectable } from "@nestjs/common"

@Injectable()
export class ArtisanRepository implements IntArtisanRepository {
    constructor(private prisma: PrismaService){}

    async create(artisan: Artisan): Promise<Artisan> {
        const persistedArtisan = await this.prisma.artisans.create({
            data: {
                storeId: artisan.storeId.getValue(),
                name: artisan.name,
                email: artisan.email,
                comissionRate: artisan.comissionRate,
                isActive: artisan.isActive
            }
        });
        const artisanEntity = ArtisanMapper.toDomain(persistedArtisan);
        return artisanEntity;
    }
    async getAll(): Promise<Artisan[]> {
        const artisansDataList = await this.prisma.artisans.findMany();
        const artisans = ArtisanMapper.toDomainList(artisansDataList);
        return artisans;
    }
    async getArtisan(id: Id): Promise<Artisan> {
        const artisanData = await this.prisma.artisans.findUnique({
            where: {
                id: id.getValue()
            }
        });
        const artisanEntity = ArtisanMapper.toDomain(artisanData);
        return artisanEntity;
    }
    async getAllActiveArtisans(): Promise<Artisan[]> {
        const artisans = await this.prisma.artisans.findMany({
            where: {
                isActive: true
            }
        });
        const artisansList = ArtisanMapper.toDomainList(artisans);
        return artisansList;
    }
    async update(artisan: Artisan): Promise<Artisan> {
        const updatedArtisan = await this.prisma.artisans.update({
            where: {
                id: artisan.id?.getValue()
            },
            data: {
                name: artisan.name,
                email: artisan.email,
                comissionRate: artisan.comissionRate,
                isActive: artisan.isActive,
            }
        });
        const artisanEntity = ArtisanMapper.toDomain(updatedArtisan);
        return artisanEntity;
    }
    async delete(id: Id): Promise<void> {
        await this.prisma.artisans.delete({
            where: {
                id: id.getValue()
            }
        });
    }


}