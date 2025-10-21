import { InvalidValueError } from "../Errors/InvalidValueError";
import { Id } from "../ValueObjects/Id";

export interface UserProps {
    id?: Id,
    username: string,
    password: string
}

export class User {
    constructor(private userProps: UserProps) {
        this.validateUsername(userProps.username);
        this.validatePassword(userProps.password);
    }

    protected get id(): Id | undefined{
        return this.userProps.id;
    }

    protected get username(): string {
        return this.userProps.username;
    }

    protected get password(): string {
        return this.userProps.password
    }

    protected changeUsername(newUsername: string) {
        this.userProps.username = newUsername;
    }

    protected changePassword(newPassword: string) {
        this.userProps.password = newPassword;
    }

    protected validateUsername(username: string) {
        if (username.length < 3) {
            throw new InvalidValueError("O username deve ter pelo menos três caracteres");
        }
        if (username.length > 150) {
            throw new InvalidValueError("Pra quê um nome tão grande desse?");
        }
    }

    protected validatePassword(password: string) {
        if (password.length < 4) {
            throw new InvalidValueError("A senha deve ter pelo menos 4 caracteres");
        }
    }
}