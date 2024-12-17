/*
  Warnings:

  - Added the required column `spaceId` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Upvotes" DROP CONSTRAINT "Upvotes_streamId_fkey";

-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "spaceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "User_space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
