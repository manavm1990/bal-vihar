'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@components/ui/carousel'
import Image from 'next/image'

const IMAGES = [
  {
    src: 'https://d8n3.c1.e2-8.dev/bal-vihar/hero%2F2014-republic-day.jpeg',
    alt: '',
    caption: 'Canstruction',
  },
  {
    src: 'https://d8n3.c1.e2-8.dev/bal-vihar/hero%2F2015-diwali.jpg',
    alt: '',
    caption: '2014 Republic Day',
  },
  {
    src: 'https://d8n3.c1.e2-8.dev/bal-vihar/hero%2F2015-diwali.jpg',
    alt: '',
    caption: '2015 Diwali',
  },
  {
    src: 'https://d8n3.c1.e2-8.dev/bal-vihar/hero%2F2016-canstruction.jpg',
    alt: '',
    caption: '2016 Canstruction',
  },
  {
    src: 'https://d8n3.c1.e2-8.dev/bal-vihar/hero%2Fcanstruction-team.jpg',
    alt: '',
    caption: 'Canstruction Volunteers',
  },
] as const

export function HeroCarousel() {
  return (
    <Carousel className="mx-auto w-full max-w-5xl">
      <CarouselContent>
        {IMAGES.map((image, index) => (
          <CarouselItem key={index}>
            <figure className="flex flex-col">
              <div className="relative aspect-[940/272] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority={index === 0}
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
  )
}
