"use client";

import { Button, Collapse, Input, Popover, Select } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  IconFilter,
  IconSearch,
  IconSortDescending,
  IconX,
} from "@tabler/icons-react";
import { FormEvent, useEffect, useState } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [value, setValue] = useState("");
  const [sort, setSort] = useState<string | null>("popularity.desc");
  const [opened, setOpened] = useState(false);

  const handleSearch = (event: FormEvent, term: string) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    params.set("sort_by", sort || "");
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const query = searchParams.get("query")?.toString() || "";
    setValue(query);
  }, [searchParams]);

  return (
    <>
      <form
        onSubmit={(e) => handleSearch(e, value)}
        className="flex gap-2 w-full py-4"
      >
        <Input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="Search..."
          leftSection={<IconSearch />}
          rightSection={
            value && (
              <IconX
                size={16}
                className="cursor-pointer"
                onClick={() => setValue("")}
              />
            )
          }
          rightSectionPointerEvents="all"
          radius="xl"
          className="flex-1"
        />

        <Button
          variant="outline"
          radius="xl"
          leftSection={<IconFilter size={16} />}
          onClick={() => setOpened((prev) => !prev)}
        >
          Filters
        </Button>

        <Popover width={300} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button
              variant="outline"
              radius="xl"
              leftSection={<IconSortDescending size={16} />}
            >
              Sort
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Select
              value={sort}
              onChange={setSort}
              placeholder="Sort"
              data={[
                { value: "popularity.desc", label: "Popularity (desc)" },
                { value: "popularity.asc", label: "Popularity (asc)" },
                { value: "vote_average.desc", label: "Rating (desc)" },
                { value: "vote_average.asc", label: "Rating (asc)" },
                {
                  value: "primary_release_date.desc",
                  label: "Release Date (desc)",
                },
                {
                  value: "primary_release_date.asc",
                  label: "Release Date (asc)",
                },
              ]}
              comboboxProps={{ withinPortal: false }}
            />
          </Popover.Dropdown>
        </Popover>

        <Button type="submit" radius="xl">
          Search
        </Button>
      </form>

      <Collapse in={opened}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
          exercitationem dignissimos sint ipsa eius blanditiis est totam
          aspernatur iusto earum, odio temporibus quaerat rem iste omnis aperiam
          animi illum qui.
        </p>
      </Collapse>
    </>
  );
};

export default Search;
