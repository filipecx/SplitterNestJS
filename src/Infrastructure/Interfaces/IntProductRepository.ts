import { ProductItem } from "../../Core/Domain/Entities/ProductItem"
import { Id } from "../../Core/Domain/ValueObjects/Id"

export interface IntProductRepository {

    create(product: ProductItem): Promise<ProductItem>
    get(id: Id): Promise<ProductItem>
    getAll(): Promise<ProductItem[]>
    getAllActiveProducts(): Promise<ProductItem[]>
    getProductsByArtisanId(id: Id): Promise<ProductItem[]>
    update(product: ProductItem): Promise<ProductItem>
    updateMany(products: ProductItem[]): Promise<void>
    delete(id: Id): void
}