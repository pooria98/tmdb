import { TMDB_BASE_URL, TMDB_OPTIONS } from "./constants";

async function fetchFromTMDB(endpoint: string) {
  const res = await fetch(`${TMDB_BASE_URL}${endpoint}`, TMDB_OPTIONS);

  if (!res.ok) {
    throw new Error(`TMDB fetch error: ${res.status}`);
  }

  return res.json();
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

// PEOPLE

export async function getTrendingPeople() {
  return fetchFromTMDB("/trending/person/day");
}

export async function getPopularPeople() {
  return fetchFromTMDB("/person/popular");
}

// GENRES

export async function getMovieGenres() {
  return fetchFromTMDB("/genre/movie/list");
}

export async function getSeriesGenres() {
  return fetchFromTMDB("/genre/tv/list");
}
