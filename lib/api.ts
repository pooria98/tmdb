import { TMDB_BASE_URL, TMDB_OPTIONS } from "./constants";

async function fetchFromTMDB(endpoint: string) {
  const res = await fetch(`${TMDB_BASE_URL}${endpoint}`, TMDB_OPTIONS);

  if (!res.ok) {
    throw new Error(`TMDB fetch error: ${res.status}`);
  }

  return res.json();
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

export async function getMovies() {
  return fetchFromTMDB("/discover/movie");
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

// PEOPLE

export async function getTrendingPeople() {
  return fetchFromTMDB("/trending/person/day");
}

export async function getPopularPeople() {
  return fetchFromTMDB("/person/popular");
}
