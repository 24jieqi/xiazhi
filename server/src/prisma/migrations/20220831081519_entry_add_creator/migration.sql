-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "userUser_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
