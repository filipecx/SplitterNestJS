export interface RegisterSaleRequestDTO{
        storeId: string;
        emloyeeId: string;
        paymentMethod: string;
        paymentDetails: {instalments: number, feeRate: number}
        totalGrossAmount: number;
        items: {id: string, quantity: number}[];
}