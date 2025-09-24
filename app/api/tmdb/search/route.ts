import { TMDB_BASE_URL, TMDB_OPTIONS } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const include_adult = searchParams.get("include_adult") || "false";
  const page = searchParams.get("page") || "1";

  const res = await fetch(
    `${TMDB_BASE_URL}/search/multi?query=${query}&include_adult=${include_adult}&page=${page}`,
    TMDB_OPTIONS
  );

  const data = await res.json();
  return NextResponse.json(data);
}
