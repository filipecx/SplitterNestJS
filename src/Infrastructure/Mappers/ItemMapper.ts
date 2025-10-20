import { Sale } from "src/Core/Domain/Entities/Sale";

export class ItemMapper {
    static toEntity(sale: Sale) {
        if (!sale) {
            throw new Error("No sale found")
        }
        const items = sale.saleChunks.map((salechunk) => ({
            items: salechunk.items.map((item) => ({
                productId: item.getProductId().getValue(),
                quantity: item.getQuantity(),
                price: item.getPrice(),
            })),
        }));
        return items;
    }
}