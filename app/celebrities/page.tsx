import PaginationControls from "@/components/PaginationControls";
import Search from "@/components/Search";
import { getPopularPeople, searchCelebrities } from "@/lib/api";
import { TMDB_IMG_URL } from "@/lib/constants";
import { Persons } from "@/types/types";
import { Card, CardSection, Container, SimpleGrid, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: number }>;
}) => {
  const query = (await searchParams)?.query || "";
  const page = (await searchParams)?.page || 1;
  const celebrities: Persons = query
    ? await searchCelebrities(query, page)
    : await getPopularPeople(page);

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
                  <Image
                    src={`${TMDB_IMG_URL}/w500/${celeb.profile_path}`}
                    width={384}
                    height={576}
                    alt={celeb.name}
                    className="block w-full h-auto"
                  />
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
