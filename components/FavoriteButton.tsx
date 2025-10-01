"use client";

import { ActionIcon, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import axios, { AxiosError } from "axios";
import { useState } from "react";

interface Props {
  initialValue: boolean;
  userId: string;
  mediaId: string;
  type: "movie" | "series" | "celebrity";
  title: string;
  posterUrl: string;
  overview: string;
  releaseDate: string;
}

const FavoriteButton = ({
  initialValue,
  userId,
  mediaId,
  type,
  title,
  posterUrl,
  overview,
  releaseDate,
}: Props) => {
  const [faved, setFaved] = useState(initialValue);
  const handleFavorite = async () => {
    try {
      const res = await axios.post("/api/favorites", {
        userId,
        mediaId,
        type,
        title,
        posterUrl,
        overview,
        releaseDate,
      });
      const data = res.data;
      setFaved(data.favorite);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        notifications.show({
          color: "red",
          title: error?.status,
          message: error?.response?.data,
        });
      }
    }
  };
  return (
    <ActionIcon
      onClick={handleFavorite}
      variant="default"
      size="xl"
      radius="xl"
    >
      {faved ? (
        <Tooltip label="in favorites" openDelay={500}>
          <IconHeartFilled color="red" />
        </Tooltip>
      ) : (
        <Tooltip label="add to favorites" openDelay={500}>
          <IconHeart />
        </Tooltip>
      )}
    </ActionIcon>
  );
};

export default FavoriteButton;
