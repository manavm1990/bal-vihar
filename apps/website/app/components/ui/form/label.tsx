import type { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ htmlFor, required, children, ...props }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-foreground block text-sm/6 font-semibold" {...props}>
      {children}
      {required && (
        <span aria-hidden="true" className="text-destructive">
          {" "}
          *
        </span>
      )}
    </label>
  );
}
