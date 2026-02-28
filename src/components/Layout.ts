/**
 * Layout Component - Flexbox container for horizontal or vertical layouts
 * 
 * Replaces DisplayGroup from v3 with modern Flexbox-based approach
 * 
 * Test coverage: tests/unit/components/Layout.test.ts
 */

import { Component } from '../core/Component';
import type { LayoutOptions, Orientation } from '../core/types';
import { createElement, setStyles, clearChildren } from '../utils/dom';

/**
 * Layout component for arranging child components in rows or columns
 * 
 * @example
 * ```typescript
 * // Horizontal layout with 10px gap
 * const layout = new Layout({
 *   id: 'mainLayout',
 *   orientation: 'horizontal',
 *   gap: 10
 * });
 * 
 * // Add panels
 * layout.addChild(new Panel({ dim: '200px', content: 'Left' }));
 * layout.addChild(new Panel({ fill: true, content: 'Right' }));
 * ```
 */
export class Layout extends Component {
  /** Layout orientation (horizontal or vertical) */
  public orientation: Orientation;
  
  /** Gap between children in pixels */
  public gap: number;
  
  /** Padding in pixels */
  public padding: number;

  /**
   * Create a new Layout component
   * 
   * @param options - Layout options
   */
  constructor(options: LayoutOptions) {
    super('Layout', options);
    this.orientation = options.orientation || 'horizontal';
    this.gap = options.gap || 0;
    this.padding = options.padding || 0;
  }

  /**
   * Mount the layout to a container
   * 
   * @param container - Parent container
   * @override
   */
  override mount(container: HTMLElement): void {
    // Create root element with flexbox styles
    this.element = createElement('div', {
      id: this.id,
      className: this.className,
      styles: {
        display: 'flex',
        flexDirection: this.orientation === 'horizontal' ? 'row' : 'column',
        gap: `${this.gap}px`,
        padding: `${this.padding}px`,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
      },
    });

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
   * Update layout properties
   * 
   * @param props - Updated properties
   * @override
   */
  override update(props: Partial<LayoutOptions>): void {
    if (!this.element) return;

    // Update orientation
    if (props.orientation && props.orientation !== this.orientation) {
      this.orientation = props.orientation;
      this.element.style.flexDirection = this.orientation === 'horizontal' ? 'row' : 'column';
    }

    // Update gap
    if (props.gap !== undefined && props.gap !== this.gap) {
      this.gap = props.gap;
      this.element.style.gap = `${this.gap}px`;
    }

    // Update padding
    if (props.padding !== undefined && props.padding !== this.padding) {
      this.padding = props.padding;
      this.element.style.padding = `${this.padding}px`;
    }

    super.update(props);
  }

  /**
   * Add a child component with optional index
   * 
   * @param child - Child component to add
   * @param index - Optional index to insert at
   * @override
   */
  override addChild(child: Component, index?: number): void {
    super.addChild(child, index);

    // If already mounted, mount the child immediately
    if (this.isMounted && this.element) {
      const childElement = createElement('div');
      
      // Apply flex styles based on child type
      if ('fill' in child && (child as any).fill) {
        childElement.style.flex = '1 1 auto';
      } else if ('dim' in child && (child as any).dim) {
        const dim = (child as any).dim as string;
        if (dim.endsWith('px')) {
          if (this.orientation === 'horizontal') {
            childElement.style.flex = `0 0 ${dim}`;
          } else {
            childElement.style.height = dim;
          }
        } else if (dim.endsWith('%')) {
          childElement.style.flex = `0 0 ${dim}`;
        }
      }

      if (index !== undefined && index < this.element.children.length) {
        this.element.insertBefore(childElement, this.element.children[index]);
      } else {
        this.element.appendChild(childElement);
      }

      child.mount(childElement);
    }
  }

  /**
   * Remove a child component
   * 
   * @param child - Child component to remove
   * @override
   */
  override removeChild(child: Component): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      super.removeChild(child);
      
      // Remove from DOM if mounted
      if (this.isMounted && this.element && child.element) {
        child.unmount();
      }
    }
  }

  /**
   * Get the current flex direction
   * 
   * @returns 'row' or 'column'
   */
  get flexDirection(): string {
    return this.orientation === 'horizontal' ? 'row' : 'column';
  }

  /**
   * Get all child elements
   * 
   * @returns Array of child HTMLElements
   */
  getChildElements(): HTMLElement[] {
    if (!this.element) return [];
    return Array.from(this.element.children) as HTMLElement[];
  }

  /**
   * Clear all children from the layout
   */
  clearChildren(): void {
    for (const child of [...this.children]) {
      this.removeChild(child);
    }
    
    if (this.element) {
      clearChildren(this.element);
    }
  }
}
