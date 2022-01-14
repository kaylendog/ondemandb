/*
  Warnings:

  - You are about to drop the column `url` on the `Remote` table. All the data in the column will be lost.
  - Added the required column `host` to the `Remote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `port` to the `Remote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Remote" DROP COLUMN "url",
ADD COLUMN     "host" TEXT NOT NULL,
ADD COLUMN     "port" INTEGER NOT NULL;
