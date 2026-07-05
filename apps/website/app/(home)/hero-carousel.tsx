"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import Image from "next/image";

interface HeroImage {
  src: string;
  alt: string;
  caption: string;
}

const IMAGES: HeroImage[] = [
  {
    src: "https://d8n3.c1.e2-8.dev/bal-vihar/hero%2F2014-republic-day.jpeg",
    caption: "2014 Republic Day",
    alt: "Bal Vihar students and community members celebrating Republic Day in 2014.",
  },
  {
    src: "https://d8n3.c1.e2-8.dev/bal-vihar/hero%2F2015-diwali.jpg",
    caption: "2015 Diwali",
    alt: "Bal Vihar students and families celebrating Diwali in 2015.",
  },
  {
    src: "https://d8n3.c1.e2-8.dev/bal-vihar/hero%2F2016-canstruction.jpg",
    caption: "2016 Canstruction",
    alt: "Bal Vihar Canstruction project display from 2016.",
  },
  {
    src: "https://d8n3.c1.e2-8.dev/bal-vihar/hero%2Fcanstruction-team.jpg",
    caption: "Canstruction Volunteers",
    alt: "Bal Vihar volunteers gathered with a Canstruction community service project.",
  },
];

export function HeroCarousel() {
  return (
    <Carousel className="mx-auto w-full max-w-5xl">
      <CarouselContent>
        {IMAGES.map((image) => (
          <CarouselItem key={image.src}>
            <figure className="flex flex-col">
              <div className="relative aspect-[940/272] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority={image.src === IMAGES[0]?.src}
                />
              </div>
              <figcaption className="bg-gray-800 py-2 text-center text-sm text-gray-200">
                {image.caption}
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
