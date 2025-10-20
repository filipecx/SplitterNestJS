import { describe, it, expect, beforeEach } from "vitest"
import { Id } from "../../src/Core/Domain/ValueObjects/Id"
import { ArtisanReference } from "../../src/Core/Domain/ValueObjects/ArtisanReference"


describe('artisan reference creation tests', () => {
    let artisanId: Id;
    let storeId: Id;
    beforeEach(() => {
        artisanId = new Id("uuid-artisanid-123");
        storeId  = new Id("uuid-artisanid-124");
    })
    it('should be able to create an artisan reference', () => {
        //Id, storeid, comissionreate, iscative
        
        const artisanref = new ArtisanReference({id: artisanId, storeId: storeId, comissionRate: 0.2, isActive: true})
        expect(artisanref).toBeInstanceOf(ArtisanReference);
    })
    
})