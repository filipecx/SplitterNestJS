export interface RequestProductDTO {
    id: string,
    storeId: string; //todo: change to Id VO
    artisanId: string;
    name: string;
    price: number;
    barcode: string;
    stockQuantity: number;
}