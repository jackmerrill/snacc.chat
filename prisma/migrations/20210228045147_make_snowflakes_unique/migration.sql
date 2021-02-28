/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[snowflake]` on the table `Comment`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[snowflake]` on the table `Post`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Comment.snowflake_unique" ON "Comment"("snowflake");

-- CreateIndex
CREATE UNIQUE INDEX "Post.snowflake_unique" ON "Post"("snowflake");
