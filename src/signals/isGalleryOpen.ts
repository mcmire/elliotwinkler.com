import { createSignal } from "solid-js";

const [isGalleryOpen, setIsGalleryOpen] = createSignal<boolean>(false);

export { isGalleryOpen, setIsGalleryOpen };
