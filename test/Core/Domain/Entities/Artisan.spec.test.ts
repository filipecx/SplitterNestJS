import { Artisan } from "src/Core/Domain/Entities/Artisan";
import { Id } from "src/Core/Domain/ValueObjects/Id";
import { describe, expect, it, beforeEach } from "vitest";

describe('creation tests', () => {
    it('should succesfully create a new artisan', () => {
        const artisan: Artisan = new Artisan({
            name: "Maze",
            storeId: new Id("store-id-uuid-123"),
            email: "mariajose@email.com",
            comissionRate: 10,
            isActive: true
        });

        expect(artisan).toBeInstanceOf(Artisan);
    })
})

describe('changin attributes tests', () => {
    let artisan: Artisan;
    beforeEach(() => {
        artisan = new Artisan({
            name: "Maze",
            storeId: new Id("store-id-uuid-123"),
            email: "mariajose@email.com",
            comissionRate: 10,
            isActive: true
        });
    })
    it('should be able to change artisan status', () => {
        expect(true).toEqual(artisan.isActive);
        artisan.changeActive()
        expect(artisan.isActive).toBeFalsy
        artisan.changeActive()
        expect(artisan.isActive).toBeTruthy
    });
    it('should be able to change store commission over artisan', () => {
        artisan.changeComissionRate(15);
        expect(artisan.comissionRate).toEqual(15);
    });
    it('should throw invalid value error', () => {
        expect(() => artisan.changeComissionRate(-10)).toThrow("A comissão da loja não pode ser zero ou menor que zero");
    });
})
