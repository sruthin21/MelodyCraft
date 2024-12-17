/*
  Warnings:

  - You are about to drop the column `userId` on the `Upvotes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Upvotes_userId_streamId_key";

-- AlterTable
ALTER TABLE "Upvotes" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "Downvotes" (
    "id" TEXT NOT NULL,
    "streamId" TEXT NOT NULL,

    CONSTRAINT "Downvotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Upvotes" ADD CONSTRAINT "Upvotes_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Downvotes" ADD CONSTRAINT "Downvotes_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
