"use client";

import useImageGallery from "@lib/hooks/use-image-gallery";
import type { SanityImageValue } from "@lib/sanity/types";
import { ChevronLeftIcon, ChevronRightIcon, Cross2Icon, Share1Icon } from "@radix-ui/react-icons";
import Image, { type StaticImageData } from "next/image";
import { SanityImage } from "./sanity/sanity-image";
import { Button } from "./ui/button";

export interface GalleryImage {
  alt: string;
  caption?: string;
  key?: string;
  /** A link that shares this image, such as a WhatsApp message. Shown in the viewer. */
  shareHref?: string;
  src?: StaticImageData;
  image?: SanityImageValue;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  label: string;
}

export default function ImageGallery({ images, label }: ImageGalleryProps) {
  const { dialogRef, index, open, close, step, handleKeyDown, handleBackdropClick } =
    useImageGallery(images.length);
  const current = images[index];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, position) => (
          <li key={image.key ?? image.alt}>
            <button
              type="button"
              onClick={() => open(position)}
              className="group focus-visible:ring-ring block w-full space-y-1.5 text-left focus-visible:ring-2 focus-visible:outline-none"
            >
              <GalleryPicture
                image={image}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                width={480}
                height={360}
                className="aspect-4/3 w-full rounded-lg border object-cover transition-opacity group-hover:opacity-90"
              />
              {image.caption ? (
                <span className="text-muted-foreground block text-sm">{image.caption}</span>
              ) : null}
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
        {current ? (
          <figure className="space-y-3">
            <GalleryPicture
              image={current}
              sizes="(min-width: 1024px) 64rem, 100vw"
              width={1600}
              height={1200}
              className="mx-auto h-auto max-h-[75vh] w-auto rounded-lg object-contain"
              fill={false}
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
              {current.shareHref ? (
                <Button asChild variant="secondary" size="icon">
                  <a href={current.shareHref} target="_blank" rel="noopener noreferrer">
                    <Share1Icon aria-hidden="true" />
                    <span className="sr-only">Share this photo on WhatsApp</span>
                  </a>
                </Button>
              ) : null}
              <Button type="button" variant="secondary" size="icon" onClick={close}>
                <Cross2Icon aria-hidden="true" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </figure>
        ) : null}
      </dialog>
    </>
  );
}

interface GalleryPictureProps {
  image: GalleryImage;
  sizes: string;
  width: number;
  height: number;
  className: string;
  fill?: boolean;
}

function GalleryPicture({
  image,
  sizes,
  width,
  height,
  className,
  fill = true,
}: GalleryPictureProps) {
  if (image.image)
    return (
      <span className={fill ? "relative block overflow-hidden" : "block"}>
        <SanityImage
          value={image.image}
          fallbackAlt={image.alt}
          fill={fill}
          width={width}
          height={height}
          sizes={sizes}
          className={className}
        />
      </span>
    );

  return !image.src ? null : (
    <Image
      src={image.src}
      alt={image.alt}
      sizes={sizes}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      placeholder="blur"
      className={className}
    />
  );
}
