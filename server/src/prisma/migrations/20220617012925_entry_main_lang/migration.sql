-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "mainLang" "LanguageType" NOT NULL DEFAULT E'CHINESE',
ADD COLUMN     "mainLangText" TEXT;
