/*
  Warnings:

  - Added the required column `type` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."MediaType" AS ENUM ('movie', 'series');

-- AlterTable
ALTER TABLE "public"."Favorite" ADD COLUMN     "type" "public"."MediaType" NOT NULL;
