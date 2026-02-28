/**
 * Tests for Panel component
 * 
 * @see Panel.ts
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { Panel } from '@/components/Panel';

describe('Panel', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('constructor', () => {
    it('should create panel with default options', () => {
      const panel = new Panel();
      expect(panel.dim).toBeUndefined();
      expect(panel.fill).toBe(false);
      expect(panel.content).toBeUndefined();
    });

    it('should create panel with dim option', () => {
      const panel = new Panel({ dim: '200px' });
      expect(panel.dim).toBe('200px');
    });

    it('should create panel with fill option', () => {
      const panel = new Panel({ fill: true });
      expect(panel.fill).toBe(true);
    });

    it('should create panel with content option', () => {
      const panel = new Panel({ content: 'Hello World' });
      expect(panel.content).toBe('Hello World');
    });

    it('should create panel with minSize option', () => {
      const panel = new Panel({ minSize: 100 });
      expect(panel.minSize).toBe(100);
    });

    it('should create panel with maxSize option', () => {
      const panel = new Panel({ maxSize: 500 });
      expect(panel.maxSize).toBe(500);
    });
  });

  describe('mount()', () => {
    it('should create element on mount', () => {
      const panel = new Panel();
      const container = document.createElement('div');
      panel.mount(container);

      expect(panel.element).toBeTruthy();
      expect(panel.isMounted).toBe(true);
    });

    it('should apply flex styles on mount', () => {
      const panel = new Panel();
      const container = document.createElement('div');
      panel.mount(container);

      expect(panel.element?.style.display).toBe('flex');
      expect(panel.element?.style.flexDirection).toBe('column');
    });

    it('should create content element if content provided', () => {
      const panel = new Panel({ content: 'Test content' });
      const container = document.createElement('div');
      panel.mount(container);

      const contentEl = panel.element?.querySelector('.panel-content');
      expect(contentEl).toBeTruthy();
      expect(contentEl?.innerHTML).toBe('Test content');
    });

    it('should not create content element if no content', () => {
      const panel = new Panel();
      const container = document.createElement('div');
      panel.mount(container);

      const contentEl = panel.element?.querySelector('.panel-content');
      expect(contentEl).toBeFalsy();
    });

    it('should mount children on mount', () => {
      const panel = new Panel();
      const child = new Panel({ content: 'Child' });
      panel.addChild(child);

      const container = document.createElement('div');
      panel.mount(container);

      expect(child.isMounted).toBe(true);
    });
  });

  describe('update()', () => {
    it('should update dim property', () => {
      const panel = new Panel({ dim: '200px' });
      const container = document.createElement('div');
      panel.mount(container);

      panel.update({ dim: '300px' });

      expect(panel.dim).toBe('300px');
    });

    it('should update fill property', () => {
      const panel = new Panel({ fill: false });
      const container = document.createElement('div');
      panel.mount(container);

      panel.update({ fill: true });

      expect(panel.fill).toBe(true);
    });

    it('should update content', () => {
      const panel = new Panel({ content: 'Old content' });
      const container = document.createElement('div');
      panel.mount(container);

      panel.update({ content: 'New content' });

      expect(panel.content).toBe('New content');
      const contentEl = panel.element?.querySelector('.panel-content');
      expect(contentEl?.innerHTML).toBe('New content');
    });

    it('should update minSize', () => {
      const panel = new Panel({ minSize: 100 });
      const container = document.createElement('div');
      panel.mount(container);

      panel.update({ minSize: 150 });

      expect(panel.minSize).toBe(150);
    });

    it('should update maxSize', () => {
      const panel = new Panel({ maxSize: 500 });
      const container = document.createElement('div');
      panel.mount(container);

      panel.update({ maxSize: 600 });

      expect(panel.maxSize).toBe(600);
    });
  });

  describe('setContent()', () => {
    it('should set content property', () => {
      const panel = new Panel();
      panel.setContent('New content');

      expect(panel.content).toBe('New content');
    });

    it('should update DOM if mounted', () => {
      const panel = new Panel();
      const container = document.createElement('div');
      panel.mount(container);

      panel.setContent('Updated content');

      const contentEl = panel.element?.querySelector('.panel-content');
      expect(contentEl?.innerHTML).toBe('Updated content');
    });

    it('should create content element if not exists', () => {
      const panel = new Panel();
      const container = document.createElement('div');
      panel.mount(container);

      panel.setContent('New content');

      const contentEl = panel.element?.querySelector('.panel-content');
      expect(contentEl).toBeTruthy();
    });
  });

  describe('getContent()', () => {
    it('should return content', () => {
      const panel = new Panel({ content: 'Test' });
      expect(panel.getContent()).toBe('Test');
    });

    it('should return empty string if no content', () => {
      const panel = new Panel();
      expect(panel.getContent()).toBe('');
    });
  });

  describe('setDimension()', () => {
    it('should set dim property', () => {
      const panel = new Panel();
      panel.setDimension('250px');

      expect(panel.dim).toBe('250px');
    });

    it('should update DOM if mounted', () => {
      const panel = new Panel();
      const container = document.createElement('div');
      panel.mount(container);

      panel.setDimension('300px');

      expect(panel.element?.style.flex).toBe('0 0 300px');
    });
  });

  describe('getDimension()', () => {
    it('should return dim', () => {
      const panel = new Panel({ dim: '200px' });
      expect(panel.getDimension()).toBe('200px');
    });

    it('should return undefined if no dim', () => {
      const panel = new Panel();
      expect(panel.getDimension()).toBeUndefined();
    });
  });

  describe('applyDimensionStyles()', () => {
    it('should apply flex for fill panel', () => {
      const panel = new Panel({ fill: true });
      const container = document.createElement('div');
      panel.mount(container);

      expect(panel.element?.style.flex).toBe('1 1 auto');
    });

    it('should apply flex for px dimension', () => {
      const panel = new Panel({ dim: '200px' });
      const container = document.createElement('div');
      panel.mount(container);

      expect(panel.element?.style.flex).toBe('0 0 200px');
    });

    it('should apply flex for percentage dimension', () => {
      const panel = new Panel({ dim: '50%' });
      const container = document.createElement('div');
      panel.mount(container);

      expect(panel.element?.style.flex).toBe('0 0 50%');
    });

    it('should apply minSize constraint', () => {
      const panel = new Panel({ dim: '200px', minSize: 100 });
      const container = document.createElement('div');
      panel.mount(container);

      expect(panel.element?.style.minWidth).toBe('100px');
    });

    it('should apply maxSize constraint', () => {
      const panel = new Panel({ dim: '200px', maxSize: 300 });
      const container = document.createElement('div');
      panel.mount(container);

      expect(panel.element?.style.maxWidth).toBe('300px');
    });
  });
});
