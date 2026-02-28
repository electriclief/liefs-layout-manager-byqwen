/**
 * Panel Component - Content panel with dimension support
 * 
 * Replaces DisplayCell from v3 with modern Flexbox-based approach
 * 
 * Test coverage: tests/unit/components/Panel.test.ts
 */

import { Component } from '../core/Component';
import type { PanelOptions, Dim } from '../core/types';
import { createElement, setStyles, setText } from '../utils/dom';

/**
 * Panel component for content areas with flexible sizing
 * 
 * @example
 * ```typescript
 * // Fixed width panel
 * const panel = new Panel({
 *   id: 'sidebar',
 *   dim: '200px',
 *   content: 'Sidebar content'
 * });
 * 
 * // Fill remaining space
 * const mainPanel = new Panel({
 *   id: 'main',
 *   fill: true,
 *   content: 'Main content'
 * });
 * ```
 */
export class Panel extends Component {
  /** Dimension string (px or %) */
  public dim?: Dim;
  
  /** Minimum size in pixels */
  public minSize?: number;
  
  /** Maximum size in pixels */
  public maxSize?: number;
  
  /** Fill remaining space */
  public fill: boolean;
  
  /** Content as HTML string */
  public content?: string;

  /**
   * Create a new Panel component
   * 
   * @param options - Panel options
   */
  constructor(options: PanelOptions = {}) {
    super('Panel', options);
    this.dim = options.dim;
    this.minSize = options.minSize;
    this.maxSize = options.maxSize;
    this.fill = options.fill || false;
    this.content = options.content;
  }

  /**
   * Mount the panel to a container
   * 
   * @param container - Parent container
   * @override
   */
  override mount(container: HTMLElement): void {
    // Create root element
    this.element = createElement('div', {
      id: this.id,
      className: this.className,
      styles: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        boxSizing: 'border-box',
      },
    });

    // Apply dimension styles
    this.applyDimensionStyles();

    // Set content if provided
    if (this.content) {
      const contentEl = createElement('div', {
        className: 'panel-content',
        styles: {
          padding: '8px',
          flex: '1 1 auto',
          overflow: 'auto',
        },
      });
      contentEl.innerHTML = this.content;
      this.element.appendChild(contentEl);
    }

    container.appendChild(this.element);
    this.isMounted = true;

    // Mount all children
    for (const child of this.children) {
      if (child instanceof Component && this.element) {
        child.mount(this.element);
      }
    }

    super.mount(container);
  }

  /**
   * Update panel properties
   * 
   * @param props - Updated properties
   * @override
   */
  override update(props: Partial<PanelOptions>): void {
    if (!this.element) return;

    // Update dimension
    if (props.dim !== undefined && props.dim !== this.dim) {
      this.dim = props.dim;
      this.applyDimensionStyles();
    }

    // Update minSize
    if (props.minSize !== undefined && props.minSize !== this.minSize) {
      this.minSize = props.minSize;
      this.applyDimensionStyles();
    }

    // Update maxSize
    if (props.maxSize !== undefined && props.maxSize !== this.maxSize) {
      this.maxSize = props.maxSize;
      this.applyDimensionStyles();
    }

    // Update fill
    if (props.fill !== undefined && props.fill !== this.fill) {
      this.fill = props.fill;
      this.applyDimensionStyles();
    }

    // Update content
    if (props.content !== undefined && props.content !== this.content) {
      this.content = props.content;
      const contentEl = this.element.querySelector('.panel-content');
      if (contentEl) {
        contentEl.innerHTML = this.content || '';
      }
    }

    super.update(props);
  }

  /**
   * Apply dimension styles to the element
   * 
   * @private
   */
  private applyDimensionStyles(): void {
    if (!this.element) return;

    const style: Partial<CSSStyleDeclaration> = {};

    // Handle fill
    if (this.fill) {
      style.flex = '1 1 auto';
    }
    // Handle dim
    else if (this.dim) {
      if (this.dim.endsWith('px')) {
        style.flex = `0 0 ${this.dim}`;
        if (this.minSize) {
          style.minWidth = `${this.minSize}px`;
        }
        if (this.maxSize) {
          style.maxWidth = `${this.maxSize}px`;
        }
      } else if (this.dim.endsWith('%')) {
        style.flex = `0 0 ${this.dim}`;
      }
    }
    // Handle min/max without dim
    else {
      if (this.minSize) {
        style.minWidth = `${this.minSize}px`;
      }
      if (this.maxSize) {
        style.maxWidth = `${this.maxSize}px`;
      }
    }

    setStyles(this.element, style);
  }

  /**
   * Set the panel content
   * 
   * @param content - HTML content string
   */
  setContent(content: string): void {
    this.content = content;
    if (this.element && this.isMounted) {
      let contentEl = this.element.querySelector('.panel-content');
      if (!contentEl) {
        contentEl = createElement('div', {
          className: 'panel-content',
          styles: {
            padding: '8px',
            flex: '1 1 auto',
            overflow: 'auto',
          },
        });
        this.element.appendChild(contentEl);
      }
      contentEl.innerHTML = content;
    }
  }

  /**
   * Get the panel content
   * 
   * @returns Content HTML string
   */
  getContent(): string {
    return this.content || '';
  }

  /**
   * Set the panel dimension
   * 
   * @param dim - Dimension string (px or %)
   */
  setDimension(dim: Dim): void {
    this.dim = dim;
    if (this.element && this.isMounted) {
      this.applyDimensionStyles();
    }
  }

  /**
   * Get the current dimension
   * 
   * @returns Dimension string or undefined
   */
  getDimension(): Dim | undefined {
    return this.dim;
  }
}
