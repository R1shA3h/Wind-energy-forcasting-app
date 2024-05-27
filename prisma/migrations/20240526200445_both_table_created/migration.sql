/*
  Warnings:

  - You are about to drop the column `dataset` on the `WindActual` table. All the data in the column will be lost.
  - You are about to drop the column `fuelType` on the `WindActual` table. All the data in the column will be lost.
  - You are about to drop the column `publishTime` on the `WindActual` table. All the data in the column will be lost.
  - You are about to drop the column `settlementPeriod` on the `WindActual` table. All the data in the column will be lost.
  - You are about to drop the column `dataset` on the `WindForecast` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WindActual" DROP COLUMN "dataset",
DROP COLUMN "fuelType",
DROP COLUMN "publishTime",
DROP COLUMN "settlementPeriod";

-- AlterTable
ALTER TABLE "WindForecast" DROP COLUMN "dataset";
