import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || "";
  const mediaId = searchParams.get("mediaId") || "";
  const type = searchParams.get("type") || "";

  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }
  if (!mediaId) {
    return new Response("Missing mediaId", { status: 400 });
  }
  if (!type) {
    return new Response("Missing media type", { status: 400 });
  }

  if (type === "movie" || type === "series" || type === "celebrity") {
    try {
      const favorite = await prisma.favorite.findFirst({
        where: {
          userId: userId,
          mediaId: mediaId,
          type: type,
        },
      });
      if (favorite) {
        return NextResponse.json({ favorite: true });
      } else {
        return NextResponse.json({ favorite: false });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    return new Response("type must be 'movie', 'series', or 'celebrity' only", {
      status: 400,
    });
  }
}

export async function POST(req: Request) {
  const { userId, mediaId, type, title, posterUrl, overview, releaseDate } =
    await req.json();

  if (!userId || !mediaId || !type || !title || !posterUrl || !overview) {
    return new Response("Missing info", { status: 400 });
  }

  if (type !== "movie" && type !== "series" && type !== "celebrity") {
    return new Response("invalid media type", {
      status: 400,
    });
  }

  try {
    await prisma.media.upsert({
      create: {
        id: mediaId,
        type: type,
        title: title,
        overview: overview,
        posterUrl: posterUrl,
        releaseDate: releaseDate,
      },
      update: {
        title: title,
        overview: overview,
        posterUrl: posterUrl,
        releaseDate: releaseDate,
      },
      where: {
        id_type: { id: mediaId, type: type },
      },
    });
    const favorite = await prisma.favorite.findFirst({
      where: {
        userId: userId,
        mediaId: mediaId,
        type: type,
      },
    });
    if (favorite) {
      await prisma.favorite.delete({
        where: {
          id: favorite.id,
        },
      });
      return NextResponse.json({ favorite: false });
    } else {
      await prisma.favorite.create({
        data: {
          userId: userId,
          mediaId: mediaId,
          type: type,
        },
      });
      return NextResponse.json({ favorite: true });
    }
  } catch (error) {
    console.error(error);
  }
}
