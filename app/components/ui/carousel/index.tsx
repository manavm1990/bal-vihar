/**
 * * This carousel uses React Context in a unique way - not for global state,
 * but for flexible component composition. While all components are defined
 * in one file, Context allows the carousel to be used in different layouts:
 *
 * @example Horizontal hero carousel with custom nav placement
 * <Carousel>
 *   <CarouselContent>
 *     <CarouselItem>1</CarouselItem>
 *   </CarouselContent>
 *   <div className="flex justify-between">
 *     <CarouselPrevious className="relative left-0" />
 *     <CarouselNext className="relative right-0" />
 *   </div>
 * </Carousel>
 *
 * @example Vertical sidebar carousel
 * <Carousel orientation="vertical">
 *   <CarouselPrevious className="mx-auto" />
 *   <CarouselContent>
 *     <CarouselItem>1</CarouselItem>
 *   </CarouselContent>
 *   <CarouselNext className="mx-auto" />
 * </Carousel>
 */

'use client'

import { cn } from '@lib/utils'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import type useEmblaCarousel from 'embla-carousel-react'
import type { UseEmblaCarouselType } from 'embla-carousel-react'
import * as React from 'react'
import { Button } from '../button'
import { useCarousel } from './use-carousel'

type CarouselApi = UseEmblaCarouselType[1]
type CarouselContextProps = ReturnType<typeof useCarousel> &
  Pick<CarouselProps, 'opts' | 'orientation'>
interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
  ref?: React.Ref<HTMLDivElement>
}
type CarouselOptions = UseCarouselParameters[0]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarouselContext() {
  const context = React.useContext(CarouselContext)

  if (!context) throw new Error('useCarousel must be used within a <Carousel />')

  return context
}

const Carousel = ({
  orientation = 'horizontal',
  opts,
  setApi,
  className,
  children,
  ref,
  ...props
}: CarouselProps) => {
  const carousel = useCarousel({
    orientation,
    opts,
    setApi,
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

/**
 * `CarouselContent` and `CarouselItem` components get orientation
 * and other carousel state from Context instead of props,
 * making them more flexible to position and style
 */
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

/**
 * Navigation buttons can be positioned anywhere in the carousel
 * while maintaining access to scroll controls via Context.
 */
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
