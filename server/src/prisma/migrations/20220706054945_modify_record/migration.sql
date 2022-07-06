-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "currKey" TEXT,
ADD COLUMN     "currLangs" JSONB,
ADD COLUMN     "prevKey" TEXT,
ALTER COLUMN "prevLangs" DROP NOT NULL;
