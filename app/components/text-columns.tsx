import { cn } from '../lib/utils'

export interface TextColumnsProps {
  children: React.ReactNode
  className?: string
}

export default function TextColumns({ children, className }: TextColumnsProps) {
  return (
    <div
      className={cn(
        'columns-1 space-y-6 py-4 md:columns-2 md:gap-x-12 [&_p]:text-pretty [&_section]:break-inside-avoid-column',
        className,
      )}
    >
      {children}
    </div>
  )
}
