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
  IconCalendar,
  IconExternalLink,
  IconWorld,
  IconLanguage,
  IconDeviceTv,
  IconUsers,
} from "@tabler/icons-react";

import type { TmdbSeries } from "@/types/types";
import { getSeriesDetails } from "@/lib/api";

export default async function TvShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const series: TmdbSeries = await getSeriesDetails(id);

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[80vh] sm:h-[60vh] mb-4">
        {series.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
            alt={series.name}
            width={1920}
            height={1080}
            className="block h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30" />
        <div className="absolute w-full h-full inset-0 text-white">
          <Container size="xl" p="sm">
            <Title order={1} className="text-3xl sm:text-5xl font-bold">
              {series.name}
            </Title>
            {series.tagline && (
              <Text size="lg" className="text-gray-300 italic">
                {series.tagline}
              </Text>
            )}
            <Group gap="md" my="md" wrap="wrap">
              <Group gap={4}>
                <IconStar size={20} className="text-yellow-400" />
                <Text>
                  {series.vote_average.toFixed(1)} ({series.vote_count} votes)
                </Text>
              </Group>
              <Group gap={4}>
                <IconCalendar size={20} />
                <Text>
                  {series.first_air_date
                    ? new Date(series.first_air_date).getFullYear()
                    : "N/A"}
                  {" – "}
                  {series.last_air_date
                    ? new Date(series.last_air_date).getFullYear()
                    : "Present"}
                </Text>
              </Group>
              <Group gap="xs" className="flex-wrap">
                {series.adult && <Badge color="red">+18</Badge>}
                {series.genres.map((g) => (
                  <Badge key={g.id} variant="default">
                    {g.name}
                  </Badge>
                ))}
              </Group>
            </Group>
            <Group mb="md">
              <Text className="sm:w-[70%]">{series.overview}</Text>
            </Group>
            <Group gap="0.125rem" align="center">
              <Badge size="lg">
                <strong>Status:</strong> {series.status}
              </Badge>
              <Badge size="lg" color="blue">
                <IconDeviceTv size={16} className="inline mr-1" />
                {series.type}
              </Badge>
            </Group>
            <Group gap="md" mt="lg" wrap="wrap" className="absolute bottom-4">
              {series.homepage && (
                <Button
                  component="a"
                  href={series.homepage}
                  target="_blank"
                  leftSection={<IconExternalLink size={18} />}
                >
                  Official Website
                </Button>
              )}
            </Group>
          </Container>
        </div>
      </div>

      <Container size="xl" p="sm">
        {/* Created By */}
        {series.created_by.length > 0 && (
          <Card shadow="sm" padding="lg" radius="md" withBorder mb="lg">
            <Title order={3} size="h5" mb="md">
              Created By
            </Title>
            <Group gap="md" wrap="wrap">
              {series.created_by.map((creator) => (
                <Stack key={creator.id} align="center" gap="xs">
                  {creator.profile_path && (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${creator.profile_path}`}
                      alt={creator.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  )}
                  <Text size="sm">{creator.name}</Text>
                </Stack>
              ))}
            </Group>
          </Card>
        )}

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack>
              <Title order={3} size="h5">
                Networks
              </Title>
              <Stack gap="sm">
                {series.networks.map((n) => (
                  <Group key={n.id} gap="sm">
                    {n.logo_path && (
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${n.logo_path}`}
                        alt={n.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    )}
                    <Text>{n.name}</Text>
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
                  <IconUsers size={16} className="inline mr-1" />
                  <Text>
                    <strong>Seasons:</strong> {series.number_of_seasons}
                  </Text>
                </Group>
                <Group gap="0.125rem" align="center">
                  <IconUsers size={16} className="inline mr-1" />
                  <Text>
                    <strong>Episodes:</strong> {series.number_of_episodes}
                  </Text>
                </Group>
                <Group gap="0.125rem" align="center">
                  <IconLanguage size={16} className="inline mr-1" />
                  <Text>
                    <strong>Original Language:</strong>{" "}
                    {series.original_language}
                  </Text>
                </Group>
                <Group gap="0.125rem" align="center">
                  <IconLanguage size={16} className="inline mr-1" />
                  <Text>
                    <strong>Languages:</strong>{" "}
                    {series.spoken_languages
                      .map((l) => l.english_name)
                      .join(", ")}
                  </Text>
                </Group>
                <Group gap="0.125rem" align="center">
                  <IconWorld size={16} className="inline mr-1" />
                  <Text>
                    <strong>Countries:</strong>{" "}
                    {series.production_countries.map((c) => c.name).join(", ")}
                  </Text>
                </Group>
              </Stack>
            </Stack>
          </Card>
        </div>

        {/* Last & Next Episode */}
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          {series.last_episode_to_air && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack>
                <Title order={3} size="h5">
                  Last Episode to Air
                </Title>
                <Text fw={500}>{series.last_episode_to_air.name}</Text>
                <Text size="sm">{series.last_episode_to_air.overview}</Text>
                <Text size="sm" c="dimmed">
                  Aired on {series.last_episode_to_air.air_date}
                </Text>
              </Stack>
            </Card>
          )}

          {series.next_episode_to_air && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack>
                <Title order={3} size="h5">
                  Next Episode
                </Title>
                <Text fw={500}>{series.next_episode_to_air.name}</Text>
                <Text size="sm">{series.next_episode_to_air.overview}</Text>
                <Text size="sm" c="dimmed">
                  Airs on {series.next_episode_to_air.air_date}
                </Text>
              </Stack>
            </Card>
          )}
        </div>
      </Container>
    </>
  );
}
