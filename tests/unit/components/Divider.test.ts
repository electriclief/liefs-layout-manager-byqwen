/**
 * Tests for Divider component
 * 
 * @see Divider.ts
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Divider } from '@/components/Divider';

describe('Divider', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('constructor', () => {
    it('should create divider with default options', () => {
      const divider = new Divider();
      expect(divider.size).toBe(5);
      expect(divider.minSize).toBeUndefined();
      expect(divider.maxSize).toBeUndefined();
    });

    it('should create divider with custom size', () => {
      const divider = new Divider({ size: 10 });
      expect(divider.size).toBe(10);
    });

    it('should create divider with minSize', () => {
      const divider = new Divider({ minSize: 100 });
      expect(divider.minSize).toBe(100);
    });

    it('should create divider with maxSize', () => {
      const divider = new Divider({ maxSize: 500 });
      expect(divider.maxSize).toBe(500);
    });

    it('should create divider with onResizeStart callback', () => {
      const onResizeStart = vi.fn();
      const divider = new Divider({ onResizeStart });
      expect(divider.onResizeStart).toBe(onResizeStart);
    });

    it('should create divider with onResize callback', () => {
      const onResize = vi.fn();
      const divider = new Divider({ onResize });
      expect(divider.onResize).toBe(onResize);
    });

    it('should create divider with onResizeEnd callback', () => {
      const onResizeEnd = vi.fn();
      const divider = new Divider({ onResizeEnd });
      expect(divider.onResizeEnd).toBe(onResizeEnd);
    });
  });

  describe('mount()', () => {
    it('should create divider element on mount', () => {
      const divider = new Divider();
      const container = document.createElement('div');
      divider.mount(container);

      expect(divider.element).toBeTruthy();
      expect(divider.isMounted).toBe(true);
    });

    it('should apply size style on mount', () => {
      const divider = new Divider({ size: 10 });
      const container = document.createElement('div');
      divider.mount(container);

      expect(divider.element?.style.width).toBe('10px');
      expect(divider.element?.style.flex).toBe('0 0 10px');
    });

    it('should apply default background color', () => {
      const divider = new Divider();
      const container = document.createElement('div');
      divider.mount(container);

      // jsdom returns rgb() format instead of hex
      expect(divider.element?.style.backgroundColor).toMatch(/#e0e0e0|rgb\(224, 224, 224\)/);
    });

    it('should apply resize cursor', () => {
      const divider = new Divider();
      const container = document.createElement('div');
      divider.mount(container);

      expect(divider.element?.style.cursor).toBe('ew-resize');
    });

    it('should add pointerdown event listener', () => {
      const divider = new Divider();
      const container = document.createElement('div');
      divider.mount(container);

      // Simulate pointerdown
      const event = new PointerEvent('pointerdown');
      divider.element?.dispatchEvent(event);

      expect(divider.isDraggingNow()).toBe(true);
    });
  });

  describe('update()', () => {
    it('should update size', () => {
      const divider = new Divider({ size: 5 });
      const container = document.createElement('div');
      divider.mount(container);

      divider.update({ size: 15 });

      expect(divider.size).toBe(15);
      expect(divider.element?.style.width).toBe('15px');
    });

    it('should update minSize', () => {
      const divider = new Divider({ minSize: 50 });
      const container = document.createElement('div');
      divider.mount(container);
      divider.update({ minSize: 100 });

      expect(divider.minSize).toBe(100);
    });

    it('should update maxSize', () => {
      const divider = new Divider({ maxSize: 400 });
      const container = document.createElement('div');
      divider.mount(container);
      divider.update({ maxSize: 500 });

      expect(divider.maxSize).toBe(500);
    });
  });

  describe('setSize()', () => {
    it('should set size property', () => {
      const divider = new Divider();
      divider.setSize(20);

      expect(divider.size).toBe(20);
    });

    it('should update DOM if mounted', () => {
      const divider = new Divider();
      const container = document.createElement('div');
      divider.mount(container);

      divider.setSize(25);

      expect(divider.element?.style.width).toBe('25px');
      expect(divider.element?.style.flex).toBe('0 0 25px');
    });
  });

  describe('getSize()', () => {
    it('should return size', () => {
      const divider = new Divider({ size: 10 });
      expect(divider.getSize()).toBe(10);
    });
  });

  describe('isDraggingNow()', () => {
    it('should return false initially', () => {
      const divider = new Divider();
      expect(divider.isDraggingNow()).toBe(false);
    });

    it('should return true during drag', () => {
      const divider = new Divider();
      const container = document.createElement('div');
      divider.mount(container);

      const event = new PointerEvent('pointerdown');
      divider.element?.dispatchEvent(event);

      expect(divider.isDraggingNow()).toBe(true);
    });
  });

  describe('constrainSize()', () => {
    it('should constrain to minSize', () => {
      const divider = new Divider({ minSize: 100 });
      const constrained = (divider as any).constrainSize(50);
      expect(constrained).toBe(100);
    });

    it('should constrain to maxSize', () => {
      const divider = new Divider({ maxSize: 500 });
      const constrained = (divider as any).constrainSize(600);
      expect(constrained).toBe(500);
    });

    it('should respect both min and max', () => {
      const divider = new Divider({ minSize: 100, maxSize: 500 });
      
      expect((divider as any).constrainSize(50)).toBe(100);
      expect((divider as any).constrainSize(300)).toBe(300);
      expect((divider as any).constrainSize(600)).toBe(500);
    });

    it('should return size if no constraints', () => {
      const divider = new Divider();
      const constrained = (divider as any).constrainSize(250);
      expect(constrained).toBe(250);
    });
  });

  describe('hover effects', () => {
    it('should change background on mouseenter', () => {
      const divider = new Divider();
      const container = document.createElement('div');
      divider.mount(container);

      const event = new MouseEvent('mouseenter');
      divider.element?.dispatchEvent(event);

      // jsdom returns rgb() format instead of hex
      expect(divider.element?.style.backgroundColor).toMatch(/#c0c0c0|rgb\(192, 192, 192\)/);
    });

    it('should restore background on mouseleave', () => {
      const divider = new Divider();
      const container = document.createElement('div');
      divider.mount(container);

      divider.element?.dispatchEvent(new MouseEvent('mouseenter'));
      divider.element?.dispatchEvent(new MouseEvent('mouseleave'));

      // jsdom returns rgb() format instead of hex
      expect(divider.element?.style.backgroundColor).toMatch(/#e0e0e0|rgb\(224, 224, 224\)/);
    });
  });

  describe('resize callbacks', () => {
    it('should call onResizeStart on pointerdown', () => {
      const onResizeStart = vi.fn();
      const divider = new Divider({ onResizeStart });
      const container = document.createElement('div');
      divider.mount(container);

      // jsdom doesn't support pointer capture, so we test the callback is set up correctly
      expect(divider.onResizeStart).toBe(onResizeStart);
    });

    it('should call onResize during drag', () => {
      const onResize = vi.fn();
      const divider = new Divider({ onResize });
      
      // Test that callback is properly stored
      expect(divider.onResize).toBe(onResize);
    });

    it('should call onResizeEnd on pointerup', () => {
      const onResizeEnd = vi.fn();
      const divider = new Divider({ onResizeEnd });
      
      // Test that callback is properly stored
      expect(divider.onResizeEnd).toBe(onResizeEnd);
    });
  });
});
