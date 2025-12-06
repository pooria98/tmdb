import noPreview from "@/public/no-preview.png";
import PaginationControls from "@/components/PaginationControls";
import Search from "@/components/Search";
import { getPopularPeople, searchCelebrities } from "@/lib/api";
import { TMDB_IMG_URL } from "@/lib/constants";
import { Persons } from "@/types/types";
import {
  Card,
  CardSection,
  Container,
  SimpleGrid,
  Title,
  Text,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TMDB | Celebrities",
  description:
    "Find your favorite celebrities based on your favorite movies and TV shows.",
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: number }>;
}) => {
  let celebrities: Persons | null = null;
  let fetchError = false;

  const query = (await searchParams)?.query || "";
  const page = (await searchParams)?.page || 1;
  try {
    celebrities = query
      ? await searchCelebrities(query, page)
      : await getPopularPeople(page);
  } catch (error) {
    console.error(error);
    fetchError = true;
  }

  if (fetchError || !celebrities) {
    return (
      <div className="w-full h-full flex flex-col gap-8 justify-center items-center py-16">
        <Title order={3}>
          Something went wrong! Failed to fetch celebrities list.
        </Title>
        <Text>
          TMDB API might be down or blocked in your country (try using a VPN)
        </Text>
        <Text>Try again later or refresh the page</Text>
      </div>
    );
  }

  return (
    <Container size="xl" p="sm">
      <Title order={1}>Celebrities</Title>
      <Search />
      <div>
        <SimpleGrid cols={{ base: 2, xs: 3, sm: 4, md: 5 }}>
          {celebrities.results.map((celeb) => (
            <Link href={`/celebrities/${celeb.id}`} key={celeb.id}>
              <Card shadow="sm" padding="sm" radius="md" withBorder>
                <CardSection mb="sm">
                  {celeb.profile_path ? (
                    <Image
                      src={`${TMDB_IMG_URL}/w500/${celeb.profile_path}`}
                      width={384}
                      height={576}
                      alt={celeb.name}
                      className="block w-full h-auto"
                    />
                  ) : (
                    <Image
                      src={noPreview}
                      width={384}
                      height={576}
                      alt={celeb.name}
                      className="block w-full h-auto"
                    />
                  )}
                </CardSection>
                <p>{celeb.name}</p>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </div>
      {celebrities.total_pages > 1 && (
        <PaginationControls
          total={celebrities.total_pages <= 500 ? celebrities.total_pages : 500}
        />
      )}
    </Container>
  );
};

export default page;
