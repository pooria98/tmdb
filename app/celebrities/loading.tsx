import { Container, Group, SimpleGrid, Skeleton } from "@mantine/core";

const Loading = async () => {
  return (
    <Container size="xl" p="sm">
      <Skeleton radius="xl" width={200} height={40} mb="lg" />
      <Group mb="lg">
        <Skeleton radius="xl" className="flex-1" height={30} />
        <Skeleton radius="xl" width={60} height={30} />
      </Group>
      <div>
        <SimpleGrid cols={{ base: 2, xs: 3, sm: 4, md: 5 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i}>
              <Skeleton radius="md" width={"100%"} height={350} mb="xs" />
              <Skeleton radius="md" width="70%" height={20} />
            </div>
          ))}
        </SimpleGrid>
      </div>
      <Group justify="center" py="xl">
        <Skeleton circle height={30} />
        <Skeleton circle height={30} />
        <Skeleton circle height={30} />
        <Skeleton circle height={30} />
        <Skeleton circle height={30} />
      </Group>
    </Container>
  );
};

export default Loading;
