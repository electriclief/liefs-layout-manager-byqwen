/**
 * Tests for DOM utilities
 * 
 * @see dom.ts
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  createElement,
  setStyles,
  getStyles,
  addClass,
  removeClass,
  hasClass,
  setAttrs,
  getBounds,
  getViewportBounds,
  removeElement,
  clearChildren,
  setText,
  setHtml,
} from '@/utils/dom';

describe('dom', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('createElement()', () => {
    it('should create element with tag name', () => {
      const div = createElement('div');
      expect(div.tagName).toBe('DIV');
    });

    it('should set id if provided', () => {
      const div = createElement('div', { id: 'testId' });
      expect(div.id).toBe('testId');
    });

    it('should set className if provided', () => {
      const div = createElement('div', { className: 'test-class' });
      expect(div.className).toBe('test-class');
    });

    it('should set styles if provided', () => {
      const div = createElement('div', {
        styles: { display: 'flex', backgroundColor: 'red' },
      });
      expect(div.style.display).toBe('flex');
      expect(div.style.backgroundColor).toBe('red');
    });

    it('should set attributes if provided', () => {
      const div = createElement('div', {
        attributes: { 'data-id': '123', 'aria-label': 'Test' },
      });
      expect(div.getAttribute('data-id')).toBe('123');
      expect(div.getAttribute('aria-label')).toBe('Test');
    });

    it('should add children if provided', () => {
      const child1 = createElement('span');
      const child2 = createElement('b');
      const div = createElement('div', { children: [child1, child2] });
      
      expect(div.children.length).toBe(2);
      expect(div.children[0]).toBe(child1);
      expect(div.children[1]).toBe(child2);
    });
  });

  describe('setStyles()', () => {
    it('should set multiple styles', () => {
      const div = createElement('div');
      setStyles(div, { display: 'flex', width: '100px', height: '50px' });
      
      expect(div.style.display).toBe('flex');
      expect(div.style.width).toBe('100px');
      expect(div.style.height).toBe('50px');
    });
  });

  describe('getStyles()', () => {
    it('should get computed styles', () => {
      const div = createElement('div');
      div.style.display = 'flex';
      div.style.width = '100px';
      document.body.appendChild(div);
      
      const styles = getStyles(div, ['display', 'width']);
      expect(styles.display).toBe('flex');
      expect(styles.width).toBe('100px');
    });
  });

  describe('addClass()', () => {
    it('should add a class to element', () => {
      const div = createElement('div');
      addClass(div, 'test-class');
      expect(div.classList.contains('test-class')).toBe(true);
    });

    it('should add multiple classes', () => {
      const div = createElement('div');
      addClass(div, 'class1');
      addClass(div, 'class2');
      expect(div.classList.contains('class1')).toBe(true);
      expect(div.classList.contains('class2')).toBe(true);
    });
  });

  describe('removeClass()', () => {
    it('should remove a class from element', () => {
      const div = createElement('div', { className: 'test-class' });
      removeClass(div, 'test-class');
      expect(div.classList.contains('test-class')).toBe(false);
    });
  });

  describe('hasClass()', () => {
    it('should return true if element has class', () => {
      const div = createElement('div', { className: 'test-class' });
      expect(hasClass(div, 'test-class')).toBe(true);
    });

    it('should return false if element does not have class', () => {
      const div = createElement('div', { className: 'other-class' });
      expect(hasClass(div, 'test-class')).toBe(false);
    });
  });

  describe('setAttrs()', () => {
    it('should set multiple attributes', () => {
      const div = createElement('div');
      setAttrs(div, { 'data-id': '123', 'aria-label': 'Test' });
      
      expect(div.getAttribute('data-id')).toBe('123');
      expect(div.getAttribute('aria-label')).toBe('Test');
    });
  });

  describe('getBounds()', () => {
    it('should return element bounds', () => {
      const div = createElement('div', {
        styles: { width: '100px', height: '50px' },
      });
      document.body.appendChild(div);
      
      const bounds = getBounds(div);
      // Note: jsdom doesn't fully calculate layout, so we check the properties exist
      expect(bounds).toHaveProperty('x');
      expect(bounds).toHaveProperty('y');
      expect(bounds).toHaveProperty('width');
      expect(bounds).toHaveProperty('height');
    });
  });

  describe('getViewportBounds()', () => {
    it('should return viewport-relative bounds', () => {
      const div = createElement('div', {
        styles: { width: '100px', height: '50px' },
      });
      document.body.appendChild(div);
      
      const rect = getViewportBounds(div);
      // Note: jsdom returns 0 for dimensions, but we verify the API works
      expect(rect).toHaveProperty('width');
      expect(rect).toHaveProperty('height');
      expect(rect).toHaveProperty('x');
      expect(rect).toHaveProperty('y');
      expect(rect).toHaveProperty('top');
      expect(rect).toHaveProperty('bottom');
      expect(rect).toHaveProperty('left');
      expect(rect).toHaveProperty('right');
    });
  });

  describe('removeElement()', () => {
    it('should remove element from DOM', () => {
      const div = createElement('div');
      document.body.appendChild(div);
      
      removeElement(div);
      expect(document.body.contains(div)).toBe(false);
    });

    it('should handle null element', () => {
      expect(() => removeElement(null)).not.toThrow();
    });
  });

  describe('clearChildren()', () => {
    it('should remove all children from element', () => {
      const parent = createElement('div');
      const child1 = createElement('span');
      const child2 = createElement('b');
      parent.appendChild(child1);
      parent.appendChild(child2);
      
      clearChildren(parent);
      expect(parent.children.length).toBe(0);
    });
  });

  describe('setText()', () => {
    it('should set text content', () => {
      const div = createElement('div');
      setText(div, 'Hello World');
      expect(div.textContent).toBe('Hello World');
    });
  });

  describe('setHtml()', () => {
    it('should set HTML content', () => {
      const div = createElement('div');
      setHtml(div, '<span>Hello</span><b>World</b>');
      expect(div.innerHTML).toBe('<span>Hello</span><b>World</b>');
    });
  });
});
