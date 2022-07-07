-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "userUser_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
