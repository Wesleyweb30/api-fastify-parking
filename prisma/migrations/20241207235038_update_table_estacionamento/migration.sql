/*
  Warnings:

  - Added the required column `updatedAt` to the `estacionamentos_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `estacionamentos_tb` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
