import noPreview from "@/public/no-preview.png";
import Image from "next/image";
import {
  Badge,
  Text,
  Title,
  Group,
  Stack,
  Container,
  Flex,
} from "@mantine/core";
import { IconClock, IconCalendar } from "@tabler/icons-react";

import type {
  CombinedCredits,
  ExternalIds,
  Language,
  Movies,
  TmdbMovie,
} from "@/types/types";
import {
  getFavoriteStatus,
  getLanguages,
  getMovieCredits,
  getMovieDetails,
  getMovieExternalIDs,
  getMovieRecommendations,
} from "@/lib/api";
import { TMDB_IMG_URL } from "@/lib/constants";
import Rating from "@/components/Rating";
import SocialIcon from "@/components/SocialIcon";
import PersonCarousel from "@/components/PersonCarousel";
import ViewMoreButton from "@/components/ViewMoreButton";
import MovieCarousel from "@/components/MovieCarousel";
import CompaniesCard from "@/components/CompaniesCard";
import FavoriteButton from "@/components/FavoriteButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const { id } = await params;
  const movie: TmdbMovie = await getMovieDetails(id);
  const externalIds: ExternalIds = await getMovieExternalIDs(id);
  const credits: CombinedCredits = await getMovieCredits(id);
  const recommendations: Movies = await getMovieRecommendations(id);
  const languages: Language[] = await getLanguages();
  let favoriteStatus = false;
  if (session) {
    favoriteStatus = await getFavoriteStatus(session.user.id, id, "movie");
  }

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full min-h-[500px] mb-4"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.9)), url(${TMDB_IMG_URL}/original${movie.backdrop_path})`,
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
                {movie.poster_path ? (
                  <Image
                    src={`${TMDB_IMG_URL}/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={500}
                    height={750}
                    className="block w-full h-auto rounded-lg shadow-[0_0px_10px_1px_rgba(0,0,0,0.3)]"
                  />
                ) : (
                  <Image
                    src={noPreview}
                    alt={movie.title}
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
                  {movie.title}
                </Title>

                <div className="flex gap-8 items-start flex-col sm:flex-row">
                  <div className="w-fit flex items-center sm:flex sm:flex-col sm:items-start gap-8">
                    <Rating
                      value={Number((movie.vote_average * 10).toFixed())}
                      vote_count={movie.vote_count}
                    />
                    <div className="flex flex-col gap-4 px-2">
                      <Group gap={8}>
                        <IconCalendar />
                        <Text className="font-bold" lh={1}>
                          {new Date(movie.release_date).getFullYear()}
                        </Text>
                      </Group>
                      <Group gap={8}>
                        <IconClock />
                        <Text className="font-bold" lh={1}>
                          {movie.runtime} min
                        </Text>
                      </Group>
                    </div>
                  </div>

                  <Stack className="flex-1">
                    <Title order={3}>Overview</Title>
                    <Text>{movie.overview}</Text>

                    <Title order={3}>Genres</Title>
                    <Group gap="xs" className="flex-wrap">
                      {movie.adult && <Badge color="red">+18</Badge>}
                      {movie.genres.map((g) => (
                        <Badge key={g.id} variant="default">
                          {g.name}
                        </Badge>
                      ))}
                    </Group>

                    {session && (
                      <FavoriteButton
                        initialValue={favoriteStatus}
                        userId={session?.user?.id}
                        mediaId={id}
                        type="movie"
                        title={movie.title}
                        overview={movie.overview}
                        posterUrl={movie.poster_path ?? ""}
                        releaseDate={movie.release_date}
                      />
                    )}
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
              <SocialIcon platform="website" id={movie.homepage} />
            </Group>

            <div className="space-y-4">
              <div>
                <Text size="sm" fw={700}>
                  Original Title
                </Text>
                <Text size="sm" c="dimmed">
                  {movie.original_title}
                </Text>
              </div>
              <div>
                <Text size="sm" fw={700}>
                  Status
                </Text>
                <Text size="sm" c="dimmed">
                  {movie.status}
                </Text>
              </div>
              <div>
                <Text size="sm" fw={700}>
                  Budget
                </Text>
                <Text size="sm" c="dimmed">
                  ${movie.budget.toLocaleString()}
                </Text>
              </div>
              <div>
                <Text size="sm" fw={700}>
                  Revenue
                </Text>
                <Text size="sm" c="dimmed">
                  ${movie.revenue.toLocaleString()}
                </Text>
              </div>
              <div>
                <Text size="sm" fw={700}>
                  Original Language
                </Text>
                <Text size="sm" c="dimmed">
                  {languages.find(
                    (l) => l.iso_639_1 === movie.original_language
                  )?.name || movie.original_language}
                </Text>
              </div>
              <div>
                <Text size="sm" fw={700}>
                  Spoken Languages
                </Text>
                {movie.spoken_languages.map((l) => (
                  <Text key={l.english_name + l.iso_639_1} size="sm" c="dimmed">
                    {l.english_name}
                  </Text>
                ))}
              </div>
              <div>
                <Text size="sm" fw={700}>
                  Production Countries
                </Text>

                {movie.production_countries.map((c) => (
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
                  <ViewMoreButton href={`/movies/${id}/cast-and-crew`}>
                    All cast & crew
                  </ViewMoreButton>
                </Group>
                <PersonCarousel data={credits.cast.slice(0, 10)} />
                <ViewMoreButton href={`/movies/${id}/cast-and-crew`} small>
                  All cast & crew
                </ViewMoreButton>
              </Stack>
            </section>

            {/* Production Companies */}
            {movie.production_companies.length > 0 && (
              <section className="mb-8">
                <Title order={2} className="text-2xl font-bold mb-4">
                  Production Companies
                </Title>
                <Flex gap="lg" wrap="wrap">
                  {movie.production_companies.map((c) => (
                    <CompaniesCard key={c.id} company={c} />
                  ))}
                </Flex>
              </section>
            )}

            {/* Collection Section */}
            {movie.belongs_to_collection && (
              <section className="mb-8">
                <Title order={2} className="text-2xl font-bold mb-4">
                  Part of a Collection
                </Title>
                {movie.belongs_to_collection.poster_path ? (
                  <Image
                    src={`${TMDB_IMG_URL}/w200${movie.belongs_to_collection.poster_path}`}
                    alt={movie.belongs_to_collection.name}
                    width={200}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                ) : (
                  <Image
                    src={noPreview}
                    alt={movie.belongs_to_collection.name}
                    width={200}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                )}
              </section>
            )}

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
