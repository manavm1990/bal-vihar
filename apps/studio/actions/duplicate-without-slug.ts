import type { DuplicateActionProps, DuplicateDocumentActionComponent } from "sanity";

const WRAPPED = new WeakMap<DuplicateDocumentActionComponent, DuplicateDocumentActionComponent>();

export function createDuplicateWithoutSlug(originalAction: DuplicateDocumentActionComponent) {
  const cached = WRAPPED.get(originalAction);
  if (cached) return cached;

  function DuplicateWithoutSlugAction(props: DuplicateActionProps) {
    return originalAction({
      ...props,
      mapDocument: (document) => {
        const { slug, ...rest } = props.mapDocument ? props.mapDocument(document) : document;
        return rest;
      },
    });
  }
  DuplicateWithoutSlugAction.action = originalAction.action;

  WRAPPED.set(originalAction, DuplicateWithoutSlugAction);
  return DuplicateWithoutSlugAction;
}
