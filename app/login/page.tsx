import AuthenticationForm from "@/components/AuthenticationForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
