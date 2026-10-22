"use client";

import { Button } from "@components/ui/button";
import { usePathname } from "next/navigation";
import { useVisualEditingEnvironment } from "next-sanity/hooks";

/**
 * Lets editors leave draft preview and see the published site again.
 * Hidden inside the Presentation iframe (Studio already owns that chrome).
 */
export function DisableDraftMode() {
  const environment = useVisualEditingEnvironment();
  const pathname = usePathname();

  // Presentation Tool provides its own exit; only show on a normal browser tab.
  if (environment === "presentation-iframe") return null;

  const href = `/api/draft-mode/disable?redirect=${encodeURIComponent(pathname || "/")}`;

  return (
    <div className="fixed right-4 bottom-20 z-50 md:bottom-4">
      <Button asChild size="sm" variant="secondary" className="shadow-md">
        <a href={href}>Exit preview</a>
      </Button>
    </div>
  );
}
