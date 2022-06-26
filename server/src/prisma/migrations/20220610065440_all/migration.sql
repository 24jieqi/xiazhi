/*
  Warnings:

  - You are about to drop the `app` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AppType" AS ENUM ('TOOL', 'EFFICIENCY', 'MUSIC', 'FINANCE', 'GAME', 'CONTACT', 'OTHER', 'EDUCATION');

-- CreateEnum
CREATE TYPE "LanguageType" AS ENUM ('CHINESE', 'ENGLISH', 'THAI', 'VIETNAMESE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('DEVELOPER', 'TRANSLATOR', 'MANAGER', 'OTHER');

-- DropTable
DROP TABLE "app";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Record" (
    "record_id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entryEntry_id" INTEGER,
    "prevLangs" JSONB NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("record_id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "entry_id" SERIAL NOT NULL,
    "key" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "archive" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "langs" JSONB,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("entry_id")
);

-- CreateTable
CREATE TABLE "App" (
    "app_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "AppType" NOT NULL,
    "language" "LanguageType" NOT NULL,
    "pictures" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accessKey" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "api" BOOLEAN NOT NULL DEFAULT true,
    "access" BOOLEAN NOT NULL DEFAULT true,
    "userUser_id" INTEGER,

    CONSTRAINT "App_pkey" PRIMARY KEY ("app_id")
);

-- CreateTable
CREATE TABLE "Collaborator" (
    "collaborator_id" SERIAL NOT NULL,
    "app_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Collaborator_pkey" PRIMARY KEY ("collaborator_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "account" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "nickName" TEXT NOT NULL,
    "name" TEXT,
    "role" "UserRole" NOT NULL,
    "avatar" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "_AppToEntry" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "_AppToEntry_AB_unique" ON "_AppToEntry"("A", "B");

-- CreateIndex
CREATE INDEX "_AppToEntry_B_index" ON "_AppToEntry"("B");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_entryEntry_id_fkey" FOREIGN KEY ("entryEntry_id") REFERENCES "Entry"("entry_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppToEntry" ADD CONSTRAINT "_AppToEntry_A_fkey" FOREIGN KEY ("A") REFERENCES "App"("app_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppToEntry" ADD CONSTRAINT "_AppToEntry_B_fkey" FOREIGN KEY ("B") REFERENCES "Entry"("entry_id") ON DELETE CASCADE ON UPDATE CASCADE;
