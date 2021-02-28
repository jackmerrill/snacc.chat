-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "votes" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "votes" TEXT[];
