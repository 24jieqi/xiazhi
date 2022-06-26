/*
  Warnings:

  - You are about to drop the column `userUser_id` on the `App` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "App" DROP CONSTRAINT "App_userUser_id_fkey";

-- AlterTable
ALTER TABLE "App" DROP COLUMN "userUser_id",
ADD COLUMN     "creatorId" INTEGER;

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
