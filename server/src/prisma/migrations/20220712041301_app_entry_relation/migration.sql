-- CreateEnum
CREATE TYPE "AppType" AS ENUM ('TOOL', 'EFFICIENCY', 'MUSIC', 'FINANCE', 'GAME', 'CONTACT', 'OTHER', 'EDUCATION');

-- CreateEnum
CREATE TYPE "LanguageType" AS ENUM ('CHINESE', 'ENGLISH', 'THAI', 'VIETNAMESE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('DEVELOPER', 'TRANSLATOR', 'MANAGER', 'OTHER');

-- CreateTable
CREATE TABLE "Record" (
    "record_id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entryEntry_id" INTEGER,
    "prevLangs" JSONB,
    "currLangs" JSONB,
    "prevKey" TEXT,
    "currKey" TEXT,
    "creator" INTEGER,

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
    "mainLang" "LanguageType" NOT NULL DEFAULT E'CHINESE',
    "mainLangText" TEXT,
    "langs" JSONB,
    "appApp_id" INTEGER,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("entry_id")
);

-- CreateTable
CREATE TABLE "App" (
    "app_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "AppType" NOT NULL,
    "languages" "LanguageType"[],
    "pictures" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accessKey" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "push" BOOLEAN NOT NULL DEFAULT true,
    "access" BOOLEAN NOT NULL DEFAULT true,
    "creatorId" INTEGER,

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
    "nickName" TEXT,
    "name" TEXT,
    "role" "UserRole",
    "avatar" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Langs" (
    "lang_id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "value" "LanguageType" NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Langs_pkey" PRIMARY KEY ("lang_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Langs_label_key" ON "Langs"("label");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_entryEntry_id_fkey" FOREIGN KEY ("entryEntry_id") REFERENCES "Entry"("entry_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_appApp_id_fkey" FOREIGN KEY ("appApp_id") REFERENCES "App"("app_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
