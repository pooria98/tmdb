import FullCastCrew from "@/components/FullCastCrew";
import { getMovieDetails } from "@/lib/api";
import { TmdbMovie } from "@/types/types";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const movie: TmdbMovie = await getMovieDetails(id);

  return {
    title: movie.title + " | Cast and Crew",
    description: `View full cast and crew for ${movie.title}`,
  };
}

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  return <FullCastCrew type="movies" params={params} />;
};

export default Page;
