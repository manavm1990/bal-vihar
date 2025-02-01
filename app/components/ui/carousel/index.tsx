'use client'

import { cn } from '@lib/utils'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import type useEmblaCarousel from 'embla-carousel-react'
import type { UseEmblaCarouselType } from 'embla-carousel-react'
import * as React from 'react'
import Button from '../button'
import { useCarousel } from './use-carousel'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
  ref?: React.Ref<HTMLDivElement>
}

type CarouselContextProps = ReturnType<typeof useCarousel> &
  Pick<CarouselProps, 'opts' | 'orientation'>

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarouselContext() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

const Carousel = ({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ref,
  ...props
}: CarouselProps) => {
  const carousel = useCarousel({
    orientation,
    opts,
    setApi,
    plugins,
  })

  return (
    <CarouselContext.Provider
      value={{
        ...carousel,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={carousel.handleKeyDown}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

const CarouselContent = React.memo(
  ({
    className,
    ref,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => {
    const { carouselRef, orientation } = useCarouselContext()

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn(
            'flex',
            orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
            className,
          )}
          {...props}
        />
      </div>
    )
  },
)

const CarouselItem = React.memo(
  ({
    className,
    ref,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => {
    const { orientation } = useCarouselContext()

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          'min-w-0 shrink-0 grow-0 basis-full',
          orientation === 'horizontal' ? 'pl-4' : 'pt-4',
          className,
        )}
        {...props}
      />
    )
  },
)

interface ButtonProps extends React.ComponentProps<typeof Button> {
  ref?: React.Ref<HTMLButtonElement>
}

const CarouselPrevious = React.memo(
  ({ className, variant = 'outline', size = 'icon', ref, ...props }: ButtonProps) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarouselContext()

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          'absolute h-8 w-8 rounded-full',
          orientation === 'horizontal'
            ? 'top-1/2 -left-12 -translate-y-1/2'
            : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    )
  },
)

const CarouselNext = React.memo(
  ({ className, variant = 'outline', size = 'icon', ref, ...props }: ButtonProps) => {
    const { orientation, scrollNext, canScrollNext } = useCarouselContext()

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          'absolute h-8 w-8 rounded-full',
          orientation === 'horizontal'
            ? 'top-1/2 -right-12 -translate-y-1/2'
            : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRightIcon className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    )
  },
)

CarouselContent.displayName = 'CarouselContent'
CarouselItem.displayName = 'CarouselItem'
CarouselNext.displayName = 'CarouselNext'
CarouselPrevious.displayName = 'CarouselPrevious'

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi }
