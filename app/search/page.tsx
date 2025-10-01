"use client";

import {
  Alert,
  Badge,
  Checkbox,
  CloseButton,
  Container,
  Input,
  Loader,
  Pagination,
  Tabs,
  Text,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconInfoCircle, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { TmdbAllSearchResponse } from "@/types/types";
import SearchCard from "@/components/SearchCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TMDB | Search",
  description:
    "Search for your favorite movies, series, and celebrities from the biggest movie database in the world.",
};

const Page = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 500);
  const [includeAdult, setIncludeAdult] = useState(false);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState("all");

  const [data, setData] = useState<TmdbAllSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateParam = (
    key: string,
    value: string | string[] | boolean | null
  ) => {
    const params = new URLSearchParams(searchParams);
    if (value === null || value === false) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setValue(searchParams.get("q") || "");
    setIncludeAdult(searchParams.get("adult") === "true");
    setPage(Number(searchParams.get("page")) || 1);
    setTab(searchParams.get("tab") || "all");
  }, [searchParams]);

  useEffect(() => {
    const search = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/tmdb/search?query=${debounced}&include_adult=${includeAdult}&page=${page}`
        );
        const data = await res.data;
        setData(data);
        setError("");
      } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    if (debounced) search();
  }, [debounced, includeAdult, page]);
  return (
    <>
      <div className="w-full bg-gray-200 dark:bg-gray-800">
        <Container size="xl" className="px-0 py-1">
          <Input
            size="md"
            placeholder="Search everything..."
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value);
              updateParam("q", e.currentTarget.value);
            }}
            leftSection={
              <IconSearch size={20} color="var(--mantine-color-placeholder)" />
            }
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => setValue("")}
                style={{ display: value ? undefined : "none" }}
              />
            }
            rightSectionPointerEvents="all"
            variant="unstyled"
          />
        </Container>
      </div>
      <Container size="xl" p="sm">
        <Checkbox
          label="Include Adult"
          className="ml-3"
          ml={0}
          mb="xs"
          checked={includeAdult}
          onChange={(e) => {
            setIncludeAdult(e.currentTarget.checked);
            updateParam("adult", e.target.checked);
          }}
        />

        {loading && (
          <div className="w-full flex justify-center items-center">
            <Loader type="dots" />
          </div>
        )}

        {error && (
          <div className="w-full flex justify-center items-center">
            <Alert
              variant="light"
              color="red"
              title="Error"
              icon={<IconInfoCircle />}
            >
              {error}
            </Alert>
          </div>
        )}

        {data && data?.total_results === 0 && (
          <div className="w-full flex justify-center items-center">
            <Alert
              variant="light"
              color="blue"
              title="No results"
              icon={<IconInfoCircle />}
            >
              No results found
            </Alert>
          </div>
        )}

        {data && data?.total_results > 0 && (
          <>
            <Text my="md" c="dimmed" fs="italic">
              Found {data?.total_results} results...
            </Text>
            <Pagination
              size="sm"
              radius="xl"
              my="xl"
              total={data?.total_pages > 500 ? 500 : data?.total_pages}
              value={page}
              onChange={(value) => {
                setPage(value);
                updateParam("page", String(value));
              }}
            />
            <Tabs defaultValue={tab}>
              <Tabs.List className="font-semibold mb-4">
                <Tabs.Tab
                  value="all"
                  onClick={() => updateParam("tab", "all")}
                  rightSection={<Badge size="sm">{data?.results.length}</Badge>}
                >
                  All results
                </Tabs.Tab>
                <Tabs.Tab
                  value="movies"
                  onClick={() => updateParam("tab", "movies")}
                  rightSection={
                    data?.results.filter((r) => r.media_type === "movie")
                      .length > 0 && (
                      <Badge size="sm">
                        {
                          data?.results.filter((r) => r.media_type === "movie")
                            .length
                        }
                      </Badge>
                    )
                  }
                >
                  Movies
                </Tabs.Tab>
                <Tabs.Tab
                  value="series"
                  onClick={() => updateParam("tab", "series")}
                  rightSection={
                    data?.results.filter((r) => r.media_type === "tv").length >
                      0 && (
                      <Badge size="sm">
                        {
                          data?.results.filter((r) => r.media_type === "tv")
                            .length
                        }
                      </Badge>
                    )
                  }
                >
                  Series
                </Tabs.Tab>
                <Tabs.Tab
                  value="celebrities"
                  onClick={() => updateParam("tab", "celebrities")}
                  rightSection={
                    data?.results.filter((r) => r.media_type === "person")
                      .length > 0 && (
                      <Badge size="sm">
                        {
                          data?.results.filter((r) => r.media_type === "person")
                            .length
                        }
                      </Badge>
                    )
                  }
                >
                  Celebrities
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="all">
                {data?.results.map((item) => (
                  <SearchCard key={item.id} item={item} all />
                ))}
              </Tabs.Panel>

              <Tabs.Panel value="movies">
                {data?.results
                  .filter((r) => r.media_type === "movie")
                  .map((item) => (
                    <SearchCard key={item.id} item={item} />
                  ))}
              </Tabs.Panel>

              <Tabs.Panel value="series">
                {data?.results
                  .filter((r) => r.media_type === "tv")
                  .map((item) => (
                    <SearchCard key={item.id} item={item} />
                  ))}
              </Tabs.Panel>

              <Tabs.Panel value="celebrities">
                {data?.results
                  .filter((r) => r.media_type === "person")
                  .map((item) => (
                    <SearchCard key={item.id} item={item} />
                  ))}
              </Tabs.Panel>
            </Tabs>
            <Pagination
              size="sm"
              radius="xl"
              my="xl"
              total={data?.total_pages > 500 ? 500 : data?.total_pages}
              value={page}
              onChange={(value) => {
                setPage(value);
                updateParam("page", String(value));
              }}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default Page;
