import FullCastCrew from "@/components/FullCastCrew";
import React from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  return <FullCastCrew type="series" params={params} />;
};

export default Page;
