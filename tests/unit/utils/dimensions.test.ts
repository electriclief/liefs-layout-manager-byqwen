/**
 * Tests for dimension utilities
 * 
 * @see dimensions.ts
 */

import { describe, it, expect } from 'vitest';
import {
  isPx,
  isPercent,
  parseDim,
  pxToNumber,
  percentToNumber,
  percentToPx,
  pxToPercent,
  normalizeDim,
  numberToPx,
  numberToPercent,
} from '@/utils/dimensions';

describe('dimensions', () => {
  describe('isPx()', () => {
    it('should return true for pixel dimensions', () => {
      expect(isPx('100px')).toBe(true);
      expect(isPx('0px')).toBe(true);
      expect(isPx('999px')).toBe(true);
    });

    it('should return false for non-pixel dimensions', () => {
      expect(isPx('50%')).toBe(false);
      expect(isPx('100')).toBe(false);
      expect(isPx('')).toBe(false);
    });
  });

  describe('isPercent()', () => {
    it('should return true for percentage dimensions', () => {
      expect(isPercent('50%')).toBe(true);
      expect(isPercent('0%')).toBe(true);
      expect(isPercent('100%')).toBe(true);
    });

    it('should return false for non-percentage dimensions', () => {
      expect(isPercent('100px')).toBe(false);
      expect(isPercent('50')).toBe(false);
      expect(isPercent('')).toBe(false);
    });
  });

  describe('parseDim()', () => {
    it('should parse pixel dimensions correctly', () => {
      const result = parseDim('100px');
      expect(result).toEqual({
        type: 'px',
        value: 100,
        original: '100px',
      });
    });

    it('should parse percentage dimensions correctly', () => {
      const result = parseDim('50%');
      expect(result).toEqual({
        type: 'percent',
        value: 50,
        original: '50%',
      });
    });

    it('should handle decimal values', () => {
      expect(parseDim('100.5px')).toEqual({
        type: 'px',
        value: 100.5,
        original: '100.5px',
      });
      
      expect(parseDim('50.25%')).toEqual({
        type: 'percent',
        value: 50.25,
        original: '50.25%',
      });
    });

    it('should throw for invalid pixel dimension', () => {
      expect(() => parseDim('-100px')).toThrow('Invalid pixel dimension');
      expect(() => parseDim('NaNpx')).toThrow('Invalid pixel dimension');
    });

    it('should throw for invalid percentage dimension', () => {
      expect(() => parseDim('-10%')).toThrow('Invalid percentage dimension');
      expect(() => parseDim('150%')).toThrow('Invalid percentage dimension');
    });

    it('should throw for invalid format', () => {
      expect(() => parseDim('100')).toThrow('Invalid dimension format');
      expect(() => parseDim('')).toThrow('Invalid dimension format');
      expect(() => parseDim('em')).toThrow('Invalid dimension format');
    });
  });

  describe('pxToNumber()', () => {
    it('should extract number from pixel dimension', () => {
      expect(pxToNumber('100px')).toBe(100);
      expect(pxToNumber('0px')).toBe(0);
      expect(pxToNumber('50.5px')).toBe(50.5);
    });

    it('should throw for non-pixel dimension', () => {
      expect(() => pxToNumber('50%')).toThrow('Expected pixel dimension');
    });
  });

  describe('percentToNumber()', () => {
    it('should extract number from percentage dimension', () => {
      expect(percentToNumber('50%')).toBe(50);
      expect(percentToNumber('0%')).toBe(0);
      expect(percentToNumber('100%')).toBe(100);
      expect(percentToNumber('25.5%')).toBe(25.5);
    });

    it('should throw for non-percentage dimension', () => {
      expect(() => percentToNumber('100px')).toThrow('Expected percentage dimension');
    });
  });

  describe('percentToPx()', () => {
    it('should convert percentage to pixels', () => {
      expect(percentToPx(50, 1000)).toBe(500);
      expect(percentToPx(25, 400)).toBe(100);
      expect(percentToPx(100, 500)).toBe(500);
      expect(percentToPx(0, 1000)).toBe(0);
    });

    it('should handle decimal percentages', () => {
      expect(percentToPx(33.33, 1000)).toBeCloseTo(333.3, 1);
    });
  });

  describe('pxToPercent()', () => {
    it('should convert pixels to percentage', () => {
      expect(pxToPercent(500, 1000)).toBe(50);
      expect(pxToPercent(100, 400)).toBe(25);
      expect(pxToPercent(500, 500)).toBe(100);
      expect(pxToPercent(0, 1000)).toBe(0);
    });

    it('should handle decimal results', () => {
      expect(pxToPercent(333.3, 1000)).toBeCloseTo(33.33, 1);
    });
  });

  describe('normalizeDim()', () => {
    it('should normalize pixel dimension to number', () => {
      expect(normalizeDim('100px', 1000)).toBe(100);
    });

    it('should normalize percentage dimension to pixels', () => {
      expect(normalizeDim('50%', 1000)).toBe(500);
    });

    it('should return number as-is', () => {
      expect(normalizeDim(100, 1000)).toBe(100);
    });
  });

  describe('numberToPx()', () => {
    it('should convert number to pixel dimension string', () => {
      expect(numberToPx(100)).toBe('100px');
      expect(numberToPx(0)).toBe('0px');
      expect(numberToPx(50.5)).toBe('50.5px');
    });
  });

  describe('numberToPercent()', () => {
    it('should convert number to percentage dimension string', () => {
      expect(numberToPercent(50)).toBe('50%');
      expect(numberToPercent(0)).toBe('0%');
      expect(numberToPercent(100)).toBe('100%');
      expect(numberToPercent(25.5)).toBe('25.5%');
    });
  });
});
