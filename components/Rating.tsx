import { RingProgress, Text } from "@mantine/core";

interface Props {
  children: React.ReactNode;
  value: number;
}

const Rating = ({ children, value }: Props) => {
  return (
    <RingProgress
      sections={[
        {
          value: value,
          color: value > 70 ? "green" : value > 40 ? "yellow" : "red",
        },
      ]}
      label={
        <Text fw={700} ta="center" size="xl">
          {children}
        </Text>
      }
    />
  );
};

export default Rating;
