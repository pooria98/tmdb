import noPreview from "@/public/no-preview.png";
import { Badge, Group } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import {
  IconCalendarFilled,
  IconStarFilled,
  IconWorld,
} from "@tabler/icons-react";
import { TMDB_IMG_URL } from "@/lib/constants";
import { Genres, Language, Movie } from "@/types/types";

interface Props {
  items: Movie[];
  genres: Genres;
  languages: Language[];
  media_type: "movies" | "series";
}

const MediaList = ({ items, genres, languages, media_type }: Props) => (
  <div className="flex-1 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
    {items.length > 0 ? (
      items.map((item) => (
        <Link
          href={`/${media_type}/${item.id}`}
          key={item.id}
          className="relative flex flex-col md:flex-row shadow-lg bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden"
        >
          {/* IMAGE */}
          {item.poster_path ? (
            <Image
              src={`${TMDB_IMG_URL}/w500/${item.poster_path}`}
              width={500}
              height={750}
              alt={`${item.title}`}
              className="w-full md:w-64 h-fit block mb-2 md:mb-0 md:p-2 md:rounded-lg"
            />
          ) : (
            <Image
              src={noPreview}
              width={500}
              height={750}
              alt={`${item.title}`}
              className="w-full md:w-64 h-fit block mb-2 md:mb-0 md:p-2 md:rounded-lg"
            />
          )}
          {/* DESCRIPTION */}
          <div className="flex flex-col gap-2 p-2">
            <p className="text-lg font-bold dark:text-white">
              {item.title || item.name || "N/A"}
            </p>
            {/* GENRES */}
            {item.genre_ids && (
              <div className="flex flex-wrap gap-2">
                {item.genre_ids.map((id) => (
                  <Badge key={id} className="cursor-pointer" variant="default">
                    {genres.genres.find((g) => g.id === id)?.name}
                  </Badge>
                ))}
              </div>
            )}
            <p className="mb-4">{item.overview || "No overview..."}</p>
            {/* OTHER INFO */}
            <div className="flex md:flex-col md:items-start md:gap-2 justify-between items-center px-1 md:px-0 text-[var(--mantine-color-dimmed)]">
              <div className="hidden md:flex justify-between items-center gap-2">
                {item.vote_average > 0 && (
                  <Badge variant="default" size="lg">
                    <Group gap="xs">
                      <IconStarFilled
                        size="1rem"
                        color="var(--mantine-color-yellow-5)"
                      />
                      {item.vote_average.toFixed(1)}
                    </Group>
                  </Badge>
                )}
                {item.adult && (
                  <Badge fs={"0.25rem"} color="var(--mantine-color-red-9)">
                    +18
                  </Badge>
                )}
              </div>
              <div className="flex gap-2 items-center text-sm">
                <IconCalendarFilled />
                <p>
                  {media_type === "movies"
                    ? item.release_date
                      ? dayjs(item.release_date).format("YYYY")
                      : "N/A"
                    : item.first_air_date
                    ? dayjs(item.first_air_date).format("YYYY")
                    : "N/A"}
                </p>
              </div>
              <div className="flex gap-2 items-center text-sm">
                <IconWorld />
                <p>
                  {languages.find((l) => l.iso_639_1 === item.original_language)
                    ?.english_name || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))
    ) : (
      <p className="text-center">No items found...</p>
    )}
  </div>
);

export default MediaList;
