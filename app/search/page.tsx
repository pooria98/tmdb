import SearchPage from "@/components/SearchPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TMDB | Search",
  description:
    "Search for your favorite movies, series, and celebrities from the biggest movie database in the world.",
};

const Page = () => {
  return <SearchPage />;
};

export default Page;
