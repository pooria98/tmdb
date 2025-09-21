"use client";

import { Button, Input } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { IconSearch, IconX } from "@tabler/icons-react";
import { FormEvent, useEffect, useState } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [value, setValue] = useState("");

  const handleSearch = (event: FormEvent, term: string) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
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
        <Button type="submit" radius="xl">
          Search
        </Button>
      </form>
    </>
  );
};

export default Search;
