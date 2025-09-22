import { TMDB_IMG_URL } from "@/lib/constants";
import { Person } from "@/types/types";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Badge, Flex, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const PersonCarousel = async ({ data }: { data: Person[] }) => {
  return (
    <Carousel
      controlsOffset="xs"
      classNames={{
        root: "group",
        controls: "opacity-0 group-hover:opacity-100 transition-opacity",
        control: "w-10 h-10",
      }}
      slideSize="140px"
      emblaOptions={{ align: "start", dragFree: true }}
    >
      {data?.map((item) => (
        <CarouselSlide key={item.id} p="0.25rem" w="100%" h="100%">
          <Link
            href={`/movies/${item.id}`}
            className="block w-full h-auto rounded-[0.5rem] overflow-hidden bg-gradient-to-t to-[seagreen] to-70%"
          >
            <Image
              width={342}
              height={513}
              src={`${TMDB_IMG_URL}/w342/${item.profile_path}`}
              alt={item.name}
              className="w-full h-auto block"
            />
            <Flex
              pos="absolute"
              top="0.5rem"
              left="0.5rem"
              w="calc(100% - 1rem)"
              justify="space-between"
            >
              {item.adult && (
                <Badge fs={"0.25rem"} color="var(--mantine-color-red-9)">
                  18+
                </Badge>
              )}
            </Flex>
            <Text px="0.5rem" pt="0.5rem" lineClamp={2}>
              {item.name}
            </Text>
          </Link>
        </CarouselSlide>
      ))}
    </Carousel>
  );
};

export default PersonCarousel;
