import FullCastCrew from "@/components/FullCastCrew";
import React from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  return <FullCastCrew type="movies" params={params} />;
};

export default Page;
