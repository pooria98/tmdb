import { Container, Stack, Group, Flex, Skeleton } from "@mantine/core";

const Loading = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full min-h-[500px] mb-4"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.9))`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full h-full text-white p-4 md:content-center">
          <Container size="xl" p="sm">
            <div className="flex gap-8">
              {/* POSTER (left side) */}
              <div className="w-64 hidden md:block">
                <Skeleton radius="md" width="100%" height={396} />
              </div>

              {/* INFO (right side) */}
              <Stack className="flex-1" gap="xs">
                <Skeleton radius="xl" width={200} height={40} mb="lg" />

                <div className="flex gap-8 items-start flex-col sm:flex-row">
                  <div className="w-fit flex items-center sm:flex sm:flex-col sm:items-start gap-8">
                    <Skeleton circle height={100} />
                    <div className="flex flex-col gap-4 px-2">
                      <Skeleton width={80} height={20} radius="xl" />
                      <Skeleton width={80} height={20} radius="xl" />
                    </div>
                  </div>

                  <Stack className="flex-1">
                    <Skeleton radius="xl" width={100} height={30} />

                    <div>
                      <Skeleton width="70%" height={15} mb="xs" />
                      <Skeleton width="70%" height={15} mb="xs" />
                      <Skeleton width="70%" height={15} mb="xs" />
                      <Skeleton width="40%" height={15} />
                    </div>

                    <Skeleton radius="xl" width={100} height={30} />

                    <Group gap="xs" className="flex-wrap">
                      <Skeleton radius="xl" width={50} height={15} />
                      <Skeleton radius="xl" width={50} height={15} />
                      <Skeleton radius="xl" width={50} height={15} />
                    </Group>
                  </Stack>
                </div>
              </Stack>
            </div>
          </Container>
        </div>
      </div>

      <Container size="xl" p="sm">
        <main className="flex flex-col sm:flex-row gap-4 md:gap-8 py-4">
          {/* Left Sidebar */}
          <aside className="w-full sm:w-44 md:w-80 flex-shrink-0">
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
            {/* Cast & Crew */}
            <section className="mb-8">
              <Skeleton width={200} height={30} radius="md" mb="md" />
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

            {/* Production Companies */}
            <section className="mb-8">
              <Skeleton width={200} height={30} radius="md" mb="md" />

              <Flex gap="lg" wrap="wrap">
                <Skeleton width={150} height={20} radius="md" />
                <Skeleton width={200} height={20} radius="md" />
                <Skeleton width={120} height={20} radius="md" />
                <Skeleton width={80} height={20} radius="md" />
                <Skeleton width={150} height={20} radius="md" />
                <Skeleton width={150} height={20} radius="md" />
                <Skeleton width={180} height={20} radius="md" />
                <Skeleton width={90} height={20} radius="md" />
                <Skeleton width={200} height={20} radius="md" />
                <Skeleton width={150} height={20} radius="md" />
              </Flex>
            </section>

            {/* Recommendations */}
            <section className="mb-8">
              <Skeleton width={200} height={30} radius="md" mb="md" />
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
          </div>
        </main>
      </Container>
    </>
  );
};

export default Loading;
