"use client";

import { useState, useMemo } from "react";
import {
  Badge,
  Button,
  Card,
  CardSection,
  Container,
  Group,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { TMDB_IMG_URL } from "@/lib/constants";
import noPreview from "@/public/no-preview.png";

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

export default function FavoritesList({
  favorites,
}: {
  favorites: Favorites[];
}) {
  const [filter, setFilter] = useState<
    "all" | "movie" | "series" | "celebrity"
  >("all");
  const [search, setSearch] = useState("");

  // Filtering logic
  const filteredFavorites = useMemo(() => {
    return favorites.filter((item) => {
      const matchesType = filter === "all" || item.type === filter;
      const matchesSearch =
        search.trim() === "" ||
        item.media.title.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [favorites, filter, search]);

  return (
    <Container size="xl" p="sm">
      <Title order={1} className="mb-4">
        Favorites
      </Title>

      {/* Controls */}
      <Group mb="md">
        <Button
          variant={filter === "all" ? "filled" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "movie" ? "filled" : "outline"}
          onClick={() => setFilter("movie")}
          color="blue"
        >
          Movies
        </Button>
        <Button
          variant={filter === "series" ? "filled" : "outline"}
          onClick={() => setFilter("series")}
          color="orange"
        >
          Series
        </Button>
        <Button
          variant={filter === "celebrity" ? "filled" : "outline"}
          onClick={() => setFilter("celebrity")}
          color="purple"
        >
          Celebrities
        </Button>

        <TextInput
          placeholder="Search favorites..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          className="flex-1"
        />
      </Group>

      {/* Grid */}
      <SimpleGrid
        cols={{ base: 2, xs: 3, sm: 4, md: 5, lg: 6 }}
        spacing={{ base: "0.5rem", sm: "sm", md: "md" }}
      >
        {filteredFavorites.map((item) => (
          <Link
            key={item.id}
            href={`/${
              item.type === "movie"
                ? "movies"
                : item.type === "series"
                ? "series"
                : "celebrities"
            }/${item.mediaId}`}
          >
            <Card withBorder radius="lg" p={0}>
              <CardSection>
                <div className="relative">
                  <Image
                    src={
                      item.media.posterUrl
                        ? `${TMDB_IMG_URL}/w500/${item.media.posterUrl}`
                        : noPreview
                    }
                    width={500}
                    height={750}
                    alt={item.media.title ?? "poster"}
                    className="block w-full h-auto"
                  />
                  <Badge
                    size="sm"
                    className="absolute top-5 left-5"
                    c="#fff"
                    color={
                      item.type === "movie"
                        ? "blue"
                        : item.type === "series"
                        ? "orange"
                        : "purple"
                    }
                  >
                    {item.media.type}
                  </Badge>
                </div>
              </CardSection>
              <div className="p-2">
                <p className="font-semibold mb-2">{item.media.title}</p>
                {item.media.releaseDate && (
                  <p className="text-sm font-semibold text-primary">
                    {dayjs(item.media.releaseDate).year()}
                  </p>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  );
}
