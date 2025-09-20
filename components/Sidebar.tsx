"use client";

import navlinks from "@/lib/navlinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Divider, Drawer, Stack, Title } from "@mantine/core";
import { useAtom } from "jotai";
import { sidebar } from "@/states/state";

const Sidebar = () => {
  const pathname = usePathname();
  const baseClass =
    "text-xl block p-2 font-[500] transition-all hover:-translate-y-1";
  const activeClass =
    "text-transparent bg-gradient-to-t from-[seagreen] from-50% to-white bg-clip-text";
  const [opened, setOpened] = useAtom(sidebar);
  const toggleMenu = () => setOpened((prev) => !prev);

  return (
    <Drawer
      opened={opened}
      onClose={toggleMenu}
      size="100%"
      title={<p className="text-xl font-bold">S-TMDB</p>}
    >
      <Stack>
        <Divider />
        <Link
          href="/"
          className={`${baseClass} ${pathname === "/" && activeClass}`}
          onClick={toggleMenu}
        >
          Home
        </Link>
        {navlinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`${baseClass} ${pathname === link.href && activeClass}`}
            onClick={toggleMenu}
          >
            {link.label}
          </Link>
        ))}
      </Stack>
    </Drawer>
  );
};

export default Sidebar;
