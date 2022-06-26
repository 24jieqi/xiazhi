/*
  Warnings:

  - You are about to drop the column `language` on the `App` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "App" DROP COLUMN "language",
ADD COLUMN     "languages" "LanguageType"[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "nickName" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;
