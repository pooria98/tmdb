import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import FavoritesList from "@/components/FavoritesList";

interface Favorites {
  id: number;
  userId: string;
  mediaId: string;
  type: "movie" | "series" | "celebrity";
  media: {
    id: string;
    overview: string | null;
    type: "movie" | "series" | "celebrity";
    title: string;
    releaseDate: string | null;
    posterUrl: string | null;
  };
}

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/login");
  }

  const favorites: Favorites[] = await prisma.favorite.findMany({
    where: { userId: session?.user?.id },
    include: { media: true },
  });

  return <FavoritesList favorites={favorites} />;
};

export default Page;
