import { NextSeo } from "next-seo";
import { VFC } from "react";

const basePath = "https://caffeine-busters.web.app";

export const SEO: VFC<{ title: string; path: string; description: string }> = ({
  title,
  path,
  description,
}) => {
  const url = `${basePath}${path}`;
  const fullTitle = `${title && `${title} | `}Caffeine Busters`;

  return (
    <NextSeo
      title={fullTitle}
      canonical={url}
      description={description}
      openGraph={{
        type: "website",
        locale: "ja_JP",
        url,
        site_name: fullTitle,
        description,
        images: [
          {
            url: `${basePath}/og.png`,
            width: 1024,
            height: 1024,
            alt: "Caffeine Busters",
          },
        ],
      }}
    />
  );
};
