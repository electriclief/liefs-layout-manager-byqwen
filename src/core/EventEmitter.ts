/**
 * EventEmitter - Type-safe event handling
 * 
 * Test coverage: tests/unit/core/EventEmitter.test.ts
 */

import type { EventCallback, LayoutEvents } from './types';

/**
 * EventEmitter class for managing component events
 * 
 * @example
 * ```typescript
 * const emitter = new EventEmitter();
 * emitter.on('resize', (data) => console.log(data.newSize));
 * emitter.emit('resize', { componentId: 'panel1', newSize: 300 });
 * ```
 */
export class EventEmitter {
  /** Internal event storage */
  private events: Map<keyof LayoutEvents, Set<EventCallback<any>>> = new Map();

  /**
   * Subscribe to an event
   * 
   * @param event - Event name to listen for
   * @param callback - Function to call when event fires
   * @returns Unsubscribe function
   * 
   * @example
   * ```typescript
   * const unsubscribe = emitter.on('resize', handleResize);
   * // Later: unsubscribe();
   * ```
   */
  on<T extends keyof LayoutEvents>(
    event: T,
    callback: EventCallback<T>
  ): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    const callbacks = this.events.get(event)!;
    callbacks.add(callback);

    // Return unsubscribe function
    return () => {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        this.events.delete(event);
      }
    };
  }

  /**
   * Subscribe to an event once (auto-unsubscribes after first call)
   * 
   * @param event - Event name to listen for
   * @param callback - Function to call when event fires
   * 
   * @example
   * ```typescript
   * emitter.once('mount', (data) => console.log('Mounted:', data.componentId));
   * ```
   */
  once<T extends keyof LayoutEvents>(
    event: T,
    callback: EventCallback<T>
  ): void {
    const unsubscribe = this.on(event, (data) => {
      unsubscribe();
      callback(data);
    });
  }

  /**
   * Emit an event to all subscribers
   * 
   * @param event - Event name to emit
   * @param data - Event data
   * 
   * @example
   * ```typescript
   * emitter.emit('resize', { componentId: 'panel1', newSize: 300 });
   * ```
   */
  emit<T extends keyof LayoutEvents>(
    event: T,
    data: LayoutEvents[T]
  ): void {
    const callbacks = this.events.get(event);
    if (!callbacks) return;

    // Copy to array to prevent issues if callbacks modify the set during iteration
    const callbacksArray = Array.from(callbacks);
    for (const callback of callbacksArray) {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event callback for "${event}":`, error);
      }
    }
  }

  /**
   * Unsubscribe from an event
   * 
   * @param event - Event name to unsubscribe from
   * @param callback - The callback to remove
   * 
   * @example
   * ```typescript
   * emitter.off('resize', handleResize);
   * ```
   */
  off<T extends keyof LayoutEvents>(
    event: T,
    callback: EventCallback<T>
  ): void {
    const callbacks = this.events.get(event);
    if (!callbacks) return;
    callbacks.delete(callback);
    if (callbacks.size === 0) {
      this.events.delete(event);
    }
  }

  /**
   * Remove all listeners for an event (or all events if no event specified)
   * 
   * @param event - Optional event name to clear
   * 
   * @example
   * ```typescript
   * emitter.clear(); // Clear all events
   * emitter.clear('resize'); // Clear only resize events
   * ```
   */
  clear(event?: keyof LayoutEvents): void {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }

  /**
   * Get the number of listeners for an event
   * 
   * @param event - Event name to check
   * @returns Number of listeners
   */
  listenerCount(event: keyof LayoutEvents): number {
    const callbacks = this.events.get(event);
    return callbacks ? callbacks.size : 0;
  }
}
