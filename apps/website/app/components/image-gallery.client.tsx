"use client";

import useImageGallery from "@lib/hooks/use-image-gallery";
import { ChevronLeftIcon, ChevronRightIcon, Cross2Icon } from "@radix-ui/react-icons";
import Image, { type StaticImageData } from "next/image";

import { Button } from "./ui/button";

export interface GalleryImage {
  src: StaticImageData;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  label: string;
}

/** A grid of photo thumbnails that open in a full-size viewer with previous and next controls. */
export default function ImageGallery({ images, label }: ImageGalleryProps) {
  const { dialogRef, index, open, close, step, handleKeyDown, handleBackdropClick } =
    useImageGallery(images.length);
  const current = images[index];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, position) => (
          <li key={image.alt}>
            <button
              type="button"
              onClick={() => open(position)}
              className="group focus-visible:ring-ring block w-full space-y-1.5 text-left focus-visible:ring-2 focus-visible:outline-none"
            >
              <Image
                src={image.src}
                alt={image.alt}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                placeholder="blur"
                className="aspect-4/3 w-full rounded-lg border object-cover transition-opacity group-hover:opacity-90"
              />
              {image.caption && (
                <span className="text-muted-foreground block text-sm">{image.caption}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialogRef}
        aria-label={label}
        onKeyDown={handleKeyDown}
        onClick={handleBackdropClick}
        className="m-auto w-[calc(100%-2rem)] max-w-5xl bg-transparent p-0 backdrop:bg-black/85"
      >
        {current && (
          <figure className="space-y-3">
            <Image
              src={current.src}
              alt={current.alt}
              sizes="(min-width: 1024px) 64rem, 100vw"
              placeholder="blur"
              className="mx-auto h-auto max-h-[75vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="text-center text-sm text-white">
              {current.caption ?? current.alt}
            </figcaption>
            <div className="flex items-center justify-center gap-3">
              <Button type="button" variant="secondary" size="icon" onClick={() => step(-1)}>
                <ChevronLeftIcon aria-hidden="true" />
                <span className="sr-only">Previous photo</span>
              </Button>
              <p aria-live="polite" className="min-w-16 text-center text-sm text-white">
                {index + 1} of {images.length}
              </p>
              <Button type="button" variant="secondary" size="icon" onClick={() => step(1)}>
                <ChevronRightIcon aria-hidden="true" />
                <span className="sr-only">Next photo</span>
              </Button>
              <Button type="button" variant="secondary" size="icon" onClick={close}>
                <Cross2Icon aria-hidden="true" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </figure>
        )}
      </dialog>
    </>
  );
}
