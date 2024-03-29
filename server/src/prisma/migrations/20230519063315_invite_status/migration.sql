-- CreateEnum
CREATE TYPE "CollaboratorInviteStatus" AS ENUM ('PENDDING', 'DONE', 'REJECT');

-- AlterTable
ALTER TABLE "Collaborator" ADD COLUMN     "status" "CollaboratorInviteStatus" NOT NULL DEFAULT E'PENDDING';
