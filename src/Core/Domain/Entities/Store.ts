import { InvalidValueError } from "../Errors/InvalidValueError";
import { User, UserProps } from "./User";

type Address = {
    street: string,
    number: number
}

export interface StoreProps extends UserProps{
    name: string,
    address: Address
}

export class Store extends User{
    constructor(private storeProps: StoreProps){
        super(storeProps);
        this.validateAddress(storeProps.address);
    }

    get name(): string {
        return this.storeProps.name;
    }

    get address(): Address {
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
            throw new InvalidValueError("Você deve inserir um número")
        }
    }

}