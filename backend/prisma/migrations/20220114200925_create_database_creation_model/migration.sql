/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Database` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Database` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[creationId]` on the table `Database` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creationId` to the `Database` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Database" DROP COLUMN "createdAt",
ADD COLUMN     "creationId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DatabaseCreation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "host" TEXT NOT NULL,
    "userUid" TEXT NOT NULL,

    CONSTRAINT "DatabaseCreation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DatabaseCreation_id_key" ON "DatabaseCreation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Database_id_key" ON "Database"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Database_creationId_key" ON "Database"("creationId");

-- AddForeignKey
ALTER TABLE "Database" ADD CONSTRAINT "Database_creationId_fkey" FOREIGN KEY ("creationId") REFERENCES "DatabaseCreation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabaseCreation" ADD CONSTRAINT "DatabaseCreation_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
