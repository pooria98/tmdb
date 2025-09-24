import { Anchor } from "@mantine/core";
import {
  IconWorld,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons-react";

const SocialIcon = ({
  platform,
  id,
}: {
  platform: "imdb" | "facebook" | "instagram" | "twitter" | "website";
  id: string | undefined | null;
}) => {
  if (!id) return null;

  const baseUrls = {
    imdb: "https://www.imdb.com/name/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://twitter.com/",
    website: "",
  };

  const icons = {
    imdb: (
      <div className="text-black bg-[#F5C518] font-semibold text-xs rounded p-1">
        IMDB
      </div>
    ),
    facebook: <IconBrandFacebook size={32} color="#1877F2" />,
    instagram: <IconBrandInstagram size={32} color="#8134AF" />,
    twitter: <IconBrandTwitter size={32} color="#1DA1F2" />,
    website: <IconWorld size={32} color="var(--mantine-color-blue-6)" />,
  };

  const href = platform === "website" ? id : `${baseUrls[platform]}${id}`;

  return (
    <Anchor
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-110 transition-all no-underline"
    >
      {icons[platform]}
    </Anchor>
  );
};

export default SocialIcon;
