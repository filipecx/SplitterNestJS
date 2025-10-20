import { Sale } from "../../Core/Domain/Entities/Sale";
import { Id } from "../../Core/Domain/ValueObjects/Id";

export interface IntSaleRepository {
    create(sale: Sale): Promise<Sale>
    getAllSales(): Promise<Sale[]>
    getSale(id: Id): Promise<Sale> | null
}