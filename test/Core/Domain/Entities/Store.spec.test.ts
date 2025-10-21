import { Store } from "src/Core/Domain/Entities/Store";
import { InvalidValueError } from "src/Core/Domain/Errors/InvalidValueError";
import { describe, it, beforeEach, expect } from "vitest";

describe('store success creation tests', () => {
    it('should be able to create a store', () => {
        const newStore = new Store({
            username: "user",
            password: "1234",
            name: "Great Store",
            address: { street: "Rua. Abc", number: 123 }
        });

        expect(newStore).toBeInstanceOf(Store);
    })
})

describe('store failed creation tests', () => {
    it('should throw Invalid Value Error for invalid username', () => {
        expect(() => new Store({
            username: 'ab',
            password: "1234",
            name: "Great Store",
            address: { street: "Rua. Abc", number: 123 }
        })).toThrow("O username deve ter pelo menos três caracteres");
    });

    it('should throw Invalid Value Error for invalid password', () => {
        expect(() => new Store({
            username: 'abc',
            password: "123",
            name: "Great Store",
            address: { street: "Rua. Abc", number: 123 }
        })).toThrow("A senha deve ter pelo menos 4 caracteres");
    });
    
});

describe('store failed update tests', () => {
    let store: Store;

    beforeEach(() => {
        store = new Store({
            username: "user",
            password: "1234",
            name: "Great Store",
            address: { street: "Rua. Abc", number: 123 }
        });
    });

    it('should throw invalid value error at change street name', () => {
        expect(() => store.changeAddress({ street: '', number: 123 })).toThrow("Você deve inserir o nome da rua");
    });
    it('should throw invalid value error at change address number', () => {
        expect(() => store.changeAddress({ street: "Rua. Abc", number: 0})).toThrow("Você deve inserir um número");
    })
})