/*
  Warnings:

  - The `languages` column on the `App` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mainLang` column on the `Entry` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "App" DROP COLUMN "languages",
ADD COLUMN     "languages" TEXT[];

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "mainLang",
ADD COLUMN     "mainLang" TEXT[];

-- DropEnum
DROP TYPE "LanguageType";
