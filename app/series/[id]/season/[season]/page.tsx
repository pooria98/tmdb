import { getSeriesSeason } from "@/lib/api";
import { TMDB_IMG_URL } from "@/lib/constants";
import { TmdbSeasonInfo } from "@/types/types";
import noPreview from "@/public/no-preview.png";
import Image from "next/image";
import {
  Container,
  Group,
  Title,
  SimpleGrid,
  Text,
  Stack,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

const Page = async ({
  params,
}: {
  params: Promise<{ id: string; season: string }>;
}) => {
  const { id, season } = await params;
  const seasonInfo: TmdbSeasonInfo = await getSeriesSeason(id, season);

  return (
    <Container size="xl" p="sm">
      <Link
        href={`/series/${id}`}
        className="hover:underline hover:text-primary"
      >
        <Group gap="xs" pt="md" className="mb-8">
          <IconArrowLeft size={20} />
          <Text>Back to movie details page</Text>
        </Group>
      </Link>
      <div className="flex flex-col sm:flex-row gap-4 items-start mb-8">
        {seasonInfo.poster_path ? (
          <Image
            src={`${TMDB_IMG_URL}/w500/${seasonInfo.poster_path}`}
            width={384}
            height={576}
            alt={seasonInfo.name || "title"}
            className="block w-full sm:w-40 h-auto rounded-md"
          />
        ) : (
          <Image
            src={noPreview}
            width={384}
            height={576}
            alt={seasonInfo.name || "title"}
            className="block w-full sm:w-40 h-auto rounded-md"
          />
        )}
        <Stack gap={0} className="flex-1">
          <Title order={2} py="xs">
            {seasonInfo.name}
          </Title>
          <Text className="w-full sm:w-3/4">{seasonInfo.overview}</Text>
        </Stack>
      </div>

      {seasonInfo?.episodes && (
        <Title order={3} className="mb-4">
          Episodes
        </Title>
      )}

      <SimpleGrid cols={{ base: 1, sm: 2 }} mb="md">
        {seasonInfo?.episodes?.map((c, i) => (
          <div key={i} className="flex gap-4 rounded-md items-center">
            {c.still_path ? (
              <Image
                src={`${TMDB_IMG_URL}/w500/${c.still_path}`}
                width={384}
                height={576}
                alt={c.name || "person"}
                className="block w-36 h-auto rounded-md"
              />
            ) : (
              <Image
                src={noPreview}
                width={384}
                height={576}
                alt={c.name || "person"}
                className="block w-36 h-auto rounded-md"
              />
            )}
            <div>
              <Text className="text-sm font-semibold">
                Episode {c.episode_number}
              </Text>
              <Text className="text-sm">{c.name}</Text>
              <Text className="text-sm" c="dimmed">
                {c.air_date}
              </Text>
            </div>
          </div>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Page;
