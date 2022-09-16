/*
  Warnings:

  - You are about to drop the column `appApp_id` on the `Entry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_appApp_id_fkey";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "appApp_id";

-- CreateTable
CREATE TABLE "EntryiesOnApps" (
    "appId" INTEGER NOT NULL,
    "entryId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT,

    CONSTRAINT "EntryiesOnApps_pkey" PRIMARY KEY ("appId","entryId")
);

-- AddForeignKey
ALTER TABLE "EntryiesOnApps" ADD CONSTRAINT "EntryiesOnApps_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("entry_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntryiesOnApps" ADD CONSTRAINT "EntryiesOnApps_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("app_id") ON DELETE RESTRICT ON UPDATE CASCADE;
