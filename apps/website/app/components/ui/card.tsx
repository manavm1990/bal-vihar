import { cn } from "@lib/utils";
import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function Card({ className, ...props }: Props) {
  return (
    <div
      className={cn("bg-background text-foreground rounded-lg border shadow-sm", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: Props) {
  return <div className={cn("flex flex-col space-y-1.5 p-4", className)} {...props} />;
}

function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-foreground text-2xl leading-none font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

function CardContent({ className, ...props }: Props) {
  return <div className={cn("p-4 pt-0", className)} {...props} />;
}

function CardFooter({ className, ...props }: Props) {
  return (
    <div className={cn("flex items-center p-4 pt-0", "mt-auto border-t", className)} {...props} />
  );
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
