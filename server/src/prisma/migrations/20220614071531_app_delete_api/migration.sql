/*
  Warnings:

  - You are about to drop the column `api` on the `App` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "App" DROP COLUMN "api",
ADD COLUMN     "push" BOOLEAN NOT NULL DEFAULT true;
