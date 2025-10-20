import { Id } from "../../../Core/Domain/ValueObjects/Id";


export interface CreateArtisanDto {
    id?: string;
    storeId: string;
    name: string;
    email: string;
    comissionRate: number;
    isActive: boolean
}
