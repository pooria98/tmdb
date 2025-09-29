import { Container, Group, Skeleton } from "@mantine/core";

const Loading = () => {
  return (
    <Container size="xl" p="sm">
      <main className="flex flex-col sm:flex-row gap-4 md:gap-8 py-4">
        {/* Left Sidebar */}
        <aside className="w-full sm:w-44 md:w-80 flex-shrink-0">
          <Skeleton width="100%" height={400} radius="md" mb="md" />

          <Group gap="md" className="mb-4">
            <Skeleton circle height={30} />
            <Skeleton circle height={30} />
            <Skeleton circle height={30} />
            <Skeleton circle height={30} />
          </Group>

          <div className="space-y-4">
            <Skeleton width="60%" height={30} radius="md" />
            <div>
              <Skeleton width="40%" height={25} mb="xs" />
              <Skeleton width="80%" height={15} />
            </div>
            <div>
              <Skeleton width="50%" height={25} mb="xs" />
              <Skeleton width="70%" height={15} />
            </div>
            <div>
              <Skeleton width="40%" height={25} mb="xs" />
              <Skeleton width="80%" height={15} />
            </div>
            <div>
              <Skeleton width="50%" height={25} mb="xs" />
              <Skeleton width="75%" height={15} />
            </div>
          </div>
        </aside>

        {/* Right Content */}
        <div className="flex-grow overflow-hidden">
          <Skeleton width="100%" height={40} radius="md" mb="md" />

          <section className="mb-8">
            <Skeleton width={60} height={30} radius="md" mb="md" />
            <Skeleton width="100%" height={20} radius="md" mb="xs" />
            <Skeleton width="100%" height={20} radius="md" mb="xs" />
            <Skeleton width="100%" height={20} radius="md" mb="xs" />
            <Skeleton width="100%" height={20} radius="md" mb="xs" />
            <Skeleton width="100%" height={20} radius="md" mb="xs" />
            <Skeleton width="100%" height={20} radius="md" mb="xs" />
            <Skeleton width="60%" height={20} radius="md" />
          </section>

          <section className="mb-8">
            <Skeleton width={60} height={30} radius="md" mb="md" />
            <Group className="overflow-hidden" wrap="nowrap">
              <Skeleton
                width={200}
                height={300}
                radius="md"
                className="shrink-0"
              />
              <Skeleton
                width={200}
                height={300}
                radius="md"
                className="shrink-0"
              />
              <Skeleton
                width={200}
                height={300}
                radius="md"
                className="shrink-0"
              />
              <Skeleton
                width={200}
                height={300}
                radius="md"
                className="shrink-0"
              />
              <Skeleton
                width={200}
                height={300}
                radius="md"
                className="shrink-0"
              />
            </Group>
          </section>

          <section className="mb-8">
            <Skeleton width={60} height={30} radius="md" mb="md" />
            <Skeleton width="100%" height={800} radius="lg" mb="xs" />
          </section>
        </div>
      </main>
    </Container>
  );
};

export default Loading;
