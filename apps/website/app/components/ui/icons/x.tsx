import { cn } from "@lib/utils";
import { SVG_PROPS } from "./constants";
import type { IconProps } from "./icons.types";

export default function X({ className }: IconProps) {
  return (
    <svg {...SVG_PROPS} className={cn("inline-block size-6", className)}>
      <title>Close</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
