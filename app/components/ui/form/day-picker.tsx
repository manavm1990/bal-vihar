'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { DayPicker as DayPickerPrimitive } from 'react-day-picker'

export interface CalendarProps {
  showOutsideDays?: boolean
  numberOfMonths?: number
  onDateSelect?: (date: Date | undefined) => void
}

export function DayPicker({ showOutsideDays = true, numberOfMonths, onDateSelect }: CalendarProps) {
  return (
    <DayPickerPrimitive
      showOutsideDays={showOutsideDays}
      className={`w-fit rounded-lg bg-white p-4 shadow-md`}
      classNames={{
        months: 'relative flex',
        month_caption: 'relative mx-8 flex h-8 items-center justify-center',
        weekdays: 'flex flex-row',
        weekday: 'w-8 text-sm font-normal text-muted-foreground',
        month: 'w-full',
        caption:
          'relative flex flex-col items-center justify-center pt-1 bg-gradient-to-r from-primary-50 to-navy-50',
        caption_label: 'truncate text-lg font-eczar font-medium text-secondary',
        button_next:
          'absolute top-0 right-0 size-8 bg-transparent p-0 opacity-80 hover:opacity-100 hover:text-primary transition-colors',
        button_previous:
          'absolute top-0 left-0 size-8 bg-transparent p-0 opacity-80 hover:opacity-100 hover:text-primary transition-colors',
        nav: 'flex items-center justify-between w-full mb-2',
        month_grid: 'mx-auto mt-4',
        week: 'mt-2 flex w-max items-start',
        day: 'flex size-8 flex-1 items-center justify-center p-0 text-sm',
        day_button: 'size-8 rounded-md p-0 font-normal transition-none aria-selected:opacity-100',
        selected:
          '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground',
        today:
          '[&>button]:bg-accent [&>button]:text-accent-foreground [&>button]:shadow-[0_0_8px_var(--color-primary-300)]',
        outside: 'day-outside text-muted-foreground opacity-50',
        disabled: 'text-muted-foreground opacity-50',
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === 'left' ? ChevronLeftIcon : ChevronRightIcon
          return <Icon className="size-4" />
        },
      }}
      numberOfMonths={numberOfMonths}
      onSelect={onDateSelect} // Pass the handler to the DayPickerPrimitive
    />
  )
}
