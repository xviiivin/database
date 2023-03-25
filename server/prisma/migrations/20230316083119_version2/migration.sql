/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- AlterTable
ALTER TABLE "UserInfo" ADD COLUMN     "department" TEXT,
ADD COLUMN     "metadata" JSONB;

-- DropTable
DROP TABLE "Image";
