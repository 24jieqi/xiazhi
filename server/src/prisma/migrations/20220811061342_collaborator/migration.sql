/*
  Warnings:

  - You are about to drop the `Collaborator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Collaborator";

-- CreateTable
CREATE TABLE "CollaboratorsOnApps" (
    "collaboratorId" INTEGER NOT NULL,
    "appId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "CollaboratorsOnApps_pkey" PRIMARY KEY ("collaboratorId","appId")
);

-- AddForeignKey
ALTER TABLE "CollaboratorsOnApps" ADD CONSTRAINT "CollaboratorsOnApps_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("app_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollaboratorsOnApps" ADD CONSTRAINT "CollaboratorsOnApps_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
