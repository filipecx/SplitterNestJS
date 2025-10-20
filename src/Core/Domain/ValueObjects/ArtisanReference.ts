import { Id } from "./Id";

export interface ArtisanReferenceProps {
    id: Id;
    storeId: Id;
    comissionRate: number;
    isActive: boolean;
}

export class ArtisanReference {
    constructor(private artisanReferenceProps: ArtisanReferenceProps) {}

    isActive(): boolean {
        return this.artisanReferenceProps.isActive;
    }

    get id(): Id {
        return this.artisanReferenceProps.id;
    }

    get storeId(): Id {
        return this.artisanReferenceProps.storeId;
    }

    get comissionRate(): number {
        return this.artisanReferenceProps.comissionRate;
    }

}