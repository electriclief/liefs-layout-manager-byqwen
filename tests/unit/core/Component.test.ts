/**
 * Tests for Component base class
 * 
 * @see Component.ts
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { Component } from '@/core/Component';
import type { ComponentOptions } from '@/core/types';

// Test subclass
class TestComponent extends Component {
  constructor(options: ComponentOptions = {}) {
    super('TestComponent', options);
  }

  override mount(container: HTMLElement): void {
    this.element = document.createElement('div');
    this.element.className = this.className;
    container.appendChild(this.element);
    super.mount(container);
  }

  override unmount(): void {
    super.unmount();
  }
}

describe('Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('constructor', () => {
    it('should create component with type', () => {
      const component = new TestComponent();
      expect(component.type).toBe('TestComponent');
    });

    it('should generate unique ID', () => {
      const component1 = new TestComponent();
      const component2 = new TestComponent();
      expect(component1.id).not.toBe(component2.id);
    });

    it('should use provided ID', () => {
      const component = new TestComponent({ id: 'custom-id' });
      expect(component.id).toBe('custom-id');
    });

    it('should set className from options', () => {
      const component = new TestComponent({ className: 'test-class' });
      expect(component.className).toBe('test-class');
    });

    it('should initialize isMounted to false', () => {
      const component = new TestComponent();
      expect(component.isMounted).toBe(false);
    });

    it('should initialize element to null', () => {
      const component = new TestComponent();
      expect(component.element).toBe(null);
    });

    it('should initialize parent to null', () => {
      const component = new TestComponent();
      expect(component.parent).toBe(null);
    });

    it('should initialize children to empty array', () => {
      const component = new TestComponent();
      expect(component.children).toEqual([]);
    });
  });

  describe('mount()', () => {
    it('should set isMounted to true', () => {
      const component = new TestComponent();
      const container = document.createElement('div');
      component.mount(container);
      expect(component.isMounted).toBe(true);
    });

    it('should emit mount event', () => {
      const component = new TestComponent({ id: 'test' });
      const container = document.createElement('div');
      
      let emittedId: string | undefined;
      component.on('mount', (data) => {
        emittedId = data.componentId;
      });
      
      component.mount(container);
      expect(emittedId).toBe('test');
    });
  });

  describe('update()', () => {
    it('should emit expand event (default implementation)', () => {
      const component = new TestComponent({ id: 'test' });
      
      let emittedId: string | undefined;
      component.on('expand', (data) => {
        emittedId = data.componentId;
      });
      
      component.update({});
      expect(emittedId).toBe('test');
    });
  });

  describe('unmount()', () => {
    it('should set isMounted to false', () => {
      const component = new TestComponent();
      const container = document.createElement('div');
      component.mount(container);
      component.unmount();
      expect(component.isMounted).toBe(false);
    });

    it('should remove element from DOM', () => {
      const component = new TestComponent();
      const container = document.createElement('div');
      component.mount(container);
      expect(container.contains(component.element)).toBe(true);
      
      component.unmount();
      expect(container.contains(component.element)).toBe(false);
    });

    it('should unmount all children', () => {
      const parent = new TestComponent();
      const child = new TestComponent();
      
      parent.addChild(child);
      parent.mount(document.createElement('div'));
      
      expect(child.isMounted).toBe(false); // Child not mounted independently
      
      parent.unmount();
      expect(parent.children.length).toBe(0);
    });

    it('should emit unmount event', () => {
      const component = new TestComponent({ id: 'test' });
      const container = document.createElement('div');
      component.mount(container);
      
      let emittedId: string | undefined;
      component.on('unmount', (data) => {
        emittedId = data.componentId;
      });
      
      component.unmount();
      expect(emittedId).toBe('test');
    });

    it('should clear all event listeners', () => {
      const component = new TestComponent({ id: 'test' });
      const container = document.createElement('div');
      component.mount(container);
      
      let called = false;
      component.on('mount', () => {
        called = true;
      });
      
      component.unmount();
      component.emit('mount', { componentId: 'test' });
      expect(called).toBe(false);
    });
  });

  describe('addChild()', () => {
    it('should add child to children array', () => {
      const parent = new TestComponent();
      const child = new TestComponent();
      
      parent.addChild(child);
      expect(parent.children).toContain(child);
    });

    it('should set child parent', () => {
      const parent = new TestComponent();
      const child = new TestComponent();
      
      parent.addChild(child);
      expect(child.parent).toBe(parent);
    });

    it('should insert at specific index', () => {
      const parent = new TestComponent();
      const child1 = new TestComponent({ id: 'child1' });
      const child2 = new TestComponent({ id: 'child2' });
      const child3 = new TestComponent({ id: 'child3' });
      
      parent.addChild(child1);
      parent.addChild(child3);
      parent.addChild(child2, 1);
      
      expect(parent.children[0]?.id).toBe('child1');
      expect(parent.children[1]?.id).toBe('child2');
      expect(parent.children[2]?.id).toBe('child3');
    });
  });

  describe('removeChild()', () => {
    it('should remove child from children array', () => {
      const parent = new TestComponent();
      const child = new TestComponent();
      
      parent.addChild(child);
      parent.removeChild(child);
      expect(parent.children).not.toContain(child);
    });

    it('should set child parent to null', () => {
      const parent = new TestComponent();
      const child = new TestComponent();
      
      parent.addChild(child);
      parent.removeChild(child);
      expect(child.parent).toBe(null);
    });
  });

  describe('getChild()', () => {
    it('should find child by ID', () => {
      const parent = new TestComponent();
      const child1 = new TestComponent({ id: 'child1' });
      const child2 = new TestComponent({ id: 'child2' });
      
      parent.addChild(child1);
      parent.addChild(child2);
      
      expect(parent.getChild('child1')).toBe(child1);
      expect(parent.getChild('child2')).toBe(child2);
    });

    it('should return undefined for non-existent child', () => {
      const parent = new TestComponent();
      expect(parent.getChild('nonexistent')).toBe(undefined);
    });
  });

  describe('applyStyles()', () => {
    it('should apply styles to element', () => {
      const component = new TestComponent();
      const container = document.createElement('div');
      component.mount(container);
      
      (component as any).applyStyles({ display: 'flex', width: '100px' });
      
      expect(component.element?.style.display).toBe('flex');
      expect(component.element?.style.width).toBe('100px');
    });
  });

  describe('addClass()', () => {
    it('should add class to element', () => {
      const component = new TestComponent();
      const container = document.createElement('div');
      component.mount(container);
      
      (component as any).addClass('test-class');
      
      expect(component.element?.classList.contains('test-class')).toBe(true);
    });
  });

  describe('removeClass()', () => {
    it('should remove class from element', () => {
      const component = new TestComponent({ className: 'test-class' });
      const container = document.createElement('div');
      component.mount(container);
      
      (component as any).removeClass('test-class');
      
      expect(component.element?.classList.contains('test-class')).toBe(false);
    });
  });
});
