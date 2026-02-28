/**
 * Base Component class with lifecycle hooks
 * 
 * Test coverage: tests/unit/core/Component.test.ts
 */

import { EventEmitter } from './EventEmitter';
import type { ComponentOptions } from './types';

/**
 * Abstract base class for all layout components
 * 
 * Provides lifecycle hooks (mount, update, unmount) and event handling.
 * All components should extend this class.
 * 
 * @example
 * ```typescript
 * class MyComponent extends Component {
 *   constructor(options: ComponentOptions) {
 *     super('MyComponent', options);
 *   }
 *   
 *   mount() {
 *     console.log('Component mounted');
 *   }
 * }
 * ```
 */
export abstract class Component extends EventEmitter {
  /** Unique component identifier */
  public readonly id: string;
  
  /** Component type name */
  public readonly type: string;
  
  /** CSS class name(s) */
  public className: string;
  
  /** Whether component is mounted to DOM */
  public isMounted: boolean = false;
  
  /** Root DOM element (if any) */
  public element: HTMLElement | null = null;
  
  /** Parent component */
  public parent: Component | null = null;
  
  /** Child components */
  public children: Component[] = [];

  /**
   * Create a new component
   * 
   * @param type - Component type name
   * @param options - Component options
   */
  constructor(type: string, options: ComponentOptions = {}) {
    super();
    this.type = type;
    this.id = options.id || `${type}_${Component.generateId()}`;
    this.className = options.className || '';
    
    if (options.style) {
      // Styles will be applied during mount
    }
  }

  /**
   * Generate unique ID for component
   * @internal
   */
  private static idCounter = 0;
  private static generateId(): number {
    return ++Component.idCounter;
  }

  /**
   * Mount the component to the DOM
   * 
   * Called when component is first added to the document.
   * Override this method to set up DOM elements.
   * 
   * @param _container - Container element to mount into
   * 
   * @example
   * ```typescript
   * mount(container: HTMLElement) {
   *   this.element = document.createElement('div');
   *   this.element.className = this.className;
   *   container.appendChild(this.element);
   *   this.isMounted = true;
   * }
   * ```
   */
  mount(_container: HTMLElement): void {
    this.isMounted = true;
    this.emit('mount', { componentId: this.id });
  }

  /**
   * Update the component
   * 
   * Called when component needs to re-render.
   * Override this method to handle updates.
   * 
   * @param _props - Updated properties
   * 
   * @example
   * ```typescript
   * update(props: { content: string }) {
   *   if (this.element && props.content) {
   *     this.element.textContent = props.content;
   *   }
   *   this.emit('update', { componentId: this.id });
   * }
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_props: Record<string, unknown>): void {
    this.emit('expand', { componentId: this.id }); // Using expand as a placeholder
  }

  /**
   * Unmount the component from the DOM
   * 
   * Called when component is being removed.
   * Override this method to clean up resources.
   * 
   * @example
   * ```typescript
   * unmount() {
   *   if (this.element && this.element.parentNode) {
   *     this.element.parentNode.removeChild(this.element);
   *   }
   *   this.isMounted = false;
   *   this.emit('unmount', { componentId: this.id });
   * }
   * ```
   */
  unmount(): void {
    // Remove all children first
    for (const child of [...this.children]) {
      child.unmount();
    }
    this.children = [];
    
    // Remove own element
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    
    this.isMounted = false;
    this.emit('unmount', { componentId: this.id });
    this.clear(); // Clear all event listeners
  }

  /**
   * Add a child component
   * 
   * @param child - Child component to add
   * @param index - Optional index to insert at (default: end)
   * 
   * @example
   * ```typescript
   * const child = new Panel({ id: 'child1' });
   * this.addChild(child);
   * ```
   */
  addChild(child: Component, index?: number): void {
    child.parent = this;
    
    if (index !== undefined) {
      this.children.splice(index, 0, child);
    } else {
      this.children.push(child);
    }
  }

  /**
   * Remove a child component
   * 
   * @param child - Child component to remove
   * 
   * @example
   * ```typescript
   * this.removeChild(child);
   * ```
   */
  removeChild(child: Component): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      child.parent = null;
    }
  }

  /**
   * Get a child component by ID
   * 
   * @param id - Child component ID
   * @returns Child component or undefined
   * 
   * @example
   * ```typescript
   * const child = this.getChild('child1');
   * ```
   */
  getChild(id: string): Component | undefined {
    return this.children.find((child) => child.id === id);
  }

  /**
   * Apply CSS styles to the component's element
   * 
   * @param styles - Styles to apply
   * 
   * @example
   * ```typescript
   * this.applyStyles({ display: 'flex', width: '100px' });
   * ```
   */
  protected applyStyles(styles: Partial<CSSStyleDeclaration>): void {
    if (this.element) {
      Object.assign(this.element.style, styles);
    }
  }

  /**
   * Add a CSS class to the component's element
   * 
   * @param className - Class name to add
   * 
   * @example
   * ```typescript
   * this.addClass('active');
   * ```
   */
  protected addClass(className: string): void {
    if (this.element) {
      this.element.classList.add(className);
    }
  }

  /**
   * Remove a CSS class from the component's element
   * 
   * @param className - Class name to remove
   * 
   * @example
   * ```typescript
   * this.removeClass('active');
   * ```
   */
  protected removeClass(className: string): void {
    if (this.element) {
      this.element.classList.remove(className);
    }
  }
}
