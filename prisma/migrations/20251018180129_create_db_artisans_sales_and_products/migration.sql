-- CreateTable
CREATE TABLE "Artisans" (
    "id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "comission_rate" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Artisans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "artisan_id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "barcode" TEXT NOT NULL,
    "stock_quantity" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sales" (
    "id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "total_gross_amount" INTEGER NOT NULL,
    "total_comission" INTEGER NOT NULL,
    "items" JSONB NOT NULL,
    "chunks" JSONB NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_artisan_id_key" ON "Products"("artisan_id");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_artisan_id_fkey" FOREIGN KEY ("artisan_id") REFERENCES "Artisans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
