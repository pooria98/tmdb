import { Movies } from "@/types/types";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Badge, Flex, Text } from "@mantine/core";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const MovieCarousel = async ({ data }: { data: Movies }) => {
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
      {data?.results.map((item) => (
        <CarouselSlide key={item.id} p="0.25rem" w="100%" h="100%">
          <Link
            href={item.title ? `/movies/${item.id}` : `/series/${item.id}`}
            className="block w-full h-auto rounded-[0.5rem] overflow-hidden bg-gradient-to-t from-white to-[seagreen]"
          >
            <Image
              width={500}
              height={750}
              src={`https://image.tmdb.org/t/p/w342/${item.poster_path}`}
              alt={item.title || item.name}
              className="w-full h-auto block"
            />
            <Flex
              pos="absolute"
              top="0.5rem"
              left="0.5rem"
              w="calc(100% - 1rem)"
              justify="space-between"
            >
              {item.vote_average && (
                <Badge color="var(--mantine-color-yellow-4)" c="black">
                  {item.vote_average.toFixed(1)}
                </Badge>
              )}
              {item.adult && (
                <Badge fs={"0.25rem"} color="var(--mantine-color-red-9)">
                  18+
                </Badge>
              )}
            </Flex>
            <Text px="0.5rem" pt="0.5rem" lineClamp={2}>
              {item.title || item.name}
            </Text>
            <Text px="0.5rem" c="seagreen" fw={700}>
              {dayjs(item.release_date).format("YYYY") || ""}
            </Text>
          </Link>
        </CarouselSlide>
      ))}
    </Carousel>
  );
};

export default MovieCarousel;
