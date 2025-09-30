/*
  Warnings:

  - A unique constraint covering the columns `[mediaId,type,userId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "public"."Media" (
    "id" TEXT NOT NULL,
    "type" "public"."MediaType" NOT NULL,
    "title" TEXT NOT NULL,
    "posterUrl" TEXT,
    "overview" TEXT,
    "releaseDate" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Media_id_type_key" ON "public"."Media"("id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_mediaId_type_userId_key" ON "public"."Favorite"("mediaId", "type", "userId");

-- AddForeignKey
ALTER TABLE "public"."Favorite" ADD CONSTRAINT "Favorite_mediaId_type_fkey" FOREIGN KEY ("mediaId", "type") REFERENCES "public"."Media"("id", "type") ON DELETE RESTRICT ON UPDATE CASCADE;
