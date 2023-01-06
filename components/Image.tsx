import type { FCC } from "types/react";
import React from "react";
import type { ImageProps } from "next/image";
import { default as NextImage } from "next/image";
import { styled } from "lib/theme";

const Figure = styled("figure", {
  position: "relative",
  // Next 13 is weird, luckily https://stackoverflow.com/a/74975597
  width: "100%",
  height: "100%",
});

const FigCaption = styled("figcaption", {
  textAlign: "center",
});

const StyledImage = styled(NextImage, {
  width: "100%",
  height: "auto",
});

type IImageProps = Omit<ImageProps, "title" | "alt"> & { title?: string; alt?: string }

const FullImage: FCC<IImageProps> = ({ title, alt: altProp = "", src, ...props }) => {
  const alt = altProp !== "" ? altProp : title ?? `This is an image from ${src}`

  return (
    <Figure>
      <StyledImage
        width={9999}
        height={9999}
        src={src}
        alt={alt}
        title={title || ""}
        {...props}
      />
      {(title || alt) && <FigCaption>{title || alt}</FigCaption>}
    </Figure>
  );
};

export default FullImage;
