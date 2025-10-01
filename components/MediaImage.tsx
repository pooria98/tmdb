"use client";

import noPreview from "@/public/no-preview.png";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TMDB_IMG_URL } from "@/lib/constants";

const MediaImage = ({
  profile_path,
  name,
}: {
  profile_path: string | null;
  name: string;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <motion.div
        layoutId="person-image"
        onClick={() => setExpanded(true)}
        className="cursor-pointer"
      >
        <Image
          src={
            profile_path ? `${TMDB_IMG_URL}/w500/${profile_path}` : noPreview
          }
          width={500}
          height={750}
          alt={name}
          className="w-full h-auto block mb-4 rounded-lg"
        />
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            layoutId="person-image"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-pointer"
            onClick={() => setExpanded(false)}
          >
            <Image
              src={
                profile_path
                  ? `${TMDB_IMG_URL}/original/${profile_path}`
                  : noPreview
              }
              fill
              alt={name}
              className="object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MediaImage;
