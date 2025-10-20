/*
  Warnings:

  - You are about to drop the column `chunks` on the `Sales` table. All the data in the column will be lost.
  - Added the required column `saleChunks` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "chunks",
ADD COLUMN     "saleChunks" JSONB NOT NULL;
