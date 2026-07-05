import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function useMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const containerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // Effect is needed to collapse and reset the mobile menu whenever the route changes.
    if (!pathname) return;
    setIsOpen(false);
    setActiveSection(null);
  }, [pathname]);

  return { isOpen, setIsOpen, activeSection, setActiveSection, containerRef } as const;
}
