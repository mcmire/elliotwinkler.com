import { type JSX, type Setter } from "solid-js";
import type { GalleryImage } from "./Gallery";
import { useTailwindBreakpoints } from "../hooks/useTailwindBreakpoints";

export default function GalleryImage({
  image,
  setSelectedImageIndex,
  ...rest
}: JSX.IntrinsicElements["img"] & {
  image: GalleryImage;
  setSelectedImageIndex: Setter<number | null>;
}) {
  const { breakpoints, screenWidth } = useTailwindBreakpoints();

  const onClick: JSX.EventHandler<HTMLAnchorElement, MouseEvent> = (event) => {
    event.preventDefault();

    setSelectedImageIndex(image.index);
  };

  const Image = () => {
    return (
      <img
        {...rest}
        src={image.src}
        alt={image.caption}
        class="inline-block border border-slate-200 border rounded shadow-md block dark:border-transparent !my-0"
      />
    );
  };

  return (
    <figure class="text-center">
      {screenWidth() > breakpoints.sm ? (
        <a href={image.src} class="block" onClick={onClick}>
          <Image />
        </a>
      ) : (
        <Image />
      )}
    </figure>
  );
}
