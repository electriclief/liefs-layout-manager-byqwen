/**
 * Liefs Layout Manager v4.0.0
 *
 * Modern dynamic layout manager with Flexbox, TypeScript, and full test coverage
 *
 * @packageDocumentation
 */

// Core imports
import { Component } from './core/Component';
import { EventEmitter } from './core/EventEmitter';

// Core exports
export { Component } from './core/Component';
export { EventEmitter } from './core/EventEmitter';
export type {
  Dim,
  Orientation,
  Size,
  Position,
  Bounds,
  ComponentOptions,
  LayoutOptions,
  PanelOptions,
  DividerOptions,
  LayoutEvents,
  EventCallback,
  ParsedDim,
} from './core/types';

// Layout Engine exports
export {
  calculateFlexValues,
  applyConstraints,
  resolveDimension,
  calculateRemainingSpace,
  distributeRemainingSpace,
  isFlexible,
  countFlexibleItems,
} from './core/LayoutEngine';

// Component exports
export { Layout } from './components/Layout';
export { Panel } from './components/Panel';
export { Divider } from './components/Divider';

// Utility exports
export {
  isPx,
  isPercent,
  parseDim,
  pxToNumber,
  percentToNumber,
  percentToPx,
  pxToPercent,
  normalizeDim,
  numberToPx,
  numberToPercent,
} from './utils/dimensions';

export {
  createElement,
  setStyles,
  getStyles,
  addClass,
  removeClass,
  hasClass,
  setAttrs,
  getBounds,
  getViewportBounds,
  removeElement,
  clearChildren,
  setText,
  setHtml,
} from './utils/dom';

// Version
export const VERSION = '4.0.0-dev.0';

/**
 * Initialize the layout manager
 * 
 * @returns Version information
 * 
 * @example
 * ```typescript
 * import { init } from '@liefs/layout-manager';
 * const version = init();
 * console.log(version); // "4.0.0-dev.0"
 * ```
 */
export function init(): string {
  console.log(`Liefs Layout Manager v${VERSION} initialized`);
  return VERSION;
}

// Default export
const defaultExport = {
  init,
  VERSION,
  Component: Component,
  EventEmitter: EventEmitter,
};

export default defaultExport;
