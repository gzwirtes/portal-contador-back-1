/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `contadores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contadores_email_key" ON "contadores"("email");
