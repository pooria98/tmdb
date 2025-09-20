"use client";

import { Pagination } from "@mantine/core";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PaginationControls = ({ total }: { total: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const param = Number(searchParams.get("page")) || 1;
    setPage(param);
  }, [searchParams]);

  const handleChange = (value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    setPage(value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      value={page}
      onChange={handleChange}
      total={total}
      mt="md"
      classNames={{ root: "flex justify-center p-8" }}
    />
  );
};

export default PaginationControls;
