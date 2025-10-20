import { InvalidValueError } from "../Errors/InvalidValueError";
import { Id } from "../ValueObjects/Id";

type Address = {
    street: string,
    number: number
}

export interface StoreProps {
    id: Id,
    name: string,
    address: Address
}

export class Store {
    constructor(private storeProps: StoreProps){
        this.validateAddress(storeProps.address);
    }

    public id(): Id {
        return this.storeProps.id;
    }

    public name(): string {
        return this.storeProps.name;
    }

    public address(): Address {
        return this.storeProps.address;
    }

    public changeAddress(newAddress: Address) {
        this.storeProps.address = newAddress;
    }

    private validateAddress(address: Address) {
        if (address.street.length <= 0) {
            throw new InvalidValueError("Você deve inserir o nome da rua")
        }
        if (!address.number) {
            throw new InvalidValueError("Você deve inserri um número")
        }
    }

}