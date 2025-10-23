import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ArtisanRepository } from './Infrastructure/Repositories/ArtisanRepository';
import { CreateArtisanController } from './Web/Controllers/Artisan/create-artisan-controller';
import { AddArtisanUseCase } from './Core/Domain/UseCases/AddArtisanUseCase';
import { RegisterSaleUseCase } from './Core/Domain/UseCases/Sales/RegisterSaleUseCase';
import { SaleRepository } from './Infrastructure/Repositories/SaleRepository';
import { ProductRepository } from './Infrastructure/Repositories/ProductRepository';
import { PaymentMethodFactory } from './Infrastructure/Factories/PaymentMethodFactory';
import { RabbitProducer } from './Infrastructure/Communication/RabbitMQPublisher';
import { SendSaleController } from './Web/Controllers/Sale/send-sale-controller';
import { CreateProductController } from './Web/Controllers/Product/create-product-controller';
import { AddProductItemUseCase } from './Core/Domain/UseCases/AddProductItemUseCase';
import { GetAllProductsUseCase } from './Core/Domain/UseCases/GetAllProductsUseCase';
import { GetArtisanUseCase } from './Core/Domain/UseCases/GetArtisanUseCase';
import { ChunkMapper } from './Infrastructure/Mappers/SaleChunkMapper';
import { QRCodeGenerator } from './Infrastructure/QRCode/qrCodeGenerator';
import { GetProductController } from './Web/Controllers/Product/get-product-controller';
import { GetProductUseCase } from './Core/Domain/UseCases/GetProductUseCase';
import { GetAllProductsController } from './Web/Controllers/Product/get-allProducts-controller';
import { UpdateArtisanController } from './Web/Controllers/Artisan/update-artisan-controller';
import { UpdateArtisanStatusController } from './Web/Controllers/Artisan/change-artisan-status-controller';
import { DeleteArtisanController } from './Web/Controllers/Artisan/delete-artisan-controller';
import { GetAllArtisanController } from './Web/Controllers/Artisan/get-all-artisan-controller';
import { GetAllActiveArtisanController } from './Web/Controllers/Artisan/get-all-active-artisans-constroller';
import { GetAllArtisanUseCase } from './Core/Domain/UseCases/GetAllArtisanUseCase';
import { GetAllAcitveArtisansUseCase } from './Core/Domain/UseCases/GetAllActiveArtisansUseCase';
import { DeleteArtisanUseCase } from './Core/Domain/UseCases/DeleteArtisanUseCase';
import { UpdateArtisanUseCase } from './Core/Domain/UseCases/UpdateArtisanUseCase';
import { UpdateProductUseCase } from './Core/Domain/UseCases/UpdateProductUseCase';
import { UpdateProductController } from './Web/Controllers/Product/update-product-controller';
import { DeleteProductController } from './Web/Controllers/Product/delete-product-controller';
import { DeleteProductUseCase } from './Core/Domain/UseCases/DeleteProductUseCase';
import { DeductStockQuantityController } from './Web/Controllers/Product/deduct-stock-quantity-controller';
import { DeductStockUseCase } from './Core/Domain/UseCases/DeductStockUseCase';
import { GetSaleController } from './Web/Controllers/Sale/get-sale-controller';
import { GetSaleByIdUseCase } from './Core/Domain/UseCases/Sales/GetSaleByIdUseCase';
import { GetAllSalesUseCase } from './Core/Domain/UseCases/Sales/GetAllSalesUseCase';
import { GetAllSaleController } from './Web/Controllers/Sale/get-all-sales-controller';
import { GetSalesByStoreIdUseCase } from './Core/Domain/UseCases/Sales/GetSalesByStoreIdUseCase';
import { GetSaleByStoreIdController } from './Web/Controllers/Sale/get-sales-by-storeid-controller';

@Module({
  imports: [],
  controllers: [
    CreateArtisanController, 
    UpdateArtisanController, 
    UpdateArtisanStatusController,
    DeleteArtisanController,
    GetAllArtisanController,
    GetAllActiveArtisanController, 
    SendSaleController, 
    GetSaleController,
    GetAllSaleController,
    GetSaleByStoreIdController,
    CreateProductController, 
    GetProductController, 
    GetAllProductsController,
    UpdateProductController,
    DeleteProductController,
    DeductStockQuantityController,
  ],
  providers: [
    PrismaService, 
    AddArtisanUseCase, 
    GetArtisanUseCase,
    GetAllArtisanUseCase,
    GetAllAcitveArtisansUseCase,
    DeleteArtisanUseCase,
    UpdateArtisanUseCase,
    RegisterSaleUseCase,
    GetSaleByIdUseCase,
    GetAllSalesUseCase,
    GetSalesByStoreIdUseCase,
    AddProductItemUseCase,
    GetAllProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    DeductStockUseCase,   
    ChunkMapper,
    QRCodeGenerator,
    GetProductUseCase,
    {
      provide: "IntSaleRepository",
      useClass: SaleRepository
    },
    {
      provide: "IntArtisanRepository",
      useClass: ArtisanRepository
    },
    {
      provide: "IntProductRepository",
      useClass: ProductRepository
    },
    {
      provide: "IntPaymentMethod",
      useClass: PaymentMethodFactory
    },
    {
      provide: "IntMessagePublisher",
      useClass: RabbitProducer
    }
  ],
  exports: ['IntProductRepository']
})
export class AppModule {}
