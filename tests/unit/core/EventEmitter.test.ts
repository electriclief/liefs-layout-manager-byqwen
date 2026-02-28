/**
 * Tests for EventEmitter
 * 
 * @see EventEmitter.ts
 */

import { describe, it, expect, vi } from 'vitest';
import { EventEmitter } from '@/core/EventEmitter';
import type { LayoutEvents } from '@/core/types';

describe('EventEmitter', () => {
  describe('on()', () => {
    it('should subscribe to an event', () => {
      const emitter = new EventEmitter();
      const callback = vi.fn();
      
      emitter.on('resize', callback);
      emitter.emit('resize', { componentId: 'test', newSize: 100 });
      
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith({ componentId: 'test', newSize: 100 });
    });

    it('should return an unsubscribe function', () => {
      const emitter = new EventEmitter();
      const callback = vi.fn();
      
      const unsubscribe = emitter.on('resize', callback);
      emitter.emit('resize', { componentId: 'test', newSize: 100 });
      expect(callback).toHaveBeenCalledTimes(1);
      
      unsubscribe();
      emitter.emit('resize', { componentId: 'test', newSize: 200 });
      expect(callback).toHaveBeenCalledTimes(1); // Still 1, not 2
    });

    it('should allow multiple subscribers to the same event', () => {
      const emitter = new EventEmitter();
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      
      emitter.on('resize', callback1);
      emitter.on('resize', callback2);
      emitter.emit('resize', { componentId: 'test', newSize: 100 });
      
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });
  });

  describe('once()', () => {
    it('should call callback only once', () => {
      const emitter = new EventEmitter();
      const callback = vi.fn();
      
      emitter.once('resize', callback);
      emitter.emit('resize', { componentId: 'test', newSize: 100 });
      emitter.emit('resize', { componentId: 'test', newSize: 200 });
      
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith({ componentId: 'test', newSize: 100 });
    });
  });

  describe('emit()', () => {
    it('should emit an event to all subscribers', () => {
      const emitter = new EventEmitter();
      const callback = vi.fn();
      
      emitter.on('resize', callback);
      emitter.emit('resize', { componentId: 'test', newSize: 100 });
      
      expect(callback).toHaveBeenCalledWith({ componentId: 'test', newSize: 100 });
    });

    it('should handle errors in callbacks gracefully', () => {
      const emitter = new EventEmitter();
      const errorCallback = vi.fn(() => {
        throw new Error('Test error');
      });
      const successCallback = vi.fn();
      
      emitter.on('resize', errorCallback);
      emitter.on('resize', successCallback);
      
      // Should not throw
      expect(() => {
        emitter.emit('resize', { componentId: 'test', newSize: 100 });
      }).not.toThrow();
      
      // Second callback should still be called
      expect(successCallback).toHaveBeenCalledTimes(1);
    });

    it('should not throw when emitting to non-existent event', () => {
      const emitter = new EventEmitter();
      
      expect(() => {
        emitter.emit('resize', { componentId: 'test', newSize: 100 });
      }).not.toThrow();
    });
  });

  describe('off()', () => {
    it('should unsubscribe a specific callback', () => {
      const emitter = new EventEmitter();
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      
      emitter.on('resize', callback1);
      emitter.on('resize', callback2);
      
      emitter.off('resize', callback1);
      emitter.emit('resize', { componentId: 'test', newSize: 100 });
      
      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalledTimes(1);
    });
  });

  describe('clear()', () => {
    it('should clear all listeners for a specific event', () => {
      const emitter = new EventEmitter();
      const callback = vi.fn();
      
      emitter.on('resize', callback);
      emitter.clear('resize');
      emitter.emit('resize', { componentId: 'test', newSize: 100 });
      
      expect(callback).not.toHaveBeenCalled();
    });

    it('should clear all listeners when no event specified', () => {
      const emitter = new EventEmitter();
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      
      emitter.on('resize', callback1);
      emitter.on('mount', callback2);
      emitter.clear();
      
      emitter.emit('resize', { componentId: 'test', newSize: 100 });
      emitter.emit('mount', { componentId: 'test' });
      
      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).not.toHaveBeenCalled();
    });
  });

  describe('listenerCount()', () => {
    it('should return the number of listeners for an event', () => {
      const emitter = new EventEmitter();
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      
      expect(emitter.listenerCount('resize')).toBe(0);
      
      emitter.on('resize', callback1);
      expect(emitter.listenerCount('resize')).toBe(1);
      
      emitter.on('resize', callback2);
      expect(emitter.listenerCount('resize')).toBe(2);
    });

    it('should return 0 for non-existent event', () => {
      const emitter = new EventEmitter();
      expect(emitter.listenerCount('resize' as keyof LayoutEvents)).toBe(0);
    });
  });
});
