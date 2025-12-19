import { type JSX, type Setter } from "solid-js";
import type { GalleryImage } from "./GalleryComponent.tsx";
import { useScreenWidth } from "../hooks/useScreenWidth";

// Source: <https://tailwindcss.com/docs/responsive-design>
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export default function GalleryImage({
  image,
  setSelectedImageIndex,
  ...rest
}: JSX.IntrinsicElements["img"] & {
  image: GalleryImage;
  setSelectedImageIndex: Setter<number | null>;
}) {
  const { screenWidth } = useScreenWidth();

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
      {screenWidth() > BREAKPOINTS.sm ? (
        <a href={image.src} class="block" onClick={onClick}>
          <Image />
        </a>
      ) : (
        <Image />
      )}
    </figure>
  );
}
