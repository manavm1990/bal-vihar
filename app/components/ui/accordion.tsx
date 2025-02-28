import { cn } from '@lib/utils'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { MinusIcon, PlusIcon } from './icons'

const Accordion = AccordionPrimitive.Root

type AccordionContentProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>

type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>

type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>

const AccordionContent = ({ className, children, ...props }: AccordionContentProps) => (
  <AccordionPrimitive.Content
    className={cn(
      'text-muted-foreground data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down mt-2 overflow-hidden pr-12',
      className,
    )}
    {...props}
  >
    <p className="text-base leading-7">{children}</p>
  </AccordionPrimitive.Content>
)
AccordionContent.displayName = 'AccordionContent'

const AccordionItem = ({ className, ...props }: AccordionItemProps) => (
  <AccordionPrimitive.Item className={cn('py-3 first:pt-0 last:pb-0', className)} {...props} />
)
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = ({ className, children, ...props }: AccordionTriggerProps) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      className={cn(
        'group text-foreground flex w-full items-start justify-between text-left',
        className,
      )}
      {...props}
    >
      <span className="text-base leading-7 font-semibold">{children}</span>
      <span className="ml-6 flex h-7 items-center">
        <PlusIcon className="text-primary size-6 group-data-[state=open]:hidden" />
        <MinusIcon className="text-primary hidden size-6 group-data-[state=open]:block" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
)
AccordionTrigger.displayName = 'AccordionTrigger'

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
