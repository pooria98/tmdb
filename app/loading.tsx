import { Loader } from "@mantine/core";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-[calc(100dvh-70px)] flex justify-center items-center">
      <Loader type="dots" />
    </div>
  );
};

export default Loading;
