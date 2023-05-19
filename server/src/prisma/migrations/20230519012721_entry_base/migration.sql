/*
  Warnings:

  - A unique constraint covering the columns `[basedOnId]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Entry_key_key";

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "basedOnId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Entry_basedOnId_key" ON "Entry"("basedOnId");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_basedOnId_fkey" FOREIGN KEY ("basedOnId") REFERENCES "Entry"("entry_id") ON DELETE SET NULL ON UPDATE CASCADE;
