import { For, Show, createEffect, createSignal, type JSX } from "solid-js";
import GalleryImage from "./GalleryImage";
import { setIsGalleryOpen } from "../signals/isGalleryOpen";

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  caption?: string;
  index: number;
};

export default function Gallery({
  images,
  caption,
}: {
  images: GalleryImage[];
  caption?: string;
}) {
  const [selectedImageIndex, setSelectedImageIndex] = createSignal<
    number | null
  >(null);
  let dialogRef!: HTMLDialogElement;
  const previousImage = () => {
    const index = selectedImageIndex();
    return index === null || index - 1 < 0 ? undefined : images[index - 1];
  };
  const selectedImage = () => {
    const index = selectedImageIndex();
    return index === null ? undefined : images[index];
  };
  const nextImage = () => {
    const index = selectedImageIndex();
    return index === null || index + 1 > images.length - 1
      ? undefined
      : images[index + 1];
  };

  const onClickDialog: JSX.EventHandler<HTMLDialogElement, MouseEvent> = (
    event,
  ) => {
    // Source: <https://blog.webdevsimplified.com/2023-04/html-dialog/>
    const dialogDimensions = dialogRef.getBoundingClientRect();
    if (
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom
    ) {
      setSelectedImageIndex(null);
    }
  };

  const onCloseDialog: JSX.EventHandlerUnion<HTMLDialogElement, Event> = () => {
    setSelectedImageIndex(null);
  };

  const onClickClose: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (
    event,
  ) => {
    event.preventDefault();
    setSelectedImageIndex(null);
  };

  const onClickPrevious: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (
    event,
  ) => {
    event.preventDefault();

    const accessedPreviousImage = previousImage();

    if (accessedPreviousImage !== undefined) {
      setSelectedImageIndex(accessedPreviousImage.index);
    }
  };

  const onClickNext: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (
    event,
  ) => {
    event.preventDefault();

    const accessedNextImage = nextImage();

    if (accessedNextImage !== undefined) {
      setSelectedImageIndex(accessedNextImage.index);
    }
  };

  createEffect(() => {
    if (selectedImageIndex() === null) {
      dialogRef.close();
      setIsGalleryOpen(false);
    } else {
      if (!dialogRef.open) {
        dialogRef.showModal();
      }
      setIsGalleryOpen(true);
    }
  });

  return (
    <div class="border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
      <div class="flex flex-col gap-4">
        <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <GalleryImage
              image={image}
              setSelectedImageIndex={setSelectedImageIndex}
            />
          ))}
        </div>

        {caption ? (
          <div class="text-sm italic text-center mt-2">{caption}</div>
        ) : null}
      </div>

      <dialog
        class="fixed z-10 top-0 left-[50%] translate-x-[-50%] py-4 w-full max-w-full h-screen max-h-screen m-0 bg-transparent text-slate-200 open:flex flex-col gap-4 backdrop:backdrop-blur-sm backdrop:bg-white/75 dark:bg-slate-900/90 dark:backdrop:bg-black/75"
        onClick={onClickDialog}
        onClose={onCloseDialog}
        ref={dialogRef}
      >
        <div class="flex flex-none justify-end">
          <button
            class="block text-3xl !text-slate-800 leading-none px-4 -mt-1 text-right opacity-50 col-start-1 col-span-3 row-start-1 row-span-1 w-full hover:opacity-100 hover:!no-underline dark:!text-white"
            onClick={onClickClose}
          >
            ×
          </button>
        </div>
        <div class="flex my-auto">
          <button
            class="px-4 col-start-1 col-span-1 row-start-2 row-span-2 text-slate-800 opacity-50 font-bold flex-none hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed dark:text-slate-200"
            onClick={onClickPrevious}
            disabled={previousImage() === undefined}
          >
            ⟨
          </button>
          <div class="flex flex-col">
            <div class="overflow-y-scroll flex justify-center col-start-2 col-span-1 row-start-2 row-span-1">
              <For each={images}>
                {(image) => {
                  return image === undefined ? null : (
                    <div
                      class="flex flex-col gap-4"
                      classList={{
                        "!hidden": selectedImageIndex() !== image.index,
                      }}
                    >
                      <img
                        class="max-w-none w-full !m-0 !rounded-none"
                        src={image.src}
                        width={image.width}
                        height={image.height}
                      />
                      {image.caption ? (
                        <div class="text-sm italic text-center mt-2 !text-slate-800 !dark:text-white">
                          {image.caption}
                        </div>
                      ) : null}
                    </div>
                  );
                }}
              </For>
            </div>
            <Show when={selectedImage()?.caption} keyed>
              {(caption) => {
                return (
                  <div class="text-center italic hidden text-slate-800 col-start-2 col-span-1 row-start-3 row-span-1 dark:text-slate-200">
                    {caption}
                  </div>
                );
              }}
            </Show>
          </div>
          <button
            class="px-4 col-start-3 col-span-1 row-start-2 row-span-2 text-slate-800 opacity-50 font-bold flex-none hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed dark:text-slate-200"
            onClick={onClickNext}
            disabled={nextImage() === undefined}
          >
            ⟩
          </button>
        </div>
      </dialog>
    </div>
  );
}
