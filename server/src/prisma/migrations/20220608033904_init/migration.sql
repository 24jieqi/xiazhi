/*
  Warnings:

  - The primary key for the `APPList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `app_introduction` on the `APPList` table. All the data in the column will be lost.
  - You are about to drop the column `app_name` on the `APPList` table. All the data in the column will be lost.
  - You are about to drop the column `appid` on the `APPList` table. All the data in the column will be lost.
  - You are about to drop the column `appkey` on the `APPList` table. All the data in the column will be lost.
  - The required column `id` was added to the `APPList` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `APPList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "APPList" DROP CONSTRAINT "APPList_pkey",
DROP COLUMN "app_introduction",
DROP COLUMN "app_name",
DROP COLUMN "appid",
DROP COLUMN "appkey",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "key" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "APPList_pkey" PRIMARY KEY ("id");
