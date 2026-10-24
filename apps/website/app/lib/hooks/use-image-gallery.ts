import { useState } from "react";

import useAnimatedDialog from "./use-animated-dialog";

/** A gallery's viewer dialog, opened on a chosen photo. */
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
