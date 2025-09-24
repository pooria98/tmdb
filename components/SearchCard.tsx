import { TmdbSearchResult } from "@/types/types";
import Image from "next/image";
import noPreview from "@/public/no-preview.png";
import { TMDB_IMG_URL } from "@/lib/constants";
import { Badge } from "@mantine/core";
import Link from "next/link";

const SearchCard = ({
  item,
  all = false,
}: {
  item: TmdbSearchResult;
  all?: boolean;
}) => {
  return (
    <>
      <Link
        href={
          item.media_type === "movie"
            ? `/movies/${item.id}`
            : item.media_type === "tv"
            ? `/series/${item.id}`
            : `/celebrities/${item.id}`
        }
        className="flex rounded-lg overflow-hidden shadow mb-4 border border-gray-100"
      >
        {item.poster_path || item.profile_path ? (
          <Image
            width={200}
            height={300}
            src={`${TMDB_IMG_URL}/w200/${
              item.poster_path || item.profile_path
            }`}
            alt={item.title || item.name || "title"}
            className="w-20 h-auto block"
          />
        ) : (
          <Image
            width={200}
            height={300}
            src={noPreview}
            alt={item.title || item.name || "title"}
            className="w-20 h-auto block"
          />
        )}

        <div className="p-4">
          <p className="font-semibold">{item.title || item.name}</p>

          {all && (
            <p className="text-sm text-[var(--mantine-color-dimmed)]">
              ({item.media_type})
            </p>
          )}

          {item.adult && (
            <Badge size="xs" color="red">
              +18
            </Badge>
          )}
        </div>
      </Link>
    </>
  );
};

export default SearchCard;
