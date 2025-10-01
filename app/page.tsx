import Hero from "@/components/Hero";
import MovieCarousel from "@/components/MovieCarousel";
import PersonCarousel from "@/components/PersonCarousel";
import ViewMoreButton from "@/components/ViewMoreButton";
import {
  getTopRatedMovies,
  getTopRatedSeries,
  getTrendingMovies,
  getTrendingPeople,
  getTrendingSeries,
} from "@/lib/api";
import { Container, Group, Stack, Title } from "@mantine/core";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TMDB | Home",
  description:
    "The Movie Database (TMDB) is a popular movie and TV show database. this is a fullstack clone of TMDB made with nextjs and mantine.",
};

const HomePage = async () => {
  async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
    try {
      return await promise;
    } catch (err) {
      console.error("Fetch error:", err);
      return fallback;
    }
  }

  const [
    trendingMovies,
    trendingSeries,
    trendingPeople,
    topRatedMovies,
    topRatedSeries,
  ] = await Promise.all([
    safe(getTrendingMovies(), null),
    safe(getTrendingSeries(), null),
    safe(getTrendingPeople(), null),
    safe(getTopRatedMovies(), null),
    safe(getTopRatedSeries(), null),
  ]);

  const hasError =
    !trendingMovies ||
    !trendingSeries ||
    !trendingPeople ||
    !topRatedMovies ||
    !topRatedSeries;

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-red-500 text-lg font-semibold">
          ⚠️ Some content failed to load.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* HERO */}
      <Hero data1={topRatedMovies.results} data2={topRatedSeries.results} />

      <Container size="xl" p="sm">
        {/* TRENDING MOVIES */}
        <Stack gap={0} mb="xl">
          <Group mb="xs" justify="space-between" align="end">
            <Title order={2}>Trending Movies</Title>
            <ViewMoreButton href="/movies">view all movies</ViewMoreButton>
          </Group>
          <MovieCarousel data={trendingMovies.results} />
          <ViewMoreButton href="/movies" small>
            view all movies
          </ViewMoreButton>
        </Stack>

        {/* TRENDING SERIES */}
        <Stack gap={0} mb="xl">
          <Group mb="xs" justify="space-between" align="end">
            <Title order={2}>Trending Series</Title>
            <ViewMoreButton href="/series">view all series</ViewMoreButton>
          </Group>
          <MovieCarousel data={trendingSeries.results} />
          <ViewMoreButton href="/series" small>
            view all series
          </ViewMoreButton>
        </Stack>

        {/* TRENDING PEOPLE */}
        <Stack gap={0} mb="xl">
          <Group mb="xs" justify="space-between" align="end">
            <Title order={2}>Trending Celebrities</Title>
            <ViewMoreButton href="/celebrities">
              view all celebrities
            </ViewMoreButton>
          </Group>
          <PersonCarousel data={trendingPeople.results} />
          <ViewMoreButton href="/celebrities" small>
            view all celebrities
          </ViewMoreButton>
        </Stack>

        {/* TOP-RATED MOVIES */}
        <Stack gap={0} mb="xl">
          <Group mb="xs" justify="space-between" align="end">
            <Title order={2}>Top Rated Movies</Title>
            <ViewMoreButton href="/movies?sort_by=vote_average.desc&min_votes=1500">
              view more
            </ViewMoreButton>
          </Group>
          <MovieCarousel data={topRatedMovies.results} />
          <ViewMoreButton
            href="/movies?sort_by=vote_average.desc&min_votes=1500"
            small
          >
            view more
          </ViewMoreButton>
        </Stack>

        {/* TOP-RATED SERIES */}
        <Stack gap={0} mb="xl">
          <Group mb="xs" justify="space-between" align="end">
            <Title order={2}>Top Rated Series</Title>
            <ViewMoreButton href="/series?sort_by=vote_average.desc&min_votes=1500">
              view more
            </ViewMoreButton>
          </Group>
          <MovieCarousel data={topRatedSeries.results} />
          <ViewMoreButton
            href="/series?sort_by=vote_average.desc&min_votes=1500"
            small
          >
            view more
          </ViewMoreButton>
        </Stack>
      </Container>
    </>
  );
};

export default HomePage;
