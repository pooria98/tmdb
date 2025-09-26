import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>{session.user?.name}</p>
    </div>
  );
};

export default Page;
