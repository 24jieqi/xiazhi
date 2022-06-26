-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "APPList" (
    "appid" TEXT NOT NULL,
    "app_name" TEXT NOT NULL,
    "appkey" TEXT,
    "app_introduction" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT E'USER',

    CONSTRAINT "APPList_pkey" PRIMARY KEY ("appid")
);
