import { Container, Group, Skeleton } from "@mantine/core";
import React from "react";

const Loading = () => {
  return (
    <Container size="xl" p="sm">
      <Skeleton radius="xl" width={200} height={40} mb="lg" />

      <Group mb="lg">
        <Skeleton radius="xl" className="flex-1" height={30} />
        <Skeleton radius="xl" width={60} height={30} />
      </Group>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-64">
          <Skeleton radius="md" width="100%" height={350} mb="xs" />
          <Skeleton radius="md" width="100%" height={350} mb="xs" />
        </div>
        <div className="flex-1">
          <Skeleton radius="md" width="100%" height={250} mb="xs" />
          <Skeleton radius="md" width="100%" height={250} mb="xs" />
          <Skeleton radius="md" width="100%" height={250} mb="xs" />
          <Skeleton radius="md" width="100%" height={250} mb="xs" />
          <Skeleton radius="md" width="100%" height={250} mb="xs" />
          <Skeleton radius="md" width="100%" height={250} mb="xs" />
          <Skeleton radius="md" width="100%" height={250} mb="xs" />
          <Skeleton radius="md" width="100%" height={250} mb="xs" />
          <Skeleton radius="md" width="100%" height={250} mb="xs" />
          <Skeleton radius="md" width="100%" height={250} mb="xs" />
        </div>
      </div>

      <Group py="xl" justify="center">
        <Skeleton circle height={30} />
        <Skeleton circle height={30} />
        <Skeleton circle height={30} />
        <Skeleton circle height={30} />
      </Group>
    </Container>
  );
};

export default Loading;
