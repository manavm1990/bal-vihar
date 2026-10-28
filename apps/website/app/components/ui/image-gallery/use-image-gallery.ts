import useAnimatedDialog from "@lib/hooks/use-animated-dialog";
import { useState } from "react";

export default function useImageGallery() {
  const dialog = useAnimatedDialog();
  const [startIndex, setStartIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const open = (position: number) => {
    setStartIndex(position);
    setIsOpen(true);
    dialog.open();
  };

  return { ...dialog, open, startIndex, isOpen, handleClosed: () => setIsOpen(false) };
}
