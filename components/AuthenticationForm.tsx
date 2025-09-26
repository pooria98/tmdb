"use client";

import { authClient } from "@/lib/auth-client";
import {
  Anchor,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import GoogleButton from "./GoogleButton";
import GithubButton from "./GithubButton";
import { notifications } from "@mantine/notifications";

interface SignInFormValues {
  email: string;
  password: string;
}

interface SignUpFormValues extends SignInFormValues {
  name: string;
}

const AuthenticationForm = (props: PaperProps) => {
  const router = useRouter();
  const [type, toggle] = useToggle(["login", "register"]);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSignin = async (values: SignInFormValues) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/",
        rememberMe: true,
      },
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
  const handleSignup = async (values: SignUpFormValues) => {
    await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          notifications.show({
            color: "green",
            title: "Signup successful",
            message: "Account created successfully",
          });
          router.push("/");
        },
        onError: (ctx) => {
          setLoading(false);
          notifications.show({
            color: "red",
            title: `${ctx.error.status}: Signup Failed`,
            message: ctx.error.message,
          });
        },
      }
    );
  };

  return (
    <Paper
      radius="md"
      p="lg"
      withBorder
      {...props}
      className="relative w-full max-w-96"
    >
      <LoadingOverlay
        visible={loading}
        overlayProps={{ radius: "md", blur: 1 }}
        loaderProps={{ type: "dots" }}
      />
      <Text size="lg" fw={500}>
        Welcome to S-TMDB, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton setLoading={setLoading} />
        <GithubButton setLoading={setLoading} />
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit((values) => {
          if (type === "login") {
            handleSignin(values);
          } else {
            handleSignup(values);
          }
        })}
      >
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default AuthenticationForm;
