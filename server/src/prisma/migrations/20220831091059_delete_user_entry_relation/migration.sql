/*
  Warnings:

  - You are about to drop the column `userUser_id` on the `Entry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_userUser_id_fkey";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "userUser_id";
