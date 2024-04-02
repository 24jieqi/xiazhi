-- CreateTable
CREATE TABLE "Entry" (
    "entry_id" SERIAL NOT NULL,
    "key" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archive" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "mainLang" TEXT NOT NULL DEFAULT 'zh',
    "mainLangText" TEXT,
    "langs" JSONB,
    "uploaded" BOOLEAN NOT NULL DEFAULT false,
    "creatorId" INTEGER,
    "appId" INTEGER,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("entry_id")
);

-- CreateTable
CREATE TABLE "App" (
    "app_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "languages" TEXT[],
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

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("app_id") ON DELETE SET NULL ON UPDATE CASCADE;
