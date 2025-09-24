"use client";

import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Group,
  Title,
} from "@mantine/core";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import BurgerButton from "./BurgerButton";
import navlinks from "@/lib/navlinks";
import { usePathname } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";

const Navbar = () => {
  const pathname = usePathname();
  const baseClass =
    "block p-2 font-[500] text-white transition-all hover:scale-105";
  const activeClass = "underline underline-offset-4 scale-105";

  return (
    <nav className="w-full sticky top-0 z-10 bg-gradient-to-t from-[teal] to-[seagreen]">
      <Container size="xl" p="sm">
        <Flex w="100%" justify="space-between" align="center" gap="md">
          <Group className="gap-3 sm:gap-8">
            <BurgerButton />
            <Title c="white" visibleFrom="sm">
              <Link href="/" className="text-white">
                S-TMDB
              </Link>
            </Title>
            <Group gap="xs" visibleFrom="sm">
              {navlinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`${baseClass} ${
                    pathname === link.href && activeClass
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </Group>
          </Group>
          <Group>
            <Button variant="subtle" color="white">
              Login
            </Button>
            <ThemeSwitch />
            <Link href="/search" className="rounded-full">
              <ActionIcon
                radius="xl"
                variant="outline"
                color="white"
                size="lg"
                aria-label="search"
              >
                <IconSearch stroke={1.5} />
              </ActionIcon>
            </Link>
          </Group>
          {/* LOGIN / PROFILE / NOTIFICATIONS / THEME SWITCH */}
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
