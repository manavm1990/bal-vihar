import { cn } from '@lib/utils'
import { type HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

const Card = ({ className, ...props }: Props) => (
  <div
    className={cn('bg-background text-foreground rounded-lg border shadow-sm', className)}
    {...props}
  />
)

const CardHeader = ({ className, ...props }: Props) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
)

const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn('text-foreground text-2xl leading-none font-semibold tracking-tight', className)}
    {...props}
  />
)

const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-muted-foreground text-sm', className)} {...props} />
)

const CardContent = ({ className, ...props }: Props) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
)

const CardFooter = ({ className, ...props }: Props) => (
  <div className={cn('flex items-center p-6 pt-0', 'mt-auto border-t', className)} {...props} />
)

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
