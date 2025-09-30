import { auth } from "@/lib/auth";
import { TMDB_IMG_URL } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { Card, CardSection, Container, SimpleGrid, Title } from "@mantine/core";
import dayjs from "dayjs";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Favorites {
  id: number;
  userId: string;
  mediaId: string;
  type: "movie" | "series";
  media: {
    id: string;
    overview: string | null;
    type: "movie" | "series";
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

  return (
    <Container size="xl" p="sm">
      <Title order={1} className="mb-4">
        Favorites
      </Title>
      <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5 }}>
        {favorites.map((item) => (
          <Link
            key={item.id}
            href={`/${item.type === "movie" ? "movies" : "series"}/${
              item.mediaId
            }`}
          >
            <Card key={item.id} withBorder radius="lg" p={0}>
              <CardSection>
                <Image
                  src={`${TMDB_IMG_URL}/w500/${item.media.posterUrl}`}
                  width={500}
                  height={750}
                  alt={item.media.title ?? "poster"}
                  className="block w-full h-auto"
                />
              </CardSection>
              <div className="p-2">
                <p className="font-semibold mb-2">{item.media.title}</p>
                <p className="text-sm font-semibold text-primary">
                  {dayjs(item.media.releaseDate).year()}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Page;
