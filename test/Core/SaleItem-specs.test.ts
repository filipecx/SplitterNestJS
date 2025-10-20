import { describe, it, expect, beforeEach } from "vitest"
import { SaleItem } from "../../src/Core/Domain/ValueObjects/SaleItem"
import { Id } from "../../src/Core/Domain/ValueObjects/Id"
import { InvalidValueError } from "../../src/Core/Domain/Errors/InvalidValueError"
import { DomainErrors } from "../../src/Core/Domain/Errors/DomainError"
describe('Sale Item value object creation tests', () => {



    it('should be able to create a sale item value object', () => {
        const id = new Id("prod-uuid-123");
        const saleItem = new SaleItem({productId: id, quantity: 3, unitPrice: 1050});
        expect(saleItem).toBeInstanceOf(SaleItem);
    })

    it('should NOT be able to create with quantity less or equal zero', () => {
        const id = new Id("prod-uuid-124");
        expect(() => new SaleItem({productId: id, quantity: -2, unitPrice: 1050})).toThrowError(DomainErrors);
    })

    it('should NOT be able to create with price less or equal to zero', () => {
        const id = new Id("prod-uuid-125");
        expect(() => new SaleItem({productId: id, quantity: 14, unitPrice: 0})).toThrowError(DomainErrors);
    })
})