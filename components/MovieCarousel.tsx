import noPreview from "@/public/no-preview.png";
import { TMDB_IMG_URL } from "@/lib/constants";
import { Movie, Credit } from "@/types/types";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Badge, Flex, Text } from "@mantine/core";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: Movie[] | Credit[];
}

const MovieCarousel = async ({ data }: Props) => {
  return (
    <Carousel
      controlsOffset="xs"
      classNames={{
        root: "group",
        controls: "opacity-0 group-hover:opacity-100 transition-opacity",
        control: "w-10 h-10",
      }}
      slideSize="180px"
      emblaOptions={{ align: "start", dragFree: true }}
    >
      {data?.map((item) => (
        <CarouselSlide key={item.id} p="0.25rem" w="100%" h="100%">
          <Link
            href={item.title ? `/movies/${item.id}` : `/series/${item.id}`}
            className="block w-full h-auto rounded-[0.5rem] overflow-hidden bg-gradient-to-t to-[seagreen] to-70%"
          >
            {item.poster_path ? (
              <Image
                width={342}
                height={513}
                src={`${TMDB_IMG_URL}/w342/${item.poster_path}`}
                alt={item.title || item.name || "title"}
                className="w-full h-auto block"
              />
            ) : (
              <Image
                width={342}
                height={513}
                src={noPreview}
                alt={item.title || item.name || "title"}
                className="w-full h-auto block"
              />
            )}
            <Flex
              pos="absolute"
              top="0.5rem"
              left="0.5rem"
              w="calc(100% - 1rem)"
              justify="space-between"
            >
              {"vote_average" in item && item.vote_average && (
                <Badge color="var(--mantine-color-yellow-4)" c="black">
                  {item.vote_average.toFixed(1)}
                </Badge>
              )}
              {"adult" in item && item.adult && (
                <Badge fs={"0.25rem"} color="var(--mantine-color-red-9)">
                  18+
                </Badge>
              )}
            </Flex>
            <Text px="0.5rem" pt="0.5rem" lineClamp={2}>
              {item.title || item.name}
            </Text>
            <Text
              px="0.5rem"
              className="text-[seagreen] dark:text-teal-600"
              fw={700}
            >
              {dayjs(item.release_date).format("YYYY") || ""}
            </Text>
          </Link>
        </CarouselSlide>
      ))}
    </Carousel>
  );
};

export default MovieCarousel;
