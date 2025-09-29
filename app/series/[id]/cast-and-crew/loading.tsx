import { Container, Group, SimpleGrid, Skeleton } from "@mantine/core";
import React from "react";

const Loading = () => {
  return (
    <Container size="xl" p="sm">
      <Group justify="space-between" mb="xl">
        <Skeleton width={200} height={20} />
        <Skeleton width={200} height={40} />
      </Group>

      <Skeleton width={100} height={20} mb="lg" />
      <SimpleGrid cols={{ base: 1, sm: 2 }} mb="md">
        {Array.from({ length: 15 }).map((_, i) => (
          <Group key={i}>
            <Skeleton width={80} height={100} />
            <div>
              <Skeleton width={110} height={20} mb="xs" />
              <Skeleton width={170} height={15} />
            </div>
          </Group>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Loading;
