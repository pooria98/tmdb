import { auth } from "@/lib/auth";
import { Badge, Button, Container, Title } from "@mantine/core";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import noPreview from "@/public/no-preview.png";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <Container size="xl" p={0}>
      <div className="flex flex-col w-full max-w-[500px] min-h-[calc(100dvh-70px)] border-l border-r border-gray-300 dark:border-gray-700 p-4 mx-auto">
        <Title order={1} ta="center" className="mb-8">
          Profile
        </Title>

        <Image
          src={session?.user?.image || noPreview}
          width={1024}
          height={1024}
          alt="profile picture"
          className="w-64 h-64 aspect-square block mx-auto rounded-full mb-4"
        />

        <p className="text-center font-bold text-lg mb-8">
          {session.user?.name}
        </p>

        <div className="flex justify-between flex-wrap items-center gap-2 mb-4">
          <div>
            <p className="text-sm font-semibold">Email:</p>
            <p>{session.user?.email}</p>
          </div>
          {session.user?.emailVerified ? (
            <Badge color="green" radius="xl">
              Verified
            </Badge>
          ) : (
            <Button size="xs" variant="outline">
              Verify email
            </Button>
          )}
        </div>

        <div className="flex justify-between flex-wrap items-center gap-2 mb-4">
          <div>
            <p className="text-sm font-semibold">Password:</p>
            <p>****************</p>
          </div>
          <Button size="xs" variant="outline">
            Change password
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Page;
