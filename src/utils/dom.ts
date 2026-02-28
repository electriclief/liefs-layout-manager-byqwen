/**
 * DOM utilities for safe element manipulation
 * 
 * Test coverage: tests/unit/utils/dom.test.ts
 */

import type { Bounds } from '../core/types.js';

/**
 * Create an HTML element with optional attributes and styles
 * 
 * @param tag - HTML tag name
 * @param options - Optional configuration
 * @returns Created element
 * 
 * @example
 * ```typescript
 * const div = createElement('div', {
 *   id: 'myDiv',
 *   className: 'container',
 *   styles: { display: 'flex', backgroundColor: 'red' }
 * });
 * ```
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options?: {
    id?: string;
    className?: string;
    styles?: Partial<CSSStyleDeclaration>;
    attributes?: Record<string, string>;
    children?: HTMLElement[];
  }
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  
  if (options) {
    if (options.id) {
      element.id = options.id;
    }
    
    if (options.className) {
      element.className = options.className;
    }
    
    if (options.styles) {
      Object.assign(element.style, options.styles);
    }
    
    if (options.attributes) {
      for (const [key, value] of Object.entries(options.attributes)) {
        element.setAttribute(key, value);
      }
    }
    
    if (options.children) {
      for (const child of options.children) {
        element.appendChild(child);
      }
    }
  }
  
  return element;
}

/**
 * Set multiple styles on an element
 * 
 * @param element - Target element
 * @param styles - Style properties to set
 * 
 * @example
 * ```typescript
 * setStyles(div, {
 *   display: 'flex',
 *   width: '100px',
 *   height: '100px'
 * });
 * ```
 */
export function setStyles(
  element: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
): void {
  Object.assign(element.style, styles);
}

/**
 * Get computed styles from an element
 * 
 * @param element - Target element
 * @param properties - Style properties to retrieve
 * @returns Object with requested style values
 * 
 * @example
 * ```typescript
 * const styles = getStyles(div, ['width', 'height', 'display']);
 * // { width: '100px', height: '100px', display: 'flex' }
 * ```
 */
export function getStyles<T extends string>(
  element: HTMLElement,
  properties: T[]
): Record<T, string> {
  const computed = window.getComputedStyle(element);
  const result = {} as Record<T, string>;
  
  for (const prop of properties) {
    result[prop as T] = computed.getPropertyValue(
      prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
    );
  }
  
  return result;
}

/**
 * Add a CSS class to an element
 * 
 * @param element - Target element
 * @param className - Class name to add
 * 
 * @example
 * ```typescript
 * addClass(div, 'active');
 * ```
 */
export function addClass(element: HTMLElement, className: string): void {
  element.classList.add(className);
}

/**
 * Remove a CSS class from an element
 * 
 * @param element - Target element
 * @param className - Class name to remove
 * 
 * @example
 * ```typescript
 * removeClass(div, 'active');
 * ```
 */
export function removeClass(element: HTMLElement, className: string): void {
  element.classList.remove(className);
}

/**
 * Check if an element has a CSS class
 * 
 * @param element - Target element
 * @param className - Class name to check
 * @returns True if element has the class
 * 
 * @example
 * ```typescript
 * hasClass(div, 'active') // true or false
 * ```
 */
export function hasClass(element: HTMLElement, className: string): boolean {
  return element.classList.contains(className);
}

/**
 * Set multiple attributes on an element
 * 
 * @param element - Target element
 * @param attributes - Attributes to set
 * 
 * @example
 * ```typescript
 * setAttrs(div, {
 *   'data-id': '123',
 *   'aria-label': 'My Element'
 * });
 * ```
 */
export function setAttrs(
  element: HTMLElement,
  attributes: Record<string, string>
): void {
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
}

/**
 * Get an element's bounds relative to its offset parent
 * 
 * @param element - Target element
 * @returns Bounds object with x, y, width, height
 * 
 * @example
 * ```typescript
 * const bounds = getBounds(div);
 * // { x: 100, y: 50, width: 200, height: 150 }
 * ```
 */
export function getBounds(element: HTMLElement): Bounds {
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
}

/**
 * Get an element's bounds relative to the viewport
 * 
 * @param element - Target element
 * @returns DOMRect with viewport-relative bounds
 * 
 * @example
 * ```typescript
 * const rect = getViewportBounds(div);
 * // DOMRect { x, y, width, height, top, right, bottom, left }
 * ```
 */
export function getViewportBounds(element: HTMLElement): DOMRect {
  return element.getBoundingClientRect();
}

/**
 * Remove an element from the DOM (safely)
 * 
 * @param element - Element to remove
 * 
 * @example
 * ```typescript
 * removeElement(div);
 * ```
 */
export function removeElement(element: HTMLElement | null): void {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

/**
 * Clear all children from an element
 * 
 * @param element - Parent element to clear
 * 
 * @example
 * ```typescript
 * clearChildren(container);
 * ```
 */
export function clearChildren(element: HTMLElement): void {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Set the text content of an element safely
 * 
 * @param element - Target element
 * @param text - Text content
 * 
 * @example
 * ```typescript
 * setText(div, 'Hello World');
 * ```
 */
export function setText(element: HTMLElement, text: string): void {
  element.textContent = text;
}

/**
 * Set the HTML content of an element (use with caution)
 * 
 * @param element - Target element
 * @param html - HTML content
 * 
 * @example
 * ```typescript
 * setHtml(div, '<span>Hello</span>');
 * ```
 */
export function setHtml(element: HTMLElement, html: string): void {
  element.innerHTML = html;
}
