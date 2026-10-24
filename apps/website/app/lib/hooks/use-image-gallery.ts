import { type KeyboardEvent, type MouseEvent, useRef, useState } from "react";

export default function useImageGallery(count: number) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const open = (position: number) => {
    setIndex(position);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const step = (direction: 1 | -1) => setIndex((current) => (current + direction + count) % count);

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  // A click on the dialog element itself, not its contents, lands on the backdrop.
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return { dialogRef, index, open, close, step, handleKeyDown, handleBackdropClick };
}
