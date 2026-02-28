/**
 * Core type definitions for Liefs Layout Manager
 */

/** Dimension string format: "100px" or "50%" */
export type Dim = `${number}px` | `${number}%`;

/** Orientation for layouts */
export type Orientation = 'horizontal' | 'vertical';

/** Size interface for dimensions */
export interface Size {
  width: number;
  height: number;
}

/** Position interface for coordinates */
export interface Position {
  x: number;
  y: number;
}

/** Combined bounds (position + size) */
export interface Bounds extends Position, Size {}

/** Base options for all components */
export interface ComponentOptions {
  /** Unique identifier for the component */
  id?: string;
  /** CSS class name(s) */
  className?: string;
  /** Inline styles */
  style?: Partial<CSSStyleDeclaration>;
}

/** Layout-specific options */
export interface LayoutOptions extends ComponentOptions {
  /** Layout orientation */
  orientation: Orientation;
  /** Gap between children in pixels */
  gap?: number;
  /** Padding in pixels */
  padding?: number;
}

/** Panel-specific options */
export interface PanelOptions extends ComponentOptions {
  /** Initial dimension (px or %) */
  dim?: Dim;
  /** Minimum size in pixels */
  minSize?: number;
  /** Maximum size in pixels */
  maxSize?: number;
  /** Fill remaining space */
  fill?: boolean;
  /** Content as string (innerHTML) */
  content?: string;
}

/** Divider-specific options */
export interface DividerOptions extends ComponentOptions {
  /** Size of the divider in pixels */
  size?: number;
  /** Minimum size of adjacent panels */
  minSize?: number;
  /** Maximum size of adjacent panels */
  maxSize?: number;
  /** Callback when resize starts */
  onResizeStart?: () => void;
  /** Callback during resize */
  onResize?: (size: number) => void;
  /** Callback when resize ends */
  onResizeEnd?: () => void;
}

/** Event map for type-safe event handling */
export interface LayoutEvents {
  resize: { componentId: string; newSize: number };
  collapse: { componentId: string };
  expand: { componentId: string };
  mount: { componentId: string };
  unmount: { componentId: string };
}

/** Type-safe event callback */
export type EventCallback<T extends keyof LayoutEvents> = (
  data: LayoutEvents[T]
) => void;

/** Result of dimension parsing */
export interface ParsedDim {
  /** Type of dimension */
  type: 'px' | 'percent';
  /** Numeric value */
  value: number;
  /** Original string */
  original: string;
}
