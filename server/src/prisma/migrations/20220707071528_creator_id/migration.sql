/*
  Warnings:

  - You are about to drop the column `userUser_id` on the `Record` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_userUser_id_fkey";

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "userUser_id",
ADD COLUMN     "creator" INTEGER;
