import { InvalidValueError } from "../Errors/InvalidValueError";
import { Id } from "../ValueObjects/Id";

export interface ArtisanProps {
    id?: Id;
    storeId: Id;
    name: string;
    email: string;
    comissionRate: number;
    isActive: boolean
}

export class Artisan {
    constructor(private artisanProps: ArtisanProps){}

    get id(): Id | undefined {
        return this.artisanProps.id;
    }

    get storeId(): Id {
        return this.artisanProps.storeId;
    }

    get name(): string {
        return this.artisanProps.name;
    }

    get email(): string {
        return this.artisanProps.email;
    }

    get comissionRate(): number {
        return this.artisanProps.comissionRate;
    }

    get isActive(): boolean {
        return this.artisanProps.isActive;
    }

    changeActive(): void {
        this.artisanProps.isActive = !this.artisanProps.isActive;
    }

    changeComissionRate(newComissionRate: number): void {
        if (newComissionRate <= 0) {
            throw new InvalidValueError("A comissão da loja não pode ser zero ou menor que zero")
        }
        this.artisanProps.comissionRate = newComissionRate;
    }
}