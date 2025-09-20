"use client";

import { Burger } from "@mantine/core";
import { useAtom } from "jotai";
import { sidebar } from "@/states/state";

const BurgerButton = () => {
  const [opened, setOpened] = useAtom(sidebar);
  const toggleMenu = () => setOpened((prev) => !prev);

  return (
    <Burger
      hiddenFrom="sm"
      color="white"
      opened={opened}
      onClick={toggleMenu}
      aria-label="Toggle navigation"
    />
  );
};

export default BurgerButton;
