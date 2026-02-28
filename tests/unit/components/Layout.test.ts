/**
 * Tests for Layout component
 * 
 * @see Layout.ts
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { Layout } from '@/components/Layout';
import { Panel } from '@/components/Panel';

describe('Layout', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('constructor', () => {
    it('should create layout with default options', () => {
      const layout = new Layout({ orientation: 'horizontal' });
      expect(layout.orientation).toBe('horizontal');
      expect(layout.gap).toBe(0);
      expect(layout.padding).toBe(0);
    });

    it('should create layout with custom gap', () => {
      const layout = new Layout({ orientation: 'horizontal', gap: 10 });
      expect(layout.gap).toBe(10);
    });

    it('should create layout with custom padding', () => {
      const layout = new Layout({ orientation: 'vertical', padding: 20 });
      expect(layout.padding).toBe(20);
    });

    it('should create layout with vertical orientation', () => {
      const layout = new Layout({ orientation: 'vertical' });
      expect(layout.orientation).toBe('vertical');
    });
  });

  describe('mount()', () => {
    it('should create flexbox element on mount', () => {
      const layout = new Layout({ orientation: 'horizontal' });
      const container = document.createElement('div');
      layout.mount(container);

      expect(layout.element).toBeTruthy();
      expect(layout.element?.style.display).toBe('flex');
      expect(layout.element?.style.flexDirection).toBe('row');
    });

    it('should apply gap style on mount', () => {
      const layout = new Layout({ orientation: 'horizontal', gap: 15 });
      const container = document.createElement('div');
      layout.mount(container);

      expect(layout.element?.style.gap).toBe('15px');
    });

    it('should apply padding style on mount', () => {
      const layout = new Layout({ orientation: 'horizontal', padding: 10 });
      const container = document.createElement('div');
      layout.mount(container);

      expect(layout.element?.style.padding).toBe('10px');
    });

    it('should mount children on mount', () => {
      const layout = new Layout({ orientation: 'horizontal' });
      const panel = new Panel({ content: 'Test' });
      layout.addChild(panel);

      const container = document.createElement('div');
      layout.mount(container);

      expect(panel.isMounted).toBe(true);
      expect(panel.element).toBeTruthy();
    });

    it('should set isMounted to true', () => {
      const layout = new Layout({ orientation: 'horizontal' });
      const container = document.createElement('div');
      layout.mount(container);

      expect(layout.isMounted).toBe(true);
    });
  });

  describe('update()', () => {
    it('should update orientation', () => {
      const layout = new Layout({ orientation: 'horizontal' });
      const container = document.createElement('div');
      layout.mount(container);

      layout.update({ orientation: 'vertical' });

      expect(layout.orientation).toBe('vertical');
      expect(layout.element?.style.flexDirection).toBe('column');
    });

    it('should update gap', () => {
      const layout = new Layout({ orientation: 'horizontal', gap: 10 });
      const container = document.createElement('div');
      layout.mount(container);

      layout.update({ gap: 20 });

      expect(layout.gap).toBe(20);
      expect(layout.element?.style.gap).toBe('20px');
    });

    it('should update padding', () => {
      const layout = new Layout({ orientation: 'horizontal', padding: 10 });
      const container = document.createElement('div');
      layout.mount(container);

      layout.update({ padding: 25 });

      expect(layout.padding).toBe(25);
      expect(layout.element?.style.padding).toBe('25px');
    });
  });

  describe('addChild()', () => {
    it('should add child to children array', () => {
      const layout = new Layout({ orientation: 'horizontal' });
      const panel = new Panel({ content: 'Test' });

      layout.addChild(panel);

      expect(layout.children).toContain(panel);
    });

    it('should set child parent', () => {
      const layout = new Layout({ orientation: 'horizontal' });
      const panel = new Panel({ content: 'Test' });

      layout.addChild(panel);

      expect(panel.parent).toBe(layout);
    });

    it('should mount child if already mounted', () => {
      const layout = new Layout({ orientation: 'horizontal' });
      const container = document.createElement('div');
      layout.mount(container);

      const panel = new Panel({ content: 'Test' });
      layout.addChild(panel);

      expect(panel.isMounted).toBe(true);
      expect(panel.element).toBeTruthy();
    });

    it('should insert at specific index', () => {
      const layout = new Layout({ orientation: 'horizontal' });
      const panel1 = new Panel({ id: 'p1', content: '1' });
      const panel2 = new Panel({ id: 'p2', content: '2' });
      const panel3 = new Panel({ id: 'p3', content: '3' });

      layout.addChild(panel1);
      layout.addChild(panel3);
      layout.addChild(panel2, 1);

      expect(layout.children[0]?.id).toBe('p1');
      expect(layout.children[1]?.id).toBe('p2');
      expect(layout.children[2]?.id).toBe('p3');
    });
  });

  describe('removeChild()', () => {
    it('should remove child from children array', () => {
      const layout = new Layout({ orientation: 'horizontal' });
      const panel = new Panel({ content: 'Test' });

      layout.addChild(panel);
      layout.removeChild(panel);

      expect(layout.children).not.toContain(panel);
    });

    it('should unmount child when removed', () => {
      const layout = new Layout({ orientation: 'horizontal' });
      const container = document.createElement('div');
      layout.mount(container);

      const panel = new Panel({ content: 'Test' });
      layout.addChild(panel);

      layout.removeChild(panel);

      expect(panel.isMounted).toBe(false);
    });
  });

  describe('getChildElements()', () => {
    it('should return array of child elements', () => {
      const layout = new Layout({ orientation: 'horizontal' });
      const container = document.createElement('div');
      layout.mount(container);

      const panel1 = new Panel({ content: '1' });
      const panel2 = new Panel({ content: '2' });
      layout.addChild(panel1);
      layout.addChild(panel2);

      const childElements = layout.getChildElements();

      expect(childElements.length).toBe(2);
      // Check that elements exist in DOM (not exact reference due to wrapper divs)
      expect(childElements[0]).toBeTruthy();
      expect(childElements[1]).toBeTruthy();
    });

    it('should return empty array if not mounted', () => {
      const layout = new Layout({ orientation: 'horizontal' });

      const childElements = layout.getChildElements();

      expect(childElements).toEqual([]);
    });
  });

  describe('clearChildren()', () => {
    it('should remove all children', () => {
      const layout = new Layout({ orientation: 'horizontal' });
      const container = document.createElement('div');
      layout.mount(container);

      const panel1 = new Panel({ content: '1' });
      const panel2 = new Panel({ content: '2' });
      layout.addChild(panel1);
      layout.addChild(panel2);

      layout.clearChildren();

      expect(layout.children.length).toBe(0);
      expect(layout.element?.children.length).toBe(0);
    });
  });

  describe('flexDirection getter', () => {
    it('should return "row" for horizontal orientation', () => {
      const layout = new Layout({ orientation: 'horizontal' });
      expect(layout.flexDirection).toBe('row');
    });

    it('should return "column" for vertical orientation', () => {
      const layout = new Layout({ orientation: 'vertical' });
      expect(layout.flexDirection).toBe('column');
    });
  });
});
