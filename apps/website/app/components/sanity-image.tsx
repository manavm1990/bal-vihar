import { urlFor } from "@lib/sanity/image";
import type { SanityImageValue } from "@lib/sanity/types";
import Image from "next/image";

interface SanityImageProps {
  value: SanityImageValue;
  fallbackAlt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
}

export function SanityImage({
  value,
  fallbackAlt = "",
  width = 800,
  height = Math.round(width / 1.5),
  className,
  priority = false,
  sizes,
  fill = false,
}: SanityImageProps) {
  const src = value.asset?._id
    ? urlFor(value).width(width).height(height).fit("crop").url()
    : value.asset?.url;
  const lqip = value.asset?.metadata?.lqip;

  return !src ? null : (
    <Image
      className={className}
      src={src}
      alt={value.alt?.trim() || fallbackAlt}
      {...(fill ? { fill: true } : { width, height })}
      sizes={sizes}
      priority={priority}
      placeholder={lqip ? "blur" : "empty"}
      blurDataURL={lqip ?? undefined}
    />
  );
}
