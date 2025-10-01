"use client";

import { authClient } from "@/lib/auth-client";
import useLogout from "@/lib/useLogout";
import { Button } from "@mantine/core";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "TMDB | Logout",
  description:
    "Login to your account to access your favorite movies and TV shows.",
};

const Page = () => {
  const session = authClient.useSession();
  const { handleLogout, loading } = useLogout();

  return (
    <div className="w-full h-[calc(100vh-70px)] flex justify-center items-center gap-4">
      <Button
        color="red"
        onClick={handleLogout}
        disabled={!session.data || loading}
      >
        {loading ? "Logging out..." : "Logout"}
      </Button>
    </div>
  );
};

export default Page;
