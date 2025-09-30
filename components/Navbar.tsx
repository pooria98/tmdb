"use client";

import {
  ActionIcon,
  Avatar,
  Button,
  Container,
  Flex,
  Group,
  Menu,
  Title,
} from "@mantine/core";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import BurgerButton from "./BurgerButton";
import navlinks from "@/lib/navlinks";
import { usePathname } from "next/navigation";
import {
  IconHeart,
  IconLogout,
  IconSearch,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import useLogout from "@/lib/useLogout";

const Navbar = () => {
  const pathname = usePathname();
  const baseClass =
    "block p-2 font-[500] text-white transition-all hover:scale-105";
  const activeClass = "underline underline-offset-4 scale-105";
  const [isVisible, setIsVisible] = useState(true);
  const session = authClient.useSession();
  const { handleLogout, loading } = useLogout();

  useEffect(() => {
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full h-[70px] sticky ${
        isVisible ? "top-0" : "-top-[70px]"
      } z-10 bg-gradient-to-t from-[teal] to-[seagreen] transition-all`}
    >
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
            {session.isPending ? null : session.data ? (
              <Menu shadow="md">
                <Menu.Target>
                  <Avatar
                    className="cursor-pointer"
                    size={36}
                    bd="1px solid white"
                    color="white"
                    radius="xl"
                    src={session.data.user.image || ""}
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Link href="/user/profile">
                    <Menu.Item leftSection={<IconUser size={16} />}>
                      View profile
                    </Menu.Item>
                  </Link>

                  <Link href="/user/favorites">
                    <Menu.Item leftSection={<IconHeart size={16} />}>
                      Favorites
                    </Menu.Item>
                  </Link>

                  <Link href="/user/settings">
                    <Menu.Item leftSection={<IconSettings size={16} />}>
                      Settings
                    </Menu.Item>
                  </Link>

                  <Menu.Item
                    disabled={loading}
                    color="red"
                    leftSection={<IconLogout size={16} />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Link href="/login">
                <Button variant="subtle" color="white">
                  Login
                </Button>
              </Link>
            )}
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
