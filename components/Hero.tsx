import { Title, Text, Overlay } from "@mantine/core";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { Movies } from "@/types/types";
import { TMDB_IMG_URL } from "@/lib/constants";

interface Props {
  data1: Movies;
  data2: Movies;
}

const Hero = ({ data1, data2 }: Props) => {
  return (
    <div className="relative mb-8">
      <Overlay color="#000" backgroundOpacity={0.75} zIndex={2} />

      <div className="absolute z-[3] top-0 left-0 text-white w-full h-full flex flex-col justify-center gap-8">
        <Title
          order={1}
          size="3rem"
          ta="center"
          className="text-transparent bg-gradient-to-br from-white to-[seagreen] bg-clip-text"
        >
          SOCIAL TMDB
        </Title>
        <Text ta="center" size="xl" px="xs">
          Discover millions of movies, series and celebrities. <br /> Find
          friends based on your favorite movies to share your watchlists and
          favorites.
        </Text>
      </div>

      <Marquee>
        {data1.results.map((movie) => (
          <Image
            key={movie.id}
            width={120}
            height={180}
            src={`${TMDB_IMG_URL}/w342/${movie.poster_path}`}
            alt={movie.title || movie.name}
            className="block"
          />
        ))}
      </Marquee>
      <Marquee direction="right">
        {data2.results.map((movie) => (
          <Image
            key={movie.id}
            width={120}
            height={180}
            src={`${TMDB_IMG_URL}/w342/${movie.poster_path}`}
            alt={movie.title || movie.name}
            className="block"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default Hero;
