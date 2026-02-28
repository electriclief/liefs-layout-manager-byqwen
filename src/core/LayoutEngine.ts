/**
 * Layout Engine - Flexbox calculations and dimension resolution
 * 
 * Test coverage: tests/unit/core/LayoutEngine.test.ts
 */

import type { Dim } from '../core/types';

/**
 * Calculate flex values for a set of dimensions
 * 
 * @param dimensions - Array of dimension strings
 * @param availableSpace - Total available space in pixels
 * @returns Array of flex values
 * 
 * @example
 * ```typescript
 * const flexValues = calculateFlexValues(['200px', '50%', '100px'], 1000);
 * // Returns flex values for each dimension
 * ```
 */
export function calculateFlexValues(dimensions: (Dim | undefined)[], availableSpace: number): string[] {
  return dimensions.map((dim) => {
    if (!dim) {
      return '1 1 auto';
    }
    
    if (dim.endsWith('%')) {
      return `0 0 ${dim}`;
    }
    
    if (dim.endsWith('px')) {
      return `0 0 ${dim}`;
    }
    
    return '1 1 auto';
  });
}

/**
 * Apply min/max constraints to a size
 * 
 * @param size - Current size
 * @param minSize - Minimum size constraint
 * @param maxSize - Maximum size constraint
 * @returns Constrained size
 * 
 * @example
 * ```typescript
 * const constrained = applyConstraints(150, 100, 200);
 * // Returns 150 (within constraints)
 * ```
 */
export function applyConstraints(size: number, minSize?: number, maxSize?: number): number {
  let constrained = size;
  
  if (minSize !== undefined) {
    constrained = Math.max(constrained, minSize);
  }
  
  if (maxSize !== undefined) {
    constrained = Math.min(constrained, maxSize);
  }
  
  return constrained;
}

/**
 * Resolve a dimension to pixels based on available space
 * 
 * @param dim - Dimension string (px or %)
 * @param availableSpace - Total available space in pixels
 * @returns Size in pixels
 * 
 * @example
 * ```typescript
 * const px = resolveDimension('50%', 1000);
 * // Returns 500
 * ```
 */
export function resolveDimension(dim: Dim, availableSpace: number): number {
  if (dim.endsWith('px')) {
    return parseFloat(dim);
  }
  
  if (dim.endsWith('%')) {
    const percent = parseFloat(dim) / 100;
    return percent * availableSpace;
  }
  
  return availableSpace;
}

/**
 * Calculate remaining space after fixed dimensions
 * 
 * @param dimensions - Array of dimension strings
 * @param availableSpace - Total available space
 * @param gap - Gap between items
 * @returns Remaining space
 * 
 * @example
 * ```typescript
 * const remaining = calculateRemainingSpace(['200px', '100px'], 1000, 10);
 * // Returns space left for flexible items
 * ```
 */
export function calculateRemainingSpace(
  dimensions: (Dim | undefined)[],
  availableSpace: number,
  gap: number = 0
): number {
  let usedSpace = 0;
  const gapCount = Math.max(0, dimensions.length - 1);
  usedSpace += gapCount * gap;
  
  for (const dim of dimensions) {
    if (dim && dim.endsWith('px')) {
      usedSpace += parseFloat(dim);
    }
  }
  
  return Math.max(0, availableSpace - usedSpace);
}

/**
 * Distribute remaining space among flexible items
 * 
 * @param remainingSpace - Space to distribute
 * @param flexibleCount - Number of flexible items
 * @returns Space per flexible item
 * 
 * @example
 * ```typescript
 * const perItem = distributeRemainingSpace(500, 2);
 * // Returns 250
 * ```
 */
export function distributeRemainingSpace(remainingSpace: number, flexibleCount: number): number {
  if (flexibleCount === 0) return 0;
  return remainingSpace / flexibleCount;
}

/**
 * Check if a dimension is flexible (fill remaining space)
 * 
 * @param dim - Dimension string or undefined
 * @returns True if dimension is flexible
 * 
 * @example
 * ```typescript
 * isFlexible(undefined) // true
 * isFlexible('50%') // false
 * ```
 */
export function isFlexible(dim: Dim | undefined): boolean {
  return dim === undefined;
}

/**
 * Count flexible items in dimension array
 * 
 * @param dimensions - Array of dimension strings
 * @returns Count of flexible items
 */
export function countFlexibleItems(dimensions: (Dim | undefined)[]): number {
  return dimensions.filter(isFlexible).length;
}
