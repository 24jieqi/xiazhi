/*
  Warnings:

  - You are about to drop the `APPList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "APPList";

-- CreateTable
CREATE TABLE "APP" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT E'USER',

    CONSTRAINT "APP_pkey" PRIMARY KEY ("id")
);
