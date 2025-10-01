import AuthenticationForm from "@/components/AuthenticationForm";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "TMDB | Login",
  description:
    "Login to your account to access your favorite movies and TV shows.",
};

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full h-[calc(100vh-70px)] flex justify-center items-center">
      <AuthenticationForm />
    </div>
  );
};

export default Page;
