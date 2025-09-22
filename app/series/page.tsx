import {
  getLanguages,
  getSeries,
  getSeriesGenres,
  searchSeries,
} from "@/lib/api";
import { Genres, Language, Movies } from "@/types/types";
import { Container, Title } from "@mantine/core";
import PaginationControls from "@/components/PaginationControls";
import MediaList from "@/components/MediaList";
import SortAndFiltersSection from "@/components/SortAndFiltersSection";
import Search from "@/components/Search";

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    sort_by?: string;
    include_adult?: boolean;
    first_air_date_year?: string;
    with_original_language?: string;
    with_genres?: string;
    min_rating?: number;
    min_votes?: number;
    page?: number;
  }>;
}) => {
  const query = (await searchParams)?.query || "";
  const sort_by = (await searchParams)?.sort_by || "";
  const include_adult = (await searchParams)?.include_adult || false;
  const first_air_date_year = (await searchParams)?.first_air_date_year || "";
  const with_original_language =
    (await searchParams)?.with_original_language || "";
  const with_genres = (await searchParams)?.with_genres || "";
  const min_rating = (await searchParams)?.min_rating || 0;
  const min_votes = (await searchParams)?.min_votes || 0;
  const page = (await searchParams)?.page || 1;
  const movies: Movies = query
    ? await searchSeries(query, include_adult, first_air_date_year, page)
    : await getSeries(
        sort_by,
        include_adult,
        first_air_date_year,
        with_original_language,
        with_genres,
        min_rating,
        min_votes,
        page
      );
  const genres: Genres = await getSeriesGenres();
  const languages: Language[] = await getLanguages();
  return (
    <Container size="xl" p="sm">
      <Title order={1} py="md">
        Series
      </Title>
      <Search />
      <div className="flex flex-col md:flex-row gap-2">
        <SortAndFiltersSection filterType="series" sortType="series" />
        <MediaList
          items={movies.results}
          genres={genres}
          languages={languages}
          media_type="series"
        />
      </div>
      {movies.total_pages > 1 && (
        <PaginationControls
          total={movies.total_pages <= 500 ? movies.total_pages : 500}
        />
      )}
    </Container>
  );
};

export default Page;
