import noPreview from "@/public/no-preview.png";
import { Container, Title, Text, Group, Stack, Badge } from "@mantine/core";
import Image from "next/image";
import SocialIcon from "@/components/SocialIcon";
import { CombinedCredits, TmdbPersonDetails, ExternalIds } from "@/types/types";
import {
  getCelebritiesDetails,
  getFavoriteStatus,
  getPersonCombinedCredits,
  getPersonExternalIds,
} from "@/lib/api";
import { TMDB_IMG_URL } from "@/lib/constants";
import dayjs from "dayjs";
import MovieCarousel from "@/components/MovieCarousel";
import { IconCircle } from "@tabler/icons-react";
import Link from "next/link";
import Biography from "@/components/Biography";
import MediaImage from "@/components/MediaImage";
import { Metadata } from "next";
import FavoriteButton from "@/components/FavoriteButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const person = await getCelebritiesDetails(id);

  return {
    title: person.name,
    description: person.biography
      ? person.biography.slice(0, 150) + "..."
      : `Learn more about ${person.name}`,
  };
}

const PersonPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const { id } = await params;
  const person: TmdbPersonDetails = await getCelebritiesDetails(id);
  const credits: CombinedCredits = await getPersonCombinedCredits(id);
  const externalIds: ExternalIds = await getPersonExternalIds(id);
  let favoriteStatus = false;
  if (session) {
    favoriteStatus = await getFavoriteStatus(session.user.id, id, "celebrity");
  }

  const normalizedCastCredits = credits.cast.map((c) => ({
    ...c,
    release_date: c.release_date || c.first_air_date || null,
  }));

  const sortedCastCredits = normalizedCastCredits.sort((a, b) => {
    if (!a.release_date && !b.release_date) return 0;
    if (!a.release_date) return -1;
    if (!b.release_date) return 1;
    return dayjs(b.release_date).valueOf() - dayjs(a.release_date).valueOf();
  });

  const normalizedCrewCredits = credits.crew.map((c) => ({
    ...c,
    release_date: c.release_date || c.first_air_date || null,
  }));

  const sortedCrewCredits = normalizedCrewCredits.sort((a, b) => {
    if (!a.release_date && !b.release_date) return 0;
    if (!a.release_date) return -1;
    if (!b.release_date) return 1;
    return dayjs(b.release_date).valueOf() - dayjs(a.release_date).valueOf();
  });

  const getAge = (birthDate: string, deathDate: string | null) => {
    if (!birthDate) return null;
    const birth = dayjs(birthDate);
    const end = deathDate ? dayjs(deathDate) : dayjs();
    return end.diff(birth, "year");
  };

  return (
    <Container size="xl" p="sm">
      <main className="flex flex-col sm:flex-row gap-4 md:gap-8 py-4">
        {/* Left Sidebar */}
        <aside className="w-full sm:w-44 md:w-80 flex-shrink-0">
          <MediaImage profile_path={person.profile_path} name={person.name} />

          <Group gap="md" className="mb-4">
            <SocialIcon platform="imdb" id={externalIds.imdb_id} />
            <SocialIcon platform="twitter" id={externalIds.twitter_id} />
            <SocialIcon platform="facebook" id={externalIds.facebook_id} />
            <SocialIcon platform="instagram" id={externalIds.instagram_id} />
          </Group>

          <div className="space-y-4">
            <Title order={3} className="text-xl font-bold">
              Personal Info
            </Title>
            <div>
              <Text size="sm" fw={700}>
                Known For
              </Text>
              <Text size="sm" c="dimmed">
                {person.known_for_department}
              </Text>
              {person.adult && (
                <Badge color="red" size="sm">
                  +18
                </Badge>
              )}
            </div>
            <div>
              <Text size="sm" fw={700}>
                Gender
              </Text>
              <Text size="sm" c="dimmed">
                {person.gender === 1
                  ? "Female"
                  : person.gender === 2
                  ? "Male"
                  : person.gender === 3
                  ? "Non-binary"
                  : "Not specified"}
              </Text>
            </div>
            <div>
              <Text size="sm" fw={700}>
                Birthday
              </Text>
              <Text size="sm" c="dimmed">
                {person.birthday
                  ? `${dayjs(person.birthday).format("MMMM D, YYYY")} (${getAge(
                      person.birthday,
                      person.deathday
                    )} years old)`
                  : "N/A"}
              </Text>
            </div>
            {person.deathday && (
              <div>
                <Text size="sm" fw={700}>
                  Day of Death
                </Text>
                <Text size="sm" c="dimmed">
                  {dayjs(person.deathday).format("MMMM D, YYYY")}
                </Text>
              </div>
            )}
            <div>
              <Text size="sm" fw={700}>
                Place of Birth
              </Text>
              <Text size="sm" c="dimmed">
                {person.place_of_birth || "N/A"}
              </Text>
            </div>
            {person.also_known_as && person.also_known_as.length > 0 && (
              <div>
                <Text size="sm" fw={700}>
                  Also Known As
                </Text>
                {person.also_known_as.map((name) => (
                  <Text size="sm" c="dimmed" key={name}>
                    {name}
                  </Text>
                ))}
              </div>
            )}
            {session && (
              <div>
                <FavoriteButton
                  initialValue={favoriteStatus}
                  userId={session?.user?.id}
                  mediaId={id}
                  type="celebrity"
                  title={person.name}
                  overview={person.biography}
                  posterUrl={person.profile_path ?? ""}
                  releaseDate={""}
                />
              </div>
            )}
          </div>
        </aside>

        {/* Right Content */}
        <div className="flex-grow overflow-hidden">
          <Title order={1} className="text-4xl font-extrabold mb-4">
            {person.name}
          </Title>

          <section className="mb-8">
            <Title order={2} className="text-2xl font-bold mb-2">
              Biography
            </Title>
            <Biography biography={person.biography} />
          </section>

          <section className="mb-8">
            <Title order={2} className="text-2xl font-bold mb-4">
              Known For
            </Title>
            <MovieCarousel
              data={credits.cast
                .sort((a, b) => b.vote_average - a.vote_average)
                .sort((a, b) => b.vote_count - a.vote_count)
                .slice(0, 10)}
            />
          </section>

          {sortedCastCredits.length > 0 && (
            <section className="mb-8">
              <Title order={2} className="text-2xl font-bold mb-4">
                Acting
              </Title>
              <div className="border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
                {sortedCastCredits.map((credit, index, arr) => (
                  <div
                    key={index}
                    className={`flex p-4 ${
                      dayjs(arr[index]?.release_date).year() !==
                        dayjs(arr[index + 1]?.release_date).year() &&
                      index !== arr.length - 1
                        ? "border-b border-b-gray-300 dark:border-b-gray-800"
                        : ""
                    }`}
                  >
                    <Text className="min-w-16 font-light text-sm">
                      {credit.release_date ? (
                        dayjs(credit.release_date).year()
                      ) : (
                        <IconCircle size={20} />
                      )}
                    </Text>
                    <Stack gap={0} className="flex-1">
                      <Link
                        className="relative group"
                        href={
                          credit.media_type === "movie"
                            ? `/movies/${credit.id}`
                            : `/series/${credit.id}`
                        }
                      >
                        <Text className="text-sm font-semibold hover:text-primary">
                          {credit.name || credit.title}
                        </Text>

                        {credit.poster_path && (
                          <Image
                            src={
                              `${TMDB_IMG_URL}/original/${credit.poster_path}` ||
                              noPreview
                            }
                            width={500}
                            height={750}
                            alt={credit.title || credit.name || "title"}
                            className="w-40 h-auto rounded-lg hidden group-hover:block absolute z-10 top-0 -translate-y-full"
                          />
                        )}
                      </Link>
                      {credit.character && (
                        <Text className="text-sm" c="dimmed">
                          as {credit.character}
                        </Text>
                      )}
                    </Stack>
                  </div>
                ))}
              </div>
            </section>
          )}

          {sortedCrewCredits.length > 0 && (
            <section>
              <Title order={2} className="text-2xl font-bold mb-4">
                Crew
              </Title>
              <div className="border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
                {sortedCrewCredits.map((credit, index, arr) => (
                  <div
                    key={index}
                    className={`flex p-4 ${
                      dayjs(arr[index]?.release_date).year() !==
                        dayjs(arr[index + 1]?.release_date).year() &&
                      index !== arr.length - 1
                        ? "border-b border-b-gray-300 dark:border-b-gray-800"
                        : ""
                    }`}
                  >
                    <Text className="min-w-16 font-light text-sm">
                      {credit.release_date ? (
                        dayjs(credit.release_date).year()
                      ) : (
                        <IconCircle size={20} />
                      )}
                    </Text>
                    <Stack gap={0} className="flex-1">
                      <Link
                        className="relative group"
                        href={
                          credit.media_type === "movie"
                            ? `/movies/${credit.id}`
                            : `/series/${credit.id}`
                        }
                      >
                        <Text className="text-sm font-semibold hover:text-primary">
                          {credit.name || credit.title}
                        </Text>

                        {credit.poster_path && (
                          <Image
                            src={`${TMDB_IMG_URL}/original/${credit.poster_path}`}
                            width={500}
                            height={750}
                            alt={credit.title || credit.name || "title"}
                            className="w-40 h-auto rounded-lg hidden group-hover:block absolute z-10 top-0 -translate-y-full"
                          />
                        )}
                      </Link>
                      {credit.job && (
                        <Text className="text-sm" c="dimmed">
                          {credit.job}
                        </Text>
                      )}
                    </Stack>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </Container>
  );
};

export default PersonPage;
