import { isReducedMotionPreferred } from "@lib/utils";
import { type KeyboardEvent, type MouseEvent, type SyntheticEvent, useRef } from "react";

/**
 * A modal `<dialog>` that closes with the site's exit animation (the `.closing` class in
 * globals.css), and closes on Escape and on a click outside it.
 */
export default function useAnimatedDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => {
    const dialog = dialogRef.current;
    dialog?.classList.remove("closing");
    dialog?.showModal();
  };

  // Plays the closing animation first, unless the visitor asked for less motion.
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

  // The browser would close on Escape at once, so close through the animation instead.
  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    close();
  };

  // The same for other ways the browser can ask to close, such as the Android back button.
  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    close();
  };

  // A click on the dialog element itself, not its contents, lands on the backdrop.
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return { dialogRef, open, close, handleKeyDown, handleCancel, handleBackdropClick };
}
