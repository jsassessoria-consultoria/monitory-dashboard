/*
  Warnings:

  - You are about to drop the `Usuarios_Web` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Usuarios_Web";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
