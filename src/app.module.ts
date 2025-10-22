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
import { SendSaleController } from './Web/Controllers/send-sale-controller';
import { CreateProductController } from './Web/Controllers/create-product-controller';
import { AddProductItemUseCase } from './Core/Domain/UseCases/AddProductItemUseCase';
import { GetAllProductsUseCase } from './Core/Domain/UseCases/GetAllProductsUseCase';
import { GetArtisanUseCase } from './Core/Domain/UseCases/GetArtisanUseCase';
import { ChunkMapper } from './Infrastructure/Mappers/SaleChunkMapper';
import { QRCodeGenerator } from './Infrastructure/QRCode/qrCodeGenerator';
import { GetProductController } from './Web/Controllers/get-product-controller';
import { GetProductUseCase } from './Core/Domain/UseCases/GetProductUseCase';
import { GetAllProductsController } from './Web/Controllers/get-allProducts-controller';

@Module({
  imports: [],
  controllers: [CreateArtisanController, SendSaleController, CreateProductController, GetProductController, GetAllProductsController],
  providers: [
    PrismaService, 
    AddArtisanUseCase, 
    RegisterSaleUseCase,
    AddProductItemUseCase,
    GetAllProductsUseCase,
    GetArtisanUseCase,
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
