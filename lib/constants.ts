export const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const TMDB_IMG_URL = "https://image.tmdb.org/t/p";

export const TMDB_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY!}`,
  },
};
