import { getMovieCredits, getSeriesCredits } from "@/lib/api";
import { TMDB_IMG_URL } from "@/lib/constants";
import { CombinedCredits } from "@/types/types";
import noPreview from "@/public/no-preview.png";
import {
  Container,
  Title,
  Text,
  Group,
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  SimpleGrid,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
  type: "movies" | "series";
}

const FullCastCrew = async ({ params, type }: Props) => {
  const { id } = await params;
  let credits: CombinedCredits | null = null;
  if (type === "movies") {
    credits = await getMovieCredits(id);
  } else if (type === "series") {
    credits = await getSeriesCredits(id);
  }
  const cast = credits?.cast ?? [];
  const crew = credits?.crew ?? [];

  const groupedCrew = crew.reduce<Record<string, (typeof crew)[number][]>>(
    (acc, member) => {
      const dept = member.department ?? "Unknown";
      if (!acc[dept]) acc[dept] = [];
      acc[dept].push(member);
      return acc;
    },
    {}
  );

  const groupedArray = Object.entries(groupedCrew).map(
    ([department, members]) => ({
      department,
      members,
    })
  );

  return (
    <Container size="xl" p="sm">
      <Group justify="space-between">
        <Link
          href={`/${type === "movies" ? "movies" : "series"}/${id}`}
          className="hover:underline hover:text-primary"
        >
          <Group gap="xs" py="lg">
            <IconArrowLeft size={20} />
            <Text>Back to movie details page</Text>
          </Group>
        </Link>

        <Title order={2} py="lg">
          Cast and Crew
        </Title>
      </Group>

      <Accordion multiple variant="separated" defaultValue={["cast"]}>
        <AccordionItem value="cast">
          <AccordionControl>
            <Title order={4}>Cast</Title>
          </AccordionControl>
          <AccordionPanel>
            <SimpleGrid cols={{ base: 1, sm: 2 }} mb="md">
              {cast.map((c, i) => (
                <Link
                  href={`/celebrities/${c.id}`}
                  key={i}
                  className="flex gap-4 rounded-md items-center p-2 hover:text-primary w-fit"
                >
                  {c.profile_path ? (
                    <Image
                      src={`${TMDB_IMG_URL}/w500/${c.profile_path}`}
                      width={384}
                      height={576}
                      alt={c.name || "person"}
                      className="block w-16 h-auto rounded-md"
                    />
                  ) : (
                    <Image
                      src={noPreview}
                      width={384}
                      height={576}
                      alt={c.name || "person"}
                      className="block w-16 h-auto rounded-md"
                    />
                  )}
                  <div>
                    <Title order={5}>{c.name}</Title>
                    <Text>{c.character}</Text>
                  </div>
                </Link>
              ))}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>

        {groupedArray.map(({ department, members }) => (
          <AccordionItem value={department} key={department}>
            <AccordionControl>
              <Title order={4}>{department}</Title>
            </AccordionControl>
            <AccordionPanel>
              <SimpleGrid cols={{ base: 1, sm: 2 }} mb="md">
                {members.map((c, i) => (
                  <Link
                    href={`/celebrities/${c.id}`}
                    key={i}
                    className="flex gap-4 rounded-md items-center p-2 hover:text-primary w-fit"
                  >
                    {c.profile_path ? (
                      <Image
                        src={`${TMDB_IMG_URL}/w500/${c.profile_path}`}
                        width={384}
                        height={576}
                        alt={c.name || "person"}
                        className="block w-16 h-auto rounded-md"
                      />
                    ) : (
                      <Image
                        src={noPreview}
                        width={384}
                        height={576}
                        alt={c.name || "person"}
                        className="block w-16 h-auto rounded-md"
                      />
                    )}
                    <div>
                      <Title order={5}>{c.name}</Title>
                      <Text>{c.job}</Text>
                    </div>
                  </Link>
                ))}
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};

export default FullCastCrew;
