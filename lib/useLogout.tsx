import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "./auth-client";
import { notifications } from "@mantine/notifications";

const useLogout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setLoading(false);
          notifications.show({
            color: "green",
            title: "Logout successful",
            message: "You have been logged out successfully",
          });
          router.push("/"); // redirect to login page
        },
        onError: (ctx) => {
          notifications.show({
            color: "red",
            title: `${ctx.error.status}: Logout Failed`,
            message: ctx.error.message,
          });
          setLoading(false);
        },
      },
    });
  };

  return { handleLogout, loading };
};

export default useLogout;
