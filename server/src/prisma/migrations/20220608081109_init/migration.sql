/*
  Warnings:

  - You are about to drop the `APP` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "APP";

-- CreateTable
CREATE TABLE "app" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT E'USER',

    CONSTRAINT "app_pkey" PRIMARY KEY ("id")
);
