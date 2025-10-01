"use client";

import { Button, Text, Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

const Biography = ({ biography }: { biography: string }) => {
  const [opened, { toggle }] = useDisclosure(false);

  if (!biography) {
    return (
      <Text className="leading-relaxed whitespace-pre-wrap">
        We don&apos;t have a biography for this person.
      </Text>
    );
  }

  return (
    <>
      <Collapse in={opened}>
        <Text className="leading-relaxed whitespace-pre-wrap">{biography}</Text>
      </Collapse>

      {!opened && (
        <Text className="leading-relaxed whitespace-pre-wrap">
          {biography.slice(0, 300)} ...
        </Text>
      )}

      {biography.length > 300 && (
        <Button
          p={0}
          variant="transparent"
          onClick={toggle}
          rightSection={
            opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
          }
        >
          {opened ? "Show less" : "Show more"}
        </Button>
      )}
    </>
  );
};

export default Biography;
