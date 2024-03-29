/*
  Warnings:

  - You are about to drop the column `createBy` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `public` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the `CollaboratorsOnApps` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EntryiesOnApps` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[key]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CollaboratorRole" AS ENUM ('MANAGER', 'GUEST', 'TRANSLATOR');

-- DropForeignKey
ALTER TABLE "CollaboratorsOnApps" DROP CONSTRAINT "CollaboratorsOnApps_appId_fkey";

-- DropForeignKey
ALTER TABLE "CollaboratorsOnApps" DROP CONSTRAINT "CollaboratorsOnApps_collaboratorId_fkey";

-- DropForeignKey
ALTER TABLE "EntryiesOnApps" DROP CONSTRAINT "EntryiesOnApps_appId_fkey";

-- DropForeignKey
ALTER TABLE "EntryiesOnApps" DROP CONSTRAINT "EntryiesOnApps_entryId_fkey";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "createBy",
DROP COLUMN "public",
ADD COLUMN     "appId" INTEGER,
ADD COLUMN     "creatorId" INTEGER;

-- DropTable
DROP TABLE "CollaboratorsOnApps";

-- DropTable
DROP TABLE "EntryiesOnApps";

-- CreateTable
CREATE TABLE "Collaborator" (
    "id" SERIAL NOT NULL,
    "role" "CollaboratorRole" NOT NULL,
    "userId" INTEGER NOT NULL,
    "appId" INTEGER NOT NULL,

    CONSTRAINT "Collaborator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entry_key_key" ON "Entry"("key");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("app_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("app_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
