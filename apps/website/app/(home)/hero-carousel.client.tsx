"use client";

import { SanityImage } from "@components/sanity/sanity-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import type { HomeHeroSlide } from "@lib/sanity/types";
import Link from "next/link";

interface HeroCarouselProps {
  slides: HomeHeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  return slides.length === 0 ? null : (
    <Carousel className="mx-auto w-full max-w-5xl">
      <CarouselContent>
        {slides.map((slide, index) => {
          const caption = slide.image?.caption ?? slide.image?.alt ?? "Bal Vihar photo";
          const external = !slide.link?.startsWith("/");
          const content = (
            <figure className="flex flex-col">
              <div className="relative aspect-940/272 w-full overflow-hidden rounded-lg">
                <SlideImage slide={slide} priority={index === 0} />
                <figcaption className="bg-background/95 text-foreground absolute bottom-3 left-3 rounded-md px-3 py-1 text-sm font-medium">
                  {caption}
                </figcaption>
              </div>
            </figure>
          );

          return (
            <CarouselItem key={slide.key}>
              {slide.link ? (
                external ? (
                  <a href={slide.link} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <Link href={slide.link}>{content}</Link>
                )
              ) : (
                content
              )}
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

interface SlideImageProps {
  slide: HomeHeroSlide;
  priority: boolean;
}

function SlideImage({ slide, priority }: SlideImageProps) {
  return !slide.image ? null : (
    <SanityImage
      value={slide.image}
      fill
      width={1200}
      height={348}
      sizes="(max-width: 1024px) 100vw, 1024px"
      className="object-cover"
      priority={priority}
    />
  );
}
