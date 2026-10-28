import { isReducedMotionPreferred } from "@lib/utils";
import { type KeyboardEvent, type MouseEvent, type SyntheticEvent, useRef } from "react";

export default function useAnimatedDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => {
    const dialog = dialogRef.current;
    dialog?.classList.remove("closing");
    dialog?.showModal();
  };

  const close = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open || dialog.classList.contains("closing")) return;

    if (isReducedMotionPreferred()) {
      dialog.close();
      return;
    }

    dialog.classList.add("closing");
    const finishClose = (animationEvent: AnimationEvent) => {
      if (animationEvent.target !== dialog) return;
      dialog.removeEventListener("animationend", finishClose);
      dialog.classList.remove("closing");
      dialog.close();
    };
    dialog.addEventListener("animationend", finishClose);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    close();
  };

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    close();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return { dialogRef, open, close, handleKeyDown, handleCancel, handleBackdropClick };
}
