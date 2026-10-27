"use client";

import useImageGallery from "@lib/hooks/use-image-gallery";
import { urlFor } from "@lib/sanity/image";
import type { SanityImageValue } from "@lib/sanity/types";
import { isReducedMotionPreferred } from "@lib/utils";
import { ChevronLeftIcon, ChevronRightIcon, Cross2Icon, Share1Icon } from "@radix-ui/react-icons";
import useEmblaCarousel from "embla-carousel-react";
import Image, { type StaticImageData } from "next/image";
import { type KeyboardEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";

interface GalleryImageBase {
  alt: string;
  caption?: string;
  /** A link that shares this photo, such as a WhatsApp message. Shown in the viewer. */
  shareHref?: string;
}

/** A photo bundled with the site. */
export interface GalleryImage extends GalleryImageBase {
  src: StaticImageData;
}

/** A photo uploaded in Studio. */
export interface GalleryPhoto extends GalleryImageBase {
  image: SanityImageValue;
}

type AnyGalleryImage = GalleryImage | GalleryPhoto;

const CONTROL_CLASS =
  "absolute size-12 rounded-full bg-black/55 text-white hover:bg-black/75 hover:text-white";

// Only the photos this close to the one on screen are loaded, so a long gallery stays light.
const LOAD_DISTANCE = 2;

interface ImageGalleryProps {
  images: AnyGalleryImage[];
  label: string;
}

export default function ImageGallery({ images, label }: ImageGalleryProps) {
  const {
    dialogRef,
    startIndex,
    isOpen,
    open,
    close,
    handleKeyDown,
    handleCancel,
    handleBackdropClick,
    handleClosed,
  } = useImageGallery();

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, position) => (
          <li key={getImageKey(image)}>
            <button
              type="button"
              onClick={() => open(position)}
              className="group focus-visible:ring-ring block w-full space-y-1.5 text-left focus-visible:ring-2 focus-visible:outline-none"
            >
              <span className="relative block aspect-4/3 overflow-hidden rounded-lg border">
                <GalleryPicture
                  image={image}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  width={800}
                  isThumbnail
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </span>
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
        onCancel={handleCancel}
        onClick={handleBackdropClick}
        onClose={handleClosed}
        className="gallery-viewer m-auto w-[calc(100%-2rem)] max-w-5xl bg-transparent p-0 backdrop:bg-black/90 backdrop:backdrop-blur-sm"
      >
        {isOpen ? <GalleryViewer images={images} startIndex={startIndex} onClose={close} /> : null}
      </dialog>
    </>
  );
}

interface GalleryPictureProps {
  image: AnyGalleryImage;
  sizes: string;
  width: number;
  className: string;
  /** Crops to the thumbnail shape, following the focus point set in Studio. */
  isThumbnail?: boolean;
}

/** Fills the box around it with one photo, whether bundled or from Studio. */
function GalleryPicture({
  image,
  sizes,
  width,
  className,
  isThumbnail = false,
}: GalleryPictureProps) {
  if ("src" in image)
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        className={className}
      />
    );

  const source = image.image;
  if (!source.asset?._id) return null;

  const url = isThumbnail
    ? urlFor(source)
        .width(width)
        .height(Math.round(width * 0.75))
        .fit("crop")
        .url()
    : urlFor(source).width(width).fit("max").auto("format").url();
  const lqip = source.asset.metadata?.lqip;

  return (
    <Image
      src={url}
      alt={source.alt?.trim() || image.alt}
      fill
      sizes={sizes}
      placeholder={lqip ? "blur" : "empty"}
      blurDataURL={lqip ?? undefined}
      className={className}
    />
  );
}

interface GalleryViewerProps {
  images: AnyGalleryImage[];
  startIndex: number;
  onClose: () => void;
}

/** A swipeable carousel of every photo, starting on the one that was chosen. */
function GalleryViewer({ images, startIndex, onClose }: GalleryViewerProps) {
  const [viewportRef, carousel] = useEmblaCarousel({ loop: true, startIndex });
  const [selected, setSelected] = useState(startIndex);
  const current = images[selected];

  useEffect(() => {
    if (!carousel) return;

    const syncSelected = () => setSelected(carousel.selectedScrollSnap());
    carousel.on("select", syncSelected);

    return () => {
      carousel.off("select", syncSelected);
    };
  }, [carousel]);

  // With reduced motion a button press jumps to the photo instead of sliding.
  const showPrevious = () => carousel?.scrollPrev(isReducedMotionPreferred());
  const showNext = () => carousel?.scrollNext(isReducedMotionPreferred());

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") showPrevious();
    if (event.key === "ArrowRight") showNext();
  };

  return (
    <figure className="space-y-3" onKeyDown={handleKeyDown}>
      {/* A stage of one fixed size, so the buttons stay put whatever shape each photo is. */}
      <div className="relative">
        <div ref={viewportRef} className="overflow-hidden rounded-lg">
          <div className="flex touch-pan-y">
            {images.map((image, position) => (
              <div
                key={getImageKey(image)}
                className="relative h-[min(72vh,50rem)] min-w-0 shrink-0 grow-0 basis-full"
              >
                {isNear(position, selected, images.length) ? (
                  <GalleryPicture
                    image={image}
                    sizes="(min-width: 1024px) 64rem, 100vw"
                    width={1600}
                    className="object-contain select-none"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <ViewerButton label="Close" position="top-3 right-3" onClick={onClose}>
          <Cross2Icon aria-hidden="true" className="size-5" />
        </ViewerButton>
        {current?.shareHref ? (
          <Button asChild variant="ghost" className={`${CONTROL_CLASS} top-3 right-[4.5rem]`}>
            <a href={current.shareHref} target="_blank" rel="noopener noreferrer">
              <Share1Icon aria-hidden="true" className="size-5" />
              <span className="sr-only">Share this photo on WhatsApp</span>
            </a>
          </Button>
        ) : null}
        <ViewerButton
          label="Previous photo"
          position="top-1/2 left-3 -translate-y-1/2"
          onClick={showPrevious}
        >
          <ChevronLeftIcon aria-hidden="true" className="size-6" />
        </ViewerButton>
        <ViewerButton
          label="Next photo"
          position="top-1/2 right-3 -translate-y-1/2"
          onClick={showNext}
        >
          <ChevronRightIcon aria-hidden="true" className="size-6" />
        </ViewerButton>
      </div>
      <figcaption className="min-h-12 space-y-1 text-center text-white">
        {current?.caption ? <p className="text-base">{current.caption}</p> : null}
        <p aria-live="polite" className="text-sm text-white/70">
          {selected + 1} of {images.length}
        </p>
      </figcaption>
    </figure>
  );
}

interface ViewerButtonProps {
  label: string;
  /** Where on the stage the button sits, as Tailwind position classes. */
  position: string;
  onClick: () => void;
  children: React.ReactNode;
}

/** A round button over the photo, labelled for screen readers. */
function ViewerButton({ label, position, onClick, children }: ViewerButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className={`${CONTROL_CLASS} ${position}`}
    >
      {children}
      <span className="sr-only">{label}</span>
    </Button>
  );
}

const getImageKey = (image: AnyGalleryImage) =>
  "src" in image ? image.src.src : (image.image.asset?._id ?? image.alt);

/** The carousel loops, so the distance between two photos can go either way round. */
const isNear = (position: number, selected: number, count: number) => {
  const distance = Math.abs(position - selected);

  return Math.min(distance, count - distance) <= LOAD_DISTANCE;
};
