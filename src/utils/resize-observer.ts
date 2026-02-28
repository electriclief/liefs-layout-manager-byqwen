/**
 * Resize Observer Utility - Watch elements for size changes
 * 
 * Test coverage: tests/unit/utils/resize-observer.test.ts
 */

/** Callback type for resize observations */
export type ResizeCallback = (width: number, height: number) => void;

/**
 * Observe an element for resize changes
 * 
 * @param element - Element to observe
 * @param callback - Function to call on resize
 * @returns Unsubscribe function
 * 
 * @example
 * ```typescript
 * const unobserve = observeElement(div, (width, height) => {
 *   console.log('New size:', width, height);
 * });
 * // Later: unobserve();
 * ```
 */
export function observeElement(
  element: HTMLElement,
  callback: ResizeCallback
): () => void {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === element) {
        const { width, height } = entry.contentRect;
        callback(width, height);
      }
    }
  });

  observer.observe(element);

  // Return unsubscribe function
  return () => {
    observer.unobserve(element);
    observer.disconnect();
  };
}

/**
 * Observe multiple elements for resize changes
 * 
 * @param elements - Array of elements to observe
 * @param callback - Function to call on any resize
 * @returns Unsubscribe function
 * 
 * @example
 * ```typescript
 * const unobserve = observeElements([div1, div2], (width, height) => {
 *   console.log('Something resized:', width, height);
 * });
 * ```
 */
export function observeElements(
  elements: HTMLElement[],
  callback: ResizeCallback
): () => void {
  const observers: ResizeObserver[] = [];
  const unobservers: (() => void)[] = [];

  for (const element of elements) {
    const unobserve = observeElement(element, callback);
    unobservers.push(unobserve);
  }

  // Return combined unsubscribe function
  return () => {
    for (const unobserve of unobservers) {
      unobserve();
    }
  };
}

/**
 * Check if ResizeObserver is supported in current environment
 * 
 * @returns True if ResizeObserver is available
 * 
 * @example
 * ```typescript
 * if (isResizeObserverSupported()) {
 *   // Use ResizeObserver
 * } else {
 *   // Fallback
 * }
 * ```
 */
export function isResizeObserverSupported(): boolean {
  return typeof ResizeObserver !== 'undefined';
}
