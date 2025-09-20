"use client";

import { TMDB_BASE_URL } from "@/lib/constants";
import { Genre, Language } from "@/types/types";
import {
  Button,
  Checkbox,
  MultiSelect,
  Select,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const startYear = 1874;
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) =>
  String(currentYear - i)
);

const genresUrl = `${TMDB_BASE_URL}/genre/movie/list`;
const languagesUrl = `${TMDB_BASE_URL}/configuration/languages`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2ZmODdlYmY4NWE4OTY3ZTI4NWQ1Zjk3ZTQyMjFkOSIsIm5iZiI6MTc1NjQ4NTIyMi4zMDcwMDAyLCJzdWIiOiI2OGIxZDY2NjI1ZTEwM2I4OWYzOTczNzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.i11hmy3z1anXQSj86X16IfdYXngwgOo7At1ahVc-bJc",
  },
};

const Filters = () => {
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Controlled states for filters
  const [includeAdult, setIncludeAdult] = useState(false);
  const [includeNonMovies, setIncludeNonMovies] = useState(false);
  const [year, setYear] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [minVoteCount, setMinVoteCount] = useState<number>(0);

  const fetchGenres = async () => {
    const res = await fetch(genresUrl, options);
    const data = await res.json();
    setGenres(data.genres);
  };

  const fetchLanguages = async () => {
    const res = await fetch(languagesUrl, options);
    const data = await res.json();
    setLanguages(data);
  };

  useEffect(() => {
    fetchGenres();
    fetchLanguages();
  }, []);

  // Sync filter states with URL params on mount and when searchParams change
  useEffect(() => {
    setIncludeAdult(searchParams.get("include_adult") === "true");
    setIncludeNonMovies(searchParams.get("include_video") === "true");
    setYear(searchParams.get("primary_release_year") || null);
    setLanguage(searchParams.get("with_original_language") || null);
    const genresParam = searchParams.get("with_genres");
    setSelectedGenres(genresParam ? genresParam.split(",") : []);
    setMinRating(Number(searchParams.get("min_rating")) || 0);
    setMinVoteCount(Number(searchParams.get("min_votes")) || 0);
  }, [searchParams]);

  // Helper to update query params
  const updateParam = (
    key: string,
    value: string | string[] | boolean | null
  ) => {
    const params = new URLSearchParams(searchParams);
    if (
      value === null ||
      value === false ||
      (Array.isArray(value) && value.length === 0)
    ) {
      params.delete(key);
    } else if (Array.isArray(value)) {
      params.set(key, value.join(","));
    } else {
      params.set(key, String(value));
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // Clear filters handler
  const handleClearFilters = () => {
    setIncludeAdult(false);
    setIncludeNonMovies(false);
    setYear(null);
    setLanguage(null);
    setSelectedGenres([]);
    setMinRating(0);
    setMinVoteCount(0);
    const params = new URLSearchParams(searchParams);
    params.delete("include_adult");
    params.delete("include_video");
    params.delete("primary_release_year");
    params.delete("with_original_language");
    params.delete("with_genres");
    params.delete("min_rating");
    params.delete("min_votes");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Stack>
      <Checkbox
        label="Include Adult"
        checked={includeAdult}
        onChange={(e) => {
          setIncludeAdult(e.target.checked);
          updateParam("include_adult", e.target.checked);
        }}
      />
      <Checkbox
        label="Include Non-movies"
        checked={includeNonMovies}
        onChange={(e) => {
          setIncludeNonMovies(e.target.checked);
          updateParam("include_video", e.target.checked);
        }}
      />
      <Select
        label="Year"
        placeholder="Pick value"
        data={years}
        searchable
        autoSelectOnBlur
        clearable
        value={year}
        onChange={(val) => {
          setYear(val);
          updateParam("primary_release_year", val);
        }}
      />
      <Select
        label="Language"
        placeholder="Pick value"
        data={
          languages &&
          languages.map((lang: Language) => ({
            label: `${lang.english_name} (${lang.iso_639_1})`,
            value: lang.iso_639_1,
          }))
        }
        searchable
        autoSelectOnBlur
        clearable
        value={language}
        onChange={(val) => {
          setLanguage(val);
          updateParam("with_original_language", val);
        }}
      />
      <MultiSelect
        label="Genres"
        placeholder="Pick multiple values"
        data={genres && genres.map((genre: Genre) => genre.name)}
        searchable
        clearable
        value={selectedGenres}
        onChange={(vals) => {
          setSelectedGenres(vals);
          updateParam("with_genres", vals);
        }}
        className="mb-2"
      />
      <>
        <Text size="sm" fw={500}>
          Minimum Rating
        </Text>
        <Slider
          min={0}
          max={10}
          step={0.5}
          value={minRating}
          onChange={(val) => {
            setMinRating(val);
            updateParam("min_rating", String(val));
          }}
        />
      </>
      <>
        <Text size="sm" fw={500}>
          Minimum Vote Counts
        </Text>
        <Slider
          min={0}
          max={10000}
          step={100}
          value={minVoteCount}
          onChange={(val) => {
            setMinVoteCount(val);
            updateParam("min_votes", String(val));
          }}
        />
      </>
      {includeAdult !== false ||
      includeNonMovies !== false ||
      year !== null ||
      language !== null ||
      selectedGenres.length > 0 ||
      minRating > 0 ||
      minVoteCount > 0 ? (
        <Button
          type="button"
          onClick={handleClearFilters}
          style={{ marginTop: "1rem", alignSelf: "flex-start" }}
        >
          Clear Filters
        </Button>
      ) : null}
    </Stack>
  );
};

export default Filters;
