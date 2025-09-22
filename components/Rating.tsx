import { RingProgress, Stack, Text } from "@mantine/core";

interface Props {
  value: number;
  vote_count: number;
}

const Rating = ({ value, vote_count }: Props) => {
  return (
    <Stack gap={0} w="fit-content">
      <RingProgress
        roundCaps
        sections={[
          {
            value: value,
            color: value > 70 ? "green" : value > 40 ? "yellow" : "red",
          },
        ]}
        label={
          <Text fw={700} ta="center" size="xl">
            {value} <span className="text-xs">%</span>
          </Text>
        }
      />
      <Text fw={700} ta="center" size="sm">
        ({vote_count} votes)
      </Text>
    </Stack>
  );
};

export default Rating;
