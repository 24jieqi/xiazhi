/*
  Warnings:

  - You are about to drop the column `basedOnId` on the `Entry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_basedOnId_fkey";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "basedOnId";
