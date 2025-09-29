import noPreview from "@/public/no-preview.png";
import Image from "next/image";
import {
  Card,
  Badge,
  Text,
  Title,
  Group,
  Stack,
  Container,
  Flex,
  CardSection,
} from "@mantine/core";
import { IconCalendar, IconDeviceTv } from "@tabler/icons-react";
import Rating from "@/components/Rating";

import type {
  CombinedCredits,
  ExternalIds,
  Language,
  Movies,
  TmdbSeries,
} from "@/types/types";
import {
  getLanguages,
  getSeriesCredits,
  getSeriesDetails,
  getSeriesExternalIDs,
  getSeriesRecommendations,
} from "@/lib/api";
import { TMDB_IMG_URL } from "@/lib/constants";
import SocialIcon from "@/components/SocialIcon";
import ViewMoreButton from "@/components/ViewMoreButton";
import PersonCarousel from "@/components/PersonCarousel";
import MovieCarousel from "@/components/MovieCarousel";
import dayjs from "dayjs";
import CompaniesCard from "@/components/CompaniesCard";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const series: TmdbSeries = await getSeriesDetails(id);
  const externalIds: ExternalIds = await getSeriesExternalIDs(id);
  const credits: CombinedCredits = await getSeriesCredits(id);
  const recommendations: Movies = await getSeriesRecommendations(id);
  const languages: Language[] = await getLanguages();

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full min-h-[500px] mb-4"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.9)), url(${TMDB_IMG_URL}/original${series.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full h-full text-white p-4 md:content-center">
          <Container size="xl" p="sm">
            <div className="flex gap-8">
              {/* POSTER (left side) */}
              <div className="w-64 hidden md:block">
                {series.poster_path ? (
                  <Image
                    src={`${TMDB_IMG_URL}/w500${series.poster_path}`}
                    alt={series.name}
                    width={500}
                    height={750}
                    className="block w-full h-auto rounded-lg shadow-[0_0px_10px_1px_rgba(0,0,0,0.3)]"
                  />
                ) : (
                  <Image
                    src={noPreview}
                    alt={series.name}
                    width={500}
                    height={750}
                    className="block w-full h-auto rounded-lg shadow-[0_0px_10px_1px_rgba(0,0,0,0.3)]"
                  />
                )}
              </div>

              {/* INFO (right side) */}
              <Stack className="flex-1" gap="xs">
                <Title
                  order={1}
                  className="text-4xl sm:text-5xl font-bold mb-2 sm:mb-8"
                >
                  {series.name}
                </Title>

                <div className="flex gap-8 items-start flex-col sm:flex-row">
                  <div className="w-fit flex items-center sm:flex sm:flex-col sm:items-start gap-8">
                    <Rating
                      value={Number((series.vote_average * 10).toFixed())}
                      vote_count={series.vote_count}
                    />
                    <div className="flex flex-col gap-4 px-2">
                      <Group gap={8}>
                        <IconCalendar />
                        <Text className="font-bold" lh={1}>
                          {new Date(series.first_air_date).getFullYear()}
                        </Text>
                      </Group>
                      <Group gap={8}>
                        <IconDeviceTv />
                        <Text className="font-bold" lh={1}>
                          {series.number_of_seasons} season
                          {series.number_of_seasons > 1 && "s"}
                        </Text>
                      </Group>
                      <Group gap={8}>
                        <IconDeviceTv />
                        <Text className="font-bold" lh={1}>
                          {series.number_of_episodes} episode
                          {series.number_of_episodes > 1 && "s"}
                        </Text>
                      </Group>
                    </div>
                  </div>

                  <Stack className="flex-1">
                    <Title order={3}>Overview</Title>
                    <Text>{series.overview}</Text>

                    <Title order={3}>Genres</Title>
                    <Group gap="xs" className="flex-wrap">
                      {series.adult && <Badge color="red">+18</Badge>}
                      {series.genres.map((g) => (
                        <Badge key={g.id} variant="default">
                          {g.name}
                        </Badge>
                      ))}
                    </Group>
                  </Stack>
                </div>
              </Stack>
            </div>
          </Container>
        </div>
      </div>

      <Container size="xl" p="sm">
        <main className="flex flex-col sm:flex-row gap-4 md:gap-8 py-4">
          {/* Left Sidebar */}
          <aside className="w-full sm:w-44 md:w-80 flex-shrink-0">
            <Group gap="md" className="mb-8">
              <SocialIcon platform="imdb" id={externalIds.imdb_id} />
              <SocialIcon platform="twitter" id={externalIds.twitter_id} />
              <SocialIcon platform="facebook" id={externalIds.facebook_id} />
              <SocialIcon platform="instagram" id={externalIds.instagram_id} />
              <SocialIcon platform="website" id={series.homepage} />
            </Group>

            <div className="space-y-4">
              <div>
                <Text size="sm" fw={700}>
                  Original Title
                </Text>
                <Text size="sm" c="dimmed">
                  {series.original_name}
                </Text>
              </div>
              <div>
                <Text size="sm" fw={700}>
                  Status
                </Text>
                <Text size="sm" c="dimmed">
                  {series.status}
                </Text>
              </div>
              <div>
                <Text size="sm" fw={700}>
                  Original Language
                </Text>
                <Text size="sm" c="dimmed">
                  {languages.find(
                    (l) => l.iso_639_1 === series.original_language
                  )?.name || series.original_language}
                </Text>
              </div>
              <div>
                <Text size="sm" fw={700}>
                  Spoken Languages
                </Text>
                {series.spoken_languages.map((l) => (
                  <Text key={l.english_name + l.iso_639_1} size="sm" c="dimmed">
                    {l.english_name}
                  </Text>
                ))}
              </div>
              {series.created_by.length > 0 && (
                <div>
                  <Text size="sm" fw={700}>
                    Created By
                  </Text>
                  {series.production_countries.map((c) => (
                    <Text key={c.name + c.iso_3166_1} size="sm" c="dimmed">
                      {c.name}
                    </Text>
                  ))}
                  {series.created_by.map((creator) => (
                    <Text key={creator.id} size="sm" c="dimmed">
                      {creator.name}
                    </Text>
                  ))}
                </div>
              )}
              <div>
                <Text size="sm" fw={700}>
                  Production Countries
                </Text>

                {series.production_countries.map((c) => (
                  <Text key={c.name + c.iso_3166_1} size="sm" c="dimmed">
                    {c.name}
                  </Text>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Content */}
          <div className="flex-grow overflow-hidden">
            {/* Cast & Crew */}
            <section className="mb-8">
              <Stack gap={0}>
                <Group mb="xs" justify="space-between" align="end">
                  <Title order={2} className="text-2xl font-bold">
                    Top Cast
                  </Title>
                  <ViewMoreButton href={`/series/${id}/cast-and-crew`}>
                    All cast & crew
                  </ViewMoreButton>
                </Group>
                <PersonCarousel data={credits.cast.slice(0, 10)} />
                <ViewMoreButton href={`/series/${id}/cast-and-crew`} small>
                  All cast & crew
                </ViewMoreButton>
              </Stack>
            </section>

            {/* Production Companies */}
            {series.production_companies.length > 0 && (
              <section className="mb-8">
                <Title order={2} className="text-2xl font-bold mb-4">
                  Production Companies
                </Title>
                <Flex gap="lg" wrap="wrap">
                  {series.production_companies.map((c) => (
                    <CompaniesCard key={c.id} company={c} />
                  ))}
                </Flex>
              </section>
            )}

            {/* Networks */}
            {series.networks.length > 0 && (
              <section className="mb-8">
                <Title order={2} className="text-2xl font-bold mb-4">
                  Networks
                </Title>
                <Flex gap="lg" wrap="wrap">
                  {series.networks.map((n) => (
                    <CompaniesCard key={n.id} company={n} />
                  ))}
                </Flex>
              </section>
            )}

            {/* Seasons */}
            {series.seasons.length > 0 && (
              <section className="mb-8">
                <Title order={2} className="text-2xl font-bold mb-4">
                  Seasons
                </Title>
                <div className="flex flex-wrap gap-4">
                  {series.seasons.map((season) => (
                    <Card
                      key={season.id}
                      shadow="sm"
                      radius="md"
                      padding={0}
                      withBorder
                      className="w-full xs:w-50"
                    >
                      <CardSection>
                        {season.poster_path ? (
                          <Image
                            src={`${TMDB_IMG_URL}/w342${season.poster_path}`}
                            alt={season.name}
                            width={342}
                            height={513}
                            className="block w-full h-auto"
                          />
                        ) : (
                          <Image
                            src={noPreview}
                            alt={season.name}
                            width={342}
                            height={513}
                            className="block w-full h-auto"
                          />
                        )}
                      </CardSection>
                      <Stack className="p-2 gap-1">
                        <Text fw={700}>{season.name}</Text>
                        <Text fw={700} c="var(--color-primary)">
                          {dayjs(season.air_date).year() || "N/A"}
                        </Text>
                        {season.episode_count > 0 && (
                          <Text>{season.episode_count} episodes</Text>
                        )}
                      </Stack>
                    </Card>
                  ))}
                </div>
              </section>
            )}

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

            {/* Recommendations */}
            <section className="mb-8">
              <Title order={2} className="text-2xl font-bold mb-4">
                Recommendations
              </Title>
              <MovieCarousel data={recommendations.results} />
            </section>
          </div>
        </main>
      </Container>
    </>
  );
}
