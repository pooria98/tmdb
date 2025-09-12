import { Button, Container, Flex, Group, Title } from "@mantine/core";
import NavLinks from "./NavLinks";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full sticky top-0 z-10 bg-gradient-to-t from-[teal] to-[seagreen]">
      <Container size="xl" p="sm">
        <Flex w="100%" justify="space-between" align="center" gap="md">
          <Group gap="xl">
            <Title c="white">
              <Link href="/" className="text-white">
                S-TMDB
              </Link>
            </Title>
            <Group gap="xs">
              <NavLinks />
            </Group>
          </Group>
          <Group>
            <Button variant="subtle" color="white">
              Login
            </Button>
            <ThemeSwitch />
          </Group>
          {/* LOGIN / PROFILE / NOTIFICATIONS / THEME SWITCH */}
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
