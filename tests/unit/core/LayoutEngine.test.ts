/**
 * Tests for Layout Engine utilities
 * 
 * @see LayoutEngine.ts
 */

import { describe, it, expect } from 'vitest';
import {
  calculateFlexValues,
  applyConstraints,
  resolveDimension,
  calculateRemainingSpace,
  distributeRemainingSpace,
  isFlexible,
  countFlexibleItems,
} from '@/core/LayoutEngine';

describe('LayoutEngine', () => {
  describe('calculateFlexValues()', () => {
    it('should return flex values for px dimensions', () => {
      const result = calculateFlexValues(['200px', '100px'], 1000);
      expect(result).toEqual(['0 0 200px', '0 0 100px']);
    });

    it('should return flex values for percentage dimensions', () => {
      const result = calculateFlexValues(['50%', '25%'], 1000);
      expect(result).toEqual(['0 0 50%', '0 0 25%']);
    });

    it('should return auto for undefined dimensions', () => {
      const result = calculateFlexValues([undefined, '200px'], 1000);
      expect(result).toEqual(['1 1 auto', '0 0 200px']);
    });

    it('should handle mixed dimensions', () => {
      const result = calculateFlexValues(['200px', undefined, '50%'], 1000);
      expect(result).toEqual(['0 0 200px', '1 1 auto', '0 0 50%']);
    });
  });

  describe('applyConstraints()', () => {
    it('should return size if within constraints', () => {
      expect(applyConstraints(150, 100, 200)).toBe(150);
    });

    it('should apply minSize constraint', () => {
      expect(applyConstraints(50, 100, 200)).toBe(100);
    });

    it('should apply maxSize constraint', () => {
      expect(applyConstraints(250, 100, 200)).toBe(200);
    });

    it('should handle only minSize', () => {
      expect(applyConstraints(50, 100)).toBe(100);
      expect(applyConstraints(150, 100)).toBe(150);
    });

    it('should handle only maxSize', () => {
      expect(applyConstraints(250, undefined, 200)).toBe(200);
      expect(applyConstraints(150, undefined, 200)).toBe(150);
    });

    it('should handle no constraints', () => {
      expect(applyConstraints(150)).toBe(150);
    });
  });

  describe('resolveDimension()', () => {
    it('should resolve px dimension to number', () => {
      expect(resolveDimension('200px', 1000)).toBe(200);
    });

    it('should resolve percentage dimension to pixels', () => {
      expect(resolveDimension('50%', 1000)).toBe(500);
      expect(resolveDimension('25%', 800)).toBe(200);
    });

    it('should handle decimal percentages', () => {
      expect(resolveDimension('33.5%', 1000)).toBeCloseTo(335, 0);
    });
  });

  describe('calculateRemainingSpace()', () => {
    it('should calculate remaining space after px dimensions', () => {
      const remaining = calculateRemainingSpace(['200px', '100px'], 1000);
      expect(remaining).toBe(700);
    });

    it('should subtract gaps from remaining space', () => {
      const remaining = calculateRemainingSpace(['200px', '100px'], 1000, 10);
      expect(remaining).toBe(690); // 1000 - 200 - 100 - 10 (one gap)
    });

    it('should handle percentage dimensions (ignore for calculation)', () => {
      const remaining = calculateRemainingSpace(['50%', '200px'], 1000);
      expect(remaining).toBe(800); // Only px is subtracted
    });

    it('should handle undefined dimensions (ignore)', () => {
      const remaining = calculateRemainingSpace([undefined, '200px'], 1000);
      expect(remaining).toBe(800);
    });

    it('should return 0 if used exceeds available', () => {
      const remaining = calculateRemainingSpace(['500px', '600px'], 1000);
      expect(remaining).toBe(0);
    });

    it('should handle empty array', () => {
      const remaining = calculateRemainingSpace([], 1000);
      expect(remaining).toBe(1000);
    });
  });

  describe('distributeRemainingSpace()', () => {
    it('should distribute space equally', () => {
      expect(distributeRemainingSpace(500, 2)).toBe(250);
      expect(distributeRemainingSpace(600, 3)).toBe(200);
    });

    it('should return 0 if no flexible items', () => {
      expect(distributeRemainingSpace(500, 0)).toBe(0);
    });

    it('should handle decimal results', () => {
      expect(distributeRemainingSpace(100, 3)).toBeCloseTo(33.33, 2);
    });
  });

  describe('isFlexible()', () => {
    it('should return true for undefined', () => {
      expect(isFlexible(undefined)).toBe(true);
    });

    it('should return false for px dimension', () => {
      expect(isFlexible('200px')).toBe(false);
    });

    it('should return false for percentage dimension', () => {
      expect(isFlexible('50%')).toBe(false);
    });
  });

  describe('countFlexibleItems()', () => {
    it('should count undefined dimensions', () => {
      const count = countFlexibleItems([undefined, '200px', undefined]);
      expect(count).toBe(2);
    });

    it('should return 0 if no flexible items', () => {
      const count = countFlexibleItems(['200px', '100px']);
      expect(count).toBe(0);
    });

    it('should return count for all flexible', () => {
      const count = countFlexibleItems([undefined, undefined, undefined]);
      expect(count).toBe(3);
    });
  });
});
