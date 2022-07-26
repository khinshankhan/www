import { defaultThumbnailSrc, defaultThumbnailAlt } from "src/types/Layouts";
import type { CoverData } from "src/types/Nodes";

export const normalizeCover = (cover?: CoverData) => {
  const src = cover?.url ?? (cover?.src?.publicURL as string) ?? defaultThumbnailSrc.article;
  const alt = cover?.alt ?? defaultThumbnailAlt.article;

  return { src, alt };
};
