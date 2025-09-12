import Link from "next/link";
import { Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

const ViewMoreButton = ({
  children,
  small = false,
  href,
}: {
  children: React.ReactNode;
  small?: boolean;
  href: string;
}) => {
  if (small) {
    return (
      <Text fw="bold" hiddenFrom="xs">
        <Link
          href={href}
          className="flex items-center gap-1 text-[seagreen] dark:text-teal-600"
        >
          {children} <IconChevronRight size="1rem" />
        </Link>
      </Text>
    );
  } else {
    return (
      <Text fw="bold" visibleFrom="xs">
        <Link
          href={href}
          className="flex items-center gap-1 text-[seagreen] dark:text-teal-600"
        >
          {children} <IconChevronRight size="1rem" />
        </Link>
      </Text>
    );
  }
};

export default ViewMoreButton;
