/**
 * Tests for Resize Observer utilities
 * 
 * @see resize-observer.ts
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  observeElement,
  observeElements,
  isResizeObserverSupported,
} from '@/utils/resize-observer';

describe('resize-observer', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('isResizeObserverSupported()', () => {
    it('should return true with mock', () => {
      // With our mock in setup.ts, this should return true
      expect(isResizeObserverSupported()).toBe(true);
    });
  });

  describe('observeElement()', () => {
    it('should return unsubscribe function', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      const callback = vi.fn();
      const unobserve = observeElement(element, callback);

      expect(typeof unobserve).toBe('function');
      unobserve();
    });

    it('should not throw when unsubscribing', () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      const callback = vi.fn();
      const unobserve = observeElement(element, callback);

      // Should not throw
      expect(() => {
        unobserve();
        unobserve(); // Double unsubscribe should be safe
      }).not.toThrow();
    });
  });

  describe('observeElements()', () => {
    it('should observe multiple elements', () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');
      document.body.appendChild(element1);
      document.body.appendChild(element2);

      const callback = vi.fn();
      const unobserve = observeElements([element1, element2], callback);

      expect(typeof unobserve).toBe('function');
      unobserve();
    });

    it('should return combined unsubscribe function', () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');
      document.body.appendChild(element1);
      document.body.appendChild(element2);

      const callback = vi.fn();
      const unobserve = observeElements([element1, element2], callback);

      // Unsubscribe should not throw
      expect(() => unobserve()).not.toThrow();
    });

    it('should handle empty array', () => {
      const callback = vi.fn();
      const unobserve = observeElements([], callback);

      expect(typeof unobserve).toBe('function');
      expect(() => unobserve()).not.toThrow();
    });
  });
});
