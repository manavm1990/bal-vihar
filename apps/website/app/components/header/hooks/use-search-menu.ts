import { useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import useLiveSearch from "./use-live-search";

export default function useSearchMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const { settled, isPending } = useLiveSearch(query);

  const close = () => {
    setIsOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    close();
  };

  return {
    isOpen,
    setIsOpen,
    query,
    setQuery,
    close,
    submit,
    settled,
    isPending,
    shouldReduceMotion,
  } as const;
}
