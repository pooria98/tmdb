"use client";

import { Button, ButtonGroup, Stack } from "@mantine/core";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sort = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [sort, setSort] = useState<string>("");

  // Sync sort state with URL param on mount and when searchParams change
  useEffect(() => {
    const param = searchParams.get("sort_by") || "";
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
          classNames={{ inner: "flex justify-between" }}
          size="xs"
          variant={sort === "title.desc" ? "filled" : "default"}
          fullWidth
          rightSection={<IconSortDescending />}
          onClick={() => handleSort("title.desc")}
        >
          Title
        </Button>
        <Button
          classNames={{ inner: "flex justify-between" }}
          size="xs"
          variant={sort === "title.asc" ? "filled" : "default"}
          fullWidth
          rightSection={<IconSortAscending />}
          onClick={() => handleSort("title.asc")}
        >
          Title
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button
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
          classNames={{ inner: "flex justify-between" }}
          size="xs"
          variant={
            sort === "vote_average.desc&vote_count.gte=1000"
              ? "filled"
              : "default"
          }
          fullWidth
          rightSection={<IconSortDescending />}
          onClick={() => handleSort("vote_average.desc&vote_count.gte=1000")}
        >
          Rating
        </Button>
        <Button
          classNames={{ inner: "flex justify-between" }}
          size="xs"
          variant={
            sort === "vote_average.asc&vote_count.gte=1000"
              ? "filled"
              : "default"
          }
          fullWidth
          rightSection={<IconSortAscending />}
          onClick={() => handleSort("vote_average.asc&vote_count.gte=1000")}
        >
          Rating
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button
          classNames={{ inner: "flex justify-between" }}
          size="xs"
          variant={sort === "vote_average.desc" ? "filled" : "default"}
          fullWidth
          rightSection={<IconSortDescending />}
          onClick={() => handleSort("vote_average.desc")}
        >
          Average Votes
        </Button>
        <Button
          classNames={{ inner: "flex justify-between" }}
          size="xs"
          variant={sort === "vote_average.asc" ? "filled" : "default"}
          fullWidth
          rightSection={<IconSortAscending />}
          onClick={() => handleSort("vote_average.asc")}
        >
          Average Votes
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button
          classNames={{ inner: "flex justify-between" }}
          size="xs"
          variant={sort === "primary_release_date.desc" ? "filled" : "default"}
          fullWidth
          rightSection={<IconSortDescending />}
          onClick={() => handleSort("primary_release_date.desc")}
        >
          Release Date
        </Button>
        <Button
          classNames={{ inner: "flex justify-between" }}
          size="xs"
          variant={sort === "primary_release_date.asc" ? "filled" : "default"}
          fullWidth
          rightSection={<IconSortAscending />}
          onClick={() => handleSort("primary_release_date.asc")}
        >
          Release Date
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default Sort;
