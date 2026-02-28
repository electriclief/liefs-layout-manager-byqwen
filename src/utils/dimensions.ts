/**
 * Dimension utilities for parsing and converting dimension strings
 * 
 * Test coverage: tests/unit/utils/dimensions.test.ts
 */

import type { Dim, ParsedDim } from '../core/types';

/**
 * Check if a string is a pixel dimension (ends with "px")
 * 
 * @param value - String to check
 * @returns True if value is a pixel dimension
 * 
 * @example
 * ```typescript
 * isPx("100px") // true
 * isPx("50%")   // false
 * ```
 */
export function isPx(value: string): boolean {
  return value.endsWith('px');
}

/**
 * Check if a string is a percentage dimension (ends with "%")
 * 
 * @param value - String to check
 * @returns True if value is a percentage dimension
 * 
 * @example
 * ```typescript
 * isPercent("50%")  // true
 * isPercent("100px") // false
 * ```
 */
export function isPercent(value: string): boolean {
  return value.endsWith('%');
}

/**
 * Parse a dimension string into a structured format
 * 
 * @param value - Dimension string ("100px" or "50%")
 * @returns Parsed dimension object with type, value, and original string
 * @throws Error if dimension format is invalid
 * 
 * @example
 * ```typescript
 * parseDim("100px") // { type: 'px', value: 100, original: "100px" }
 * parseDim("50%")   // { type: 'percent', value: 50, original: "50%" }
 * ```
 */
export function parseDim(value: string): ParsedDim {
  if (isPx(value)) {
    const num = parseFloat(value.slice(0, -2));
    if (isNaN(num) || num < 0) {
      throw new Error(`Invalid pixel dimension: "${value}"`);
    }
    return { type: 'px', value: num, original: value };
  }
  
  if (isPercent(value)) {
    const num = parseFloat(value.slice(0, -1));
    if (isNaN(num) || num < 0 || num > 100) {
      throw new Error(`Invalid percentage dimension: "${value}"`);
    }
    return { type: 'percent', value: num, original: value };
  }
  
  throw new Error(
    `Invalid dimension format: "${value}". Expected format: "100px" or "50%"`
  );
}

/**
 * Extract numeric value from a pixel dimension string
 * 
 * @param value - Pixel dimension string (e.g., "100px")
 * @returns Numeric value
 * @throws Error if not a valid pixel dimension
 * 
 * @example
 * ```typescript
 * pxToNumber("100px") // 100
 * pxToNumber("50%")   // throws Error
 * ```
 */
export function pxToNumber(value: string): number {
  if (!isPx(value)) {
    throw new Error(`Expected pixel dimension, got: "${value}"`);
  }
  return parseFloat(value.slice(0, -2));
}

/**
 * Extract numeric value from a percentage dimension string
 * 
 * @param value - Percentage dimension string (e.g., "50%")
 * @returns Numeric value (0-100)
 * @throws Error if not a valid percentage dimension
 * 
 * @example
 * ```typescript
 * percentToNumber("50%")  // 50
 * percentToNumber("100px") // throws Error
 * ```
 */
export function percentToNumber(value: string): number {
  if (!isPercent(value)) {
    throw new Error(`Expected percentage dimension, got: "${value}"`);
  }
  return parseFloat(value.slice(0, -1));
}

/**
 * Convert a percentage to pixels based on available space
 * 
 * @param percent - Percentage value (0-100)
 * @param total - Total available pixels
 * @returns Pixel value
 * 
 * @example
 * ```typescript
 * percentToPx(50, 1000) // 500
 * ```
 */
export function percentToPx(percent: number, total: number): number {
  return (percent / 100) * total;
}

/**
 * Convert pixels to percentage based on available space
 * 
 * @param px - Pixel value
 * @param total - Total available pixels
 * @returns Percentage value (0-100)
 * 
 * @example
 * ```typescript
 * pxToPercent(500, 1000) // 50
 * ```
 */
export function pxToPercent(px: number, total: number): number {
  return (px / total) * 100;
}

/**
 * Normalize a dimension to a consistent format
 * 
 * @param value - Dimension string or number
 * @param total - Total available pixels (for percentage conversion)
 * @returns Pixel value
 * 
 * @example
 * ```typescript
 * normalizeDim("100px", 1000) // 100
 * normalizeDim("50%", 1000)   // 500
 * ```
 */
export function normalizeDim(value: Dim | number, total: number): number {
  if (typeof value === 'number') {
    return value;
  }
  
  const parsed = parseDim(value);
  if (parsed.type === 'px') {
    return parsed.value;
  }
  
  return percentToPx(parsed.value, total);
}

/**
 * Create a pixel dimension string from a number
 * 
 * @param value - Numeric pixel value
 * @returns Pixel dimension string
 * 
 * @example
 * ```typescript
 * numberToPx(100) // "100px"
 * ```
 */
export function numberToPx(value: number): Dim {
  return `${value}px`;
}

/**
 * Create a percentage dimension string from a number
 * 
 * @param value - Numeric percentage value
 * @returns Percentage dimension string
 * 
 * @example
 * ```typescript
 * numberToPercent(50) // "50%"
 * ```
 */
export function numberToPercent(value: number): Dim {
  return `${value}%`;
}
