import FullCastCrew from "@/components/FullCastCrew";
import { getSeriesDetails } from "@/lib/api";
import { TmdbSeries } from "@/types/types";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const series: TmdbSeries = await getSeriesDetails(id);

  return {
    title: series.name + " | Cast and Crew",
    description: `View full cast and crew for ${series.name}`,
  };
}

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  return <FullCastCrew type="series" params={params} />;
};

export default Page;
