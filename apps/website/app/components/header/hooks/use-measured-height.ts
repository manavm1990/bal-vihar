import { useEffect, useRef, useState } from "react";

export default function useMeasuredHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    // Effect is needed to observe the element's size for as long as it is mounted.
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) setHeight(entry.contentRect.height);
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, height } as const;
}
