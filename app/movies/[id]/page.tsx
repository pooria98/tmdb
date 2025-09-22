import Image from "next/image";
import {
  Card,
  Badge,
  Button,
  Text,
  Title,
  Group,
  Stack,
  Container,
} from "@mantine/core";
import {
  IconStar,
  IconClock,
  IconCalendar,
  IconExternalLink,
  IconCurrencyDollar,
  IconLanguage,
  IconWorld,
} from "@tabler/icons-react";

import type { TmdbMovie } from "@/types/types";
import { getMovieDetails } from "@/lib/api";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie: TmdbMovie = await getMovieDetails(id);

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[80vh] sm:h-[60vh] mb-4">
        {movie.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            width={1920}
            height={1080}
            className="block h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30" />
        <div className="absolute w-full h-full inset-0 text-white">
          <Container size="xl" p="sm">
            <Title order={1} className="text-3xl sm:text-5xl font-bold">
              {movie.title}
            </Title>
            {movie.tagline && (
              <Text size="lg" className="text-gray-300 italic">
                {movie.tagline}
              </Text>
            )}
            <Group gap="md" my="md" wrap="wrap">
              <Group gap={4}>
                <IconStar size={20} className="text-yellow-400" />
                <Text>
                  {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
                </Text>
              </Group>
              <Group gap={4}>
                <IconClock size={20} />
                <Text>{movie.runtime} min</Text>
              </Group>
              <Group gap={4}>
                <IconCalendar size={20} />
                <Text>{new Date(movie.release_date).getFullYear()}</Text>
              </Group>
              <Group gap="xs" className="flex-wrap">
                {movie.adult && <Badge color="red">+18</Badge>}
                {movie.genres.map((g) => (
                  <Badge key={g.id} variant="default">
                    {g.name}
                  </Badge>
                ))}
              </Group>
            </Group>
            <Group mb="md">
              <Text className="sm:w-[70%]">{movie.overview}</Text>
            </Group>
            <Group gap="0.125rem" align="center">
              <Badge size="lg">
                <strong>Status:</strong> {movie.status}
              </Badge>
            </Group>
            <Group gap="md" mt="lg" wrap="wrap" className="absolute bottom-4">
              {movie.homepage && (
                <Button
                  component="a"
                  href={movie.homepage}
                  target="_blank"
                  leftSection={<IconExternalLink size={18} />}
                >
                  Official Website
                </Button>
              )}
              {movie.imdb_id && (
                <Button
                  component="a"
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  color="var(--mantine-color-yellow-4)"
                  c="black"
                  leftSection={<IconExternalLink size={18} />}
                >
                  IMDb
                </Button>
              )}
            </Group>
          </Container>
        </div>
      </div>

      <Container size="xl" p="sm">
        {/* Cast & Crew */}

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack>
              <Title order={3} size="h5">
                Production Companies
              </Title>
              <Stack gap="sm">
                {movie.production_companies.map((c) => (
                  <Group key={c.id} gap="sm">
                    {c.logo_path && (
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${c.logo_path}`}
                        alt={c.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    )}
                    <Text>{c.name}</Text>
                  </Group>
                ))}
              </Stack>
            </Stack>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack>
              <Title order={3} size="h5">
                Details
              </Title>
              <Stack gap={4} className="text-gray-700 dark:text-gray-300">
                <Group gap="0.125rem" align="center">
                  <IconCurrencyDollar size={16} className="inline mr-1" />
                  <Text>
                    <strong>Budget:</strong> ${movie.budget.toLocaleString()}
                  </Text>
                </Group>
                <Group gap="0.125rem" align="center">
                  <IconCurrencyDollar size={16} className="inline mr-1" />
                  <Text>
                    <strong>Revenue:</strong> ${movie.revenue.toLocaleString()}
                  </Text>
                </Group>
                <Group gap="0.125rem" align="center">
                  <IconLanguage size={16} className="inline mr-1" />
                  <Text>
                    <strong>Original Language:</strong>{" "}
                    {movie.original_language}
                  </Text>
                </Group>
                <Group gap="0.125rem" align="center">
                  <IconLanguage size={16} className="inline mr-1" />
                  <Text>
                    <strong>Languages:</strong>{" "}
                    {movie.spoken_languages
                      .map((l) => l.english_name)
                      .join(", ")}
                  </Text>
                </Group>
                <Group gap="0.125rem" align="center">
                  <IconWorld size={16} className="inline mr-1" />
                  <Text>
                    <strong>Countries:</strong>{" "}
                    {movie.production_countries.map((c) => c.name).join(", ")}
                  </Text>
                </Group>
              </Stack>
            </Stack>
          </Card>
        </div>

        {/* Collection Section */}
        {movie.belongs_to_collection && (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="flex items-center gap-4"
          >
            <Title order={3} size="h5">
              Part of a Collection
            </Title>
            {movie.belongs_to_collection.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w200${movie.belongs_to_collection.poster_path}`}
                alt={movie.belongs_to_collection.name}
                width={100}
                height={150}
                className="rounded-lg shadow-md"
              />
            )}
            <Text fw={500}>{movie.belongs_to_collection.name}</Text>
          </Card>
        )}
      </Container>
    </>
  );
}
