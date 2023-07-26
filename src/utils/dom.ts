export function findParentElement(
  startFrom: Element | null | undefined,
  predicate: (el: HTMLElement) => boolean,
): HTMLElement | undefined {
  let currentElement: Element | null | undefined = startFrom;

  while (currentElement != null) {
    if (currentElement instanceof HTMLElement && predicate(currentElement)) {
      return currentElement;
    }

    currentElement = currentElement.parentElement;
  }

  return undefined;
}
