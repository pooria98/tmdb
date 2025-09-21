"use client";

import { Button, ButtonGroup, Stack } from "@mantine/core";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { Attributes, useEffect, useState } from "react";

const Sort = ({ sortType }: { sortType: "movies" | "series" | Attributes }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [sort, setSort] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  // Sync sort state with URL param on mount and when searchParams change
  useEffect(() => {
    const param = searchParams.get("sort_by") || "";
    const query = searchParams.get("query") || "";
    if (query) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
    setSort(param);
  }, [searchParams]);

  // Handle sort button
  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("sort_by", value);
    setSort(value);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Stack gap="xs">
      <ButtonGroup>
        <Button
          disabled={isSearching}
          classNames={{ inner: "flex justify-between" }}
          size="xs"
          variant={sort === "title.desc" ? "filled" : "default"}
          fullWidth
          rightSection={<IconSortDescending />}
          onClick={() =>
            handleSort(sortType === "movies" ? "title.desc" : "name.desc")
          }
        >
          Title
        </Button>
        <Button
          disabled={isSearching}
          classNames={{ inner: "flex justify-between" }}
          size="xs"
          variant={sort === "title.asc" ? "filled" : "default"}
          fullWidth
          rightSection={<IconSortAscending />}
          onClick={() =>
            handleSort(sortType === "movies" ? "title.asc" : "name.asc")
          }
        >
          Title
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button
          disabled={isSearching}
          classNames={{ inner: "flex justify-between" }}
          size="xs"
          variant={sort === "popularity.desc" ? "filled" : "default"}
          fullWidth
          rightSection={<IconSortDescending />}
          onClick={() => handleSort("popularity.desc")}
        >
          Popularity
        </Button>
        <Button
          disabled={isSearching}
          classNames={{ inner: "flex justify-between" }}
          size="xs"
          variant={sort === "popularity.asc" ? "filled" : "default"}
          fullWidth
          rightSection={<IconSortAscending />}
          onClick={() => handleSort("popularity.asc")}
        >
          Popularity
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button
          disabled={isSearching}
          classNames={{ inner: "flex justify-between" }}
          size="xs"
          variant={sort === "vote_average.desc" ? "filled" : "default"}
          fullWidth
          rightSection={<IconSortDescending />}
          onClick={() => handleSort("vote_average.desc")}
        >
          Rating
        </Button>
        <Button
          disabled={isSearching}
          classNames={{ inner: "flex justify-between" }}
          size="xs"
          variant={sort === "vote_average.asc" ? "filled" : "default"}
          fullWidth
          rightSection={<IconSortAscending />}
          onClick={() => handleSort("vote_average.asc")}
        >
          Rating
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button
          disabled={isSearching}
          classNames={{ inner: "flex justify-between" }}
          size="xs"
          variant={sort === "primary_release_date.desc" ? "filled" : "default"}
          fullWidth
          rightSection={<IconSortDescending />}
          onClick={() =>
            handleSort(
              sortType === "movies"
                ? "primary_release_date.desc"
                : "first_air_date.desc"
            )
          }
        >
          Release Date
        </Button>
        <Button
          disabled={isSearching}
          classNames={{ inner: "flex justify-between" }}
          size="xs"
          variant={sort === "primary_release_date.asc" ? "filled" : "default"}
          fullWidth
          rightSection={<IconSortAscending />}
          onClick={() =>
            handleSort(
              sortType === "movies"
                ? "primary_release_date.asc"
                : "first_air_date.asc"
            )
          }
        >
          Release Date
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default Sort;
