import { TMDB_BASE_URL, TMDB_OPTIONS } from "./constants";

// FAVORITES
export const getFavoriteStatus = async (
  userId: string,
  mediaId: string,
  type: "movie" | "series"
) => {
  const res = await fetch(
    `http://localhost:3000/api/favorites?userId=${userId}&mediaId=${mediaId}&type=${type}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch favorite status");
  }
  const data: { favorite: boolean } = await res.json();
  return data.favorite;
};

// TMDB

async function fetchFromTMDB(endpoint: string) {
  const res = await fetch(`${TMDB_BASE_URL}${endpoint}`, TMDB_OPTIONS);

  if (!res.ok) {
    // A more specific error message can be helpful for debugging.
    const errorBody = await res.text();
    console.error(
      `TMDB fetch error: ${res.status} for endpoint: ${endpoint}. Body: ${errorBody}`
    );
    throw new Error(`TMDB fetch error: ${res.status}`);
  }

  // Handle cases where the response might be empty
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

// CONFIG

export async function getLanguages() {
  return fetchFromTMDB("/configuration/languages");
}

// SEARCH

export async function searchMovies(
  query: string,
  include_adult: boolean = false,
  primary_release_year?: string,
  page?: number
) {
  return fetchFromTMDB(
    `/search/movie?query=${query}&include_adult=${include_adult}&primary_release_year=${primary_release_year}&page=${
      page || 1
    }`
  );
}

export async function searchSeries(
  query: string,
  include_adult: boolean = false,
  first_air_date_year?: string,
  page?: number
) {
  return fetchFromTMDB(
    `/search/tv?query=${query}&include_adult=${include_adult}&first_air_date_year=${first_air_date_year}&page=${
      page || 1
    }`
  );
}

export async function searchCelebrities(query: string, page?: number) {
  return fetchFromTMDB(
    `/search/person?query=${query}&include_adult=true&page=${page || 1}`
  );
}

// MOVIES

export async function getTrendingMovies() {
  return fetchFromTMDB("/trending/movie/day");
}

export async function getPopularMovies() {
  return fetchFromTMDB("/movie/popular");
}

export async function getTopRatedMovies() {
  return fetchFromTMDB("/movie/top_rated");
}

export async function getMovies(
  sort_by: string,
  include_adult: boolean = false,
  include_video: boolean = false,
  primary_release_year?: string,
  with_original_language?: string,
  with_genres?: string,
  min_rating?: number,
  min_votes?: number,
  page?: number
) {
  return fetchFromTMDB(
    `/discover/movie?sort_by=${sort_by}&include_adult=${include_adult}&include_video=${include_video}&primary_release_year=${primary_release_year}&with_original_language=${with_original_language}&vote_average.gte=${min_rating}&vote_count.gte=${min_votes}&with_genres=${with_genres}&page=${
      page || 1
    }`
  );
}

export async function getMovieDetails(id: string) {
  return fetchFromTMDB(`/movie/${id}`);
}

export async function getMovieExternalIDs(id: string) {
  return fetchFromTMDB(`/movie/${id}/external_ids`);
}

export async function getMovieCredits(id: string) {
  return fetchFromTMDB(`/movie/${id}/credits`);
}

export async function getMovieRecommendations(id: string) {
  return fetchFromTMDB(`/movie/${id}/recommendations`);
}

// SERIES

export async function getTrendingSeries() {
  return fetchFromTMDB("/trending/tv/day");
}

export async function getPopularSeries() {
  return fetchFromTMDB("/tv/popular");
}

export async function getTopRatedSeries() {
  return fetchFromTMDB("/tv/top_rated");
}

export async function getSeries(
  sort_by: string,
  include_adult: boolean = false,
  first_air_date_year?: string,
  with_original_language?: string,
  with_genres?: string,
  min_rating?: number,
  min_votes?: number,
  page?: number
) {
  return fetchFromTMDB(
    `/discover/tv?sort_by=${sort_by}&include_adult=${include_adult}&first_air_date_year=${first_air_date_year}&with_original_language=${with_original_language}&vote_average.gte=${min_rating}&vote_count.gte=${min_votes}&with_genres=${with_genres}&page=${
      page || 1
    }`
  );
}

export async function getSeriesDetails(id: string) {
  return fetchFromTMDB(`/tv/${id}`);
}

export async function getSeriesExternalIDs(id: string) {
  return fetchFromTMDB(`/tv/${id}/external_ids`);
}

export async function getSeriesCredits(id: string) {
  return fetchFromTMDB(`/tv/${id}/credits`);
}

export async function getSeriesRecommendations(id: string) {
  return fetchFromTMDB(`/tv/${id}/recommendations`);
}

export async function getSeriesSeason(
  series_id: string,
  season_number: string
) {
  return fetchFromTMDB(`/tv/${series_id}/season/${season_number}
`);
}

// CELEBRITIES

export async function getTrendingPeople() {
  return fetchFromTMDB("/trending/person/day");
}

export async function getPopularPeople(page?: number) {
  return fetchFromTMDB(`/person/popular?page=${page || 1}`);
}

export async function getCelebritiesDetails(id: string) {
  return fetchFromTMDB(`/person/${id}`);
}

export async function getPersonExternalIds(id: string) {
  return fetchFromTMDB(`/person/${id}/external_ids`);
}

export async function getPersonCombinedCredits(id: string) {
  return fetchFromTMDB(`/person/${id}/combined_credits`);
}

// GENRES

export async function getMovieGenres() {
  return fetchFromTMDB("/genre/movie/list");
}

export async function getSeriesGenres() {
  return fetchFromTMDB("/genre/tv/list");
}
