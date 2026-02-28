/**
 * Divider Component - Resizable divider between panels
 * 
 * Replaces DragBar from v3 with modern pointer event handling
 * 
 * Test coverage: tests/unit/components/Divider.test.ts
 */

import { Component } from '../core/Component';
import type { DividerOptions } from '../core/types';
import { createElement, setStyles } from '../utils/dom';

/**
 * Divider component for resizable panel separation
 * 
 * @example
 * ```typescript
 * const divider = new Divider({
 *   id: 'resizer',
 *   size: 5,
 *   minSize: 100,
 *   maxSize: 500,
 *   onResize: (size) => console.log('New size:', size)
 * });
 * ```
 */
export class Divider extends Component {
  /** Size of the divider in pixels */
  public size: number;
  
  /** Minimum size of adjacent panels */
  public minSize?: number;
  
  /** Maximum size of adjacent panels */
  public maxSize?: number;
  
  /** Callback when resize starts */
  public onResizeStart?: () => void;
  
  /** Callback during resize with new size */
  public onResize?: (size: number) => void;
  
  /** Callback when resize ends */
  public onResizeEnd?: () => void;

  /** Internal state: is dragging */
  private isDragging: boolean = false;
  
  /** Internal state: start position */
  private startPos: number = 0;
  
  /** Internal state: start size */
  private startSize: number = 0;

  /**
   * Create a new Divider component
   * 
   * @param options - Divider options
   */
  constructor(options: DividerOptions = {}) {
    super('Divider', options);
    this.size = options.size ?? 5;
    if (options.minSize !== undefined) this.minSize = options.minSize;
    if (options.maxSize !== undefined) this.maxSize = options.maxSize;
    if (options.onResizeStart !== undefined) this.onResizeStart = options.onResizeStart;
    if (options.onResize !== undefined) this.onResize = options.onResize;
    if (options.onResizeEnd !== undefined) this.onResizeEnd = options.onResizeEnd;
  }

  /**
   * Mount the divider to a container
   * 
   * @param container - Parent container
   * @override
   */
  override mount(container: HTMLElement): void {
    // Create divider element
    this.element = createElement('div', {
      id: this.id,
      className: this.className || 'divider',
      styles: {
        width: `${this.size}px`,
        height: '100%',
        backgroundColor: '#e0e0e0',
        cursor: 'ew-resize',
        flex: `0 0 ${this.size}px`,
        zIndex: '10',
      },
    });

    // Add hover effect
    this.element.addEventListener('mouseenter', () => {
      if (this.element) {
        this.element.style.backgroundColor = '#c0c0c0';
      }
    });

    this.element.addEventListener('mouseleave', () => {
      if (this.element) {
        this.element.style.backgroundColor = '#e0e0e0';
      }
    });

    // Add pointer events for dragging
    this.element.addEventListener('pointerdown', this.handlePointerDown.bind(this));

    container.appendChild(this.element);
    this.isMounted = true;

    super.mount(container);
  }

  /**
   * Handle pointer down event
   * 
   * @param event - Pointer event
   * @private
   */
  private handlePointerDown(event: PointerEvent): void {
    event.preventDefault();
    
    this.isDragging = true;
    this.startPos = event.clientX;
    
    // Get current width of adjacent panel
    const parent = this.element?.parentElement;
    if (parent) {
      const prevSibling = parent.previousElementSibling;
      if (prevSibling) {
        this.startSize = prevSibling.getBoundingClientRect().width;
      }
    }

    // Capture pointer (not supported in jsdom, so check first)
    if (typeof this.element?.setPointerCapture === 'function') {
      this.element.setPointerCapture(event.pointerId);
    }

    // Add move and up listeners
    const handlePointerMove = this.handlePointerMove.bind(this);
    const handlePointerUp = this.handlePointerUp.bind(this);

    this.element?.addEventListener('pointermove', handlePointerMove);
    this.element?.addEventListener('pointerup', handlePointerUp);

    // Call resize start callback
    if (this.onResizeStart) {
      this.onResizeStart();
    }

    // Add class for visual feedback
    if (this.element) {
      this.element.classList.add('dragging');
      this.element.style.backgroundColor = '#a0a0a0';
    }
  }

  /**
   * Handle pointer move event
   * 
   * @param event - Pointer event
   * @private
   */
  private handlePointerMove(event: PointerEvent): void {
    if (!this.isDragging || !this.element) return;

    const deltaX = event.clientX - this.startPos;
    const newSize = this.startSize + deltaX;

    // Apply constraints
    const constrainedSize = this.constrainSize(newSize);

    // Update adjacent panel width
    const parent = this.element.parentElement;
    if (parent) {
      const prevSibling = parent.previousElementSibling as HTMLElement;
      if (prevSibling) {
        prevSibling.style.flex = `0 0 ${constrainedSize}px`;
      }
    }

    // Call resize callback
    if (this.onResize) {
      this.onResize(constrainedSize);
    }
  }

  /**
   * Handle pointer up event
   * 
   * @param event - Pointer event
   * @private
   */
  private handlePointerUp(event: PointerEvent): void {
    if (!this.isDragging || !this.element) return;

    this.isDragging = false;
    this.element.releasePointerCapture(event.pointerId);

    // Remove class for visual feedback
    this.element.classList.remove('dragging');
    this.element.style.backgroundColor = '#e0e0e0';

    // Remove listeners
    const handlePointerMove = this.handlePointerMove.bind(this);
    const handlePointerUp = this.handlePointerUp.bind(this);

    this.element.removeEventListener('pointermove', handlePointerMove);
    this.element.removeEventListener('pointerup', handlePointerUp);

    // Call resize end callback
    if (this.onResizeEnd) {
      this.onResizeEnd();
    }
  }

  /**
   * Constrain size to min/max values
   * 
   * @param size - Size to constrain
   * @returns Constrained size
   * @private
   */
  private constrainSize(size: number): number {
    let constrained = size;
    
    if (this.minSize !== undefined) {
      constrained = Math.max(constrained, this.minSize);
    }
    
    if (this.maxSize !== undefined) {
      constrained = Math.min(constrained, this.maxSize);
    }
    
    return constrained;
  }

  /**
   * Update divider properties
   * 
   * @param props - Updated properties
   * @override
   */
  override update(props: Partial<DividerOptions>): void {
    if (!this.element) return;

    // Update size
    if (props.size !== undefined && props.size !== this.size) {
      this.size = props.size;
      this.element.style.width = `${this.size}px`;
      this.element.style.flex = `0 0 ${this.size}px`;
    }

    // Update minSize
    if (props.minSize !== undefined) {
      this.minSize = props.minSize;
    }

    // Update maxSize
    if (props.maxSize !== undefined) {
      this.maxSize = props.maxSize;
    }

    super.update(props);
  }

  /**
   * Set the divider size
   * 
   * @param size - Size in pixels
   */
  setSize(size: number): void {
    this.size = size;
    if (this.element && this.isMounted) {
      this.element.style.width = `${size}px`;
      this.element.style.flex = `0 0 ${size}px`;
    }
  }

  /**
   * Get the current divider size
   * 
   * @returns Size in pixels
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Check if divider is currently being dragged
   * 
   * @returns True if dragging
   */
  isDraggingNow(): boolean {
    return this.isDragging;
  }
}
