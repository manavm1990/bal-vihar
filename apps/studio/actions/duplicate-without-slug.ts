import type { DuplicateActionProps, DuplicateDocumentActionComponent } from "sanity";

const wrappedActions = new WeakMap<
  DuplicateDocumentActionComponent,
  DuplicateDocumentActionComponent
>();

export function createDuplicateWithoutSlug(originalAction: DuplicateDocumentActionComponent) {
  const cached = wrappedActions.get(originalAction);
  if (cached) return cached;

  const DuplicateWithoutSlugAction = (props: DuplicateActionProps) =>
    originalAction({
      ...props,
      mapDocument: (document) => {
        const { slug, ...rest } = props.mapDocument ? props.mapDocument(document) : document;
        return rest;
      },
    });

  DuplicateWithoutSlugAction.action = originalAction.action;

  wrappedActions.set(originalAction, DuplicateWithoutSlugAction);

  return DuplicateWithoutSlugAction;
}
