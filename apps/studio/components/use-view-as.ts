import { getViewAs, isAdministrator, VIEW_AS_KEY } from "@bv/schemas";
import { useCurrentUser } from "sanity";
import { type DemoView, isDemoView } from "../roles";

export default function useViewAs() {
  const user = useCurrentUser();
  const canSwitch = isAdministrator(user);
  const chosen = getViewAs();

  return {
    canSwitch,
    switchView,
    viewAs: canSwitch && isDemoView(chosen) ? chosen : null,
  } as const;
}

function switchView(view: DemoView | null) {
  try {
    if (view) localStorage.setItem(VIEW_AS_KEY, view);
    else localStorage.removeItem(VIEW_AS_KEY);
  } catch {
    return;
  }

  window.location.reload();
}
