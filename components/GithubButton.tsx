import { Button } from "@mantine/core";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

const GithubButton = ({
  setLoading,
}: {
  setLoading: (loading: boolean) => void;
}) => {
  const router = useRouter();

  const githubSignIn = async () => {
    await authClient.signIn.social(
      { provider: "github" },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          notifications.show({
            color: "green",
            title: "Signin successful",
            message: "Signed in successfully",
          });
          router.push("/");
        },
        onError: (ctx) => {
          setLoading(false);
          notifications.show({
            color: "red",
            title: `${ctx.error.status}: Signin Failed`,
            message: ctx.error.message,
          });
        },
      }
    );
  };

  return (
    <Button
      onClick={githubSignIn}
      radius="xl"
      variant="default"
      leftSection={<IconBrandGithubFilled size={14} />}
    >
      Github
    </Button>
  );
};

export default GithubButton;
