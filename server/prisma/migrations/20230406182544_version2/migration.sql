/*
  Warnings:

  - You are about to drop the column `metadata` on the `user_info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_info" DROP COLUMN "metadata",
ADD COLUMN     "expert" TEXT;
