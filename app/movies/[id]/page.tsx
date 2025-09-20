const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>moive: {id}</div>;
};

export default Page;
