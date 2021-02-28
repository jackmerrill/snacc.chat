/*
  Warnings:

  - Added the required column `snowflake` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users.snowflake_unique";

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "snowflake" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "snowflake" DROP NOT NULL;
