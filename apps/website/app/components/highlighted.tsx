import type { HighlightPart } from "@lib/search/search";

interface HighlightedProps {
  parts: HighlightPart[];
}

export default function Highlighted({ parts }: HighlightedProps) {
  // Each part's key is where it starts in the text, which is unique and stable.
  let offset = 0;

  return (
    <>
      {parts.map((part) => {
        const key = offset;
        offset += part.text.length;

        return part.isMatch ? (
          <mark key={key} className="bg-primary-200 text-foreground rounded-sm px-0.5">
            {part.text}
          </mark>
        ) : (
          <span key={key}>{part.text}</span>
        );
      })}
    </>
  );
}
