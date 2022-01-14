-- CreateEnum
CREATE TYPE "DatabaseType" AS ENUM ('Postgres', 'MySQL');

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Database" (
    "id" TEXT NOT NULL,
    "ownerUid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remoteId" TEXT NOT NULL,
    "maxSize" INTEGER NOT NULL,
    "lifespan" INTEGER NOT NULL,
    "type" "DatabaseType" NOT NULL,

    CONSTRAINT "Database_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Remote" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "DatabaseType" NOT NULL,

    CONSTRAINT "Remote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- AddForeignKey
ALTER TABLE "Database" ADD CONSTRAINT "Database_ownerUid_fkey" FOREIGN KEY ("ownerUid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Database" ADD CONSTRAINT "Database_remoteId_fkey" FOREIGN KEY ("remoteId") REFERENCES "Remote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
