import { TMDB_IMG_URL } from "@/lib/constants";
import { Group, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";

interface Props {
  company: {
    name: string;
    logo_path: string | null;
  };
}

const CompaniesCard = ({ company }: Props) => {
  return (
    <Group
      gap="sm"
      className="border-l-8 text-black bg-white dark:bg-gray-200 border-l-blue-900 shadow py-2 px-8"
    >
      {company.logo_path && (
        <Image
          src={`${TMDB_IMG_URL}/w200${company.logo_path}`}
          alt={company.name}
          width={200}
          height={200}
          className="object-contain h-8 w-fit"
        />
      )}
      <Text>{company.name}</Text>
    </Group>
  );
};

export default CompaniesCard;
