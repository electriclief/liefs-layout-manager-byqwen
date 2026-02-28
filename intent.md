# Liefs Layout Manager - Intent & Architecture Document

> **Purpose**: This document captures the complete intent, architecture, and functionality of the original liefs-layout-manager (v3.0.0, 2017-2021) to enable a complete modern rewrite.

---

## Table of Contents

1. [Overview](#overview)
2. [Core Philosophy](#core-philosophy)
3. [Original Architecture](#original-architecture)
4. [Component Breakdown](#component-breakdown)
5. [Key Features](#key-features)
6. [Usage Patterns](#usage-patterns)
7. [Problems with Original](#problems-with-original)
8. [Modern Rewrite Goals](#modern-rewrite-goals)
9. [Proposed New Architecture](#proposed-new-architecture)
10. [Implementation Roadmap](#implementation-roadmap)

---

## 1. Overview

**Package**: `liefs-layout-manager`  
**Original Author**: Stacy Lief Kelly  
**Version**: 3.0.0 (last updated May 2021)  
**Original Era**: 2017-2021 (JavaScript/TypeScript transition period)

**What It Is**: A client-side dynamic layout management framework for creating complex, resizable, dynamic web page layouts without relying on CSS frameworks.

**Core Value Proposition**:
- Clean DOM management (removes non-visible divs automatically)
- Pixel-perfect control over element positioning
- Built-in support for resizable panels, tabs, trees, modals, scrollbars
- No dependencies, smaller than jQuery
- Works with vanilla JS or frameworks

---

## 2. Core Philosophy

### Design Principles

1. **Layout as Code**: Define layouts programmatically rather than with CSS classes
2. **Coordinate-Based Positioning**: Absolute positioning with explicit x, y, width, height
3. **Clean DOM**: Only render visible elements; remove hidden elements from DOM
4. **Component Hierarchy**: Everything is a Component with parent/child relationships
5. **Two-Phase Rendering**: `preRender()` for modifications, `Render()` for actual rendering
6. **Event Stacking**: Multiple event handlers can be stacked on the same element
7. **Dimension System**: Support both pixels (`"100px"`) and percentages (`"50%"`)

### Target Use Cases

- Admin dashboards with resizable panels
- IDE-like interfaces with collapsible sections
- Complex data entry forms with dynamic sections
- Applications requiring drag-to-resize functionality
- Modal dialog systems with custom positioning

---

## 3. Original Architecture

### Class Hierarchy

```
Base
├── Component
│   ├── DisplayCell
│   │   └── Element_
│   ├── DisplayGroup
│   ├── Handler
│   ├── DragBar
│   ├── Modal
│   │   └── Stretch (resize handles)
│   ├── Pages (tab/swipe system)
│   ├── ScrollBar
│   ├── Context (right-click menus)
│   ├── Tree_ (tree view)
│   └── Selected (selection management)
├── Coord (position/size data)
├── node_ (tree structure)
├── Css (CSS class management)
├── Render (rendering engine)
├── FunctionStack (event stacking)
├── onDrag_ (drag event handler)
└── onHoldClick_ (hold-to-repeat click)
```

### Core Systems

#### 3.1 Argument System (Arguments_)

Unique feature: Constructor argument sorting by type.

```typescript
// Instead of named parameters or options object:
new DisplayGroup("label", 5, "50%", true)

// Arguments are sorted by type:
// - string: ["label"]
// - number: [5]
// - dim: ["50%"]
// - boolean: [true]
```

**Problem**: Hard to understand, order matters within same type, no IDE autocomplete.

#### 3.2 Coord System

Every component has a `Coord` object with:
- `x, y, width, height` - position and size
- `zindex` - stacking order
- `within` - parent bounds (for clipping detection)
- `offset` - for scrolling/panning

**Rendering Flow**:
1. Parent Coord is copied to children
2. Children adjust based on their specific logic
3. Render checks if outside `within` bounds → skip rendering

#### 3.3 Render System

Two-phase render cycle:

```typescript
preRender(derender, node, zindex) {
    // Modify parent DisplayCells before rendering
    // Return children to render
}

Render(derender, node, zindex) {
    // Calculate coordinates
    // Return array of children to render
}
```

**Update Cycle**:
```
User Action → Render.scheduleUpdate() → setTimeout(0) → Render.fullupdate()
```

#### 3.4 Event System

Event stacking allows multiple handlers:

```typescript
element.addEvents({
    onclick: function1,
    ondrag: [onDown, onMove, onUp]  // Custom drag event
})
```

---

## 4. Component Breakdown

### 4.1 DisplayCell

**Purpose**: Container that holds components within a coordinate space.

```typescript
const cell = new DisplayCell("myCell")
    .addComponent(new Element_("Hello World"));
```

**Key Features**:
- Manages child components
- Provides coordinate system for children
- Handles margins

**Shortcut**: `I("label", content, css)` creates DisplayCell + Element_

### 4.2 DisplayGroup

**Purpose**: Layout engine - arranges DisplayCells in rows (horizontal) or columns (vertical).

```typescript
// Horizontal layout: 3 cells, 5px gap
const hGroup = new DisplayGroup("hGroup", 5, true);
hGroup.parentDisplayCell.addComponent(hGroup);

// Add cells with dimensions
hGroup.children.push(cell1);  // cell1.dim = "200px"
hGroup.children.push(cell2);  // cell2.dim = "50%"
hGroup.children.push(cell3);  // cell3.dim = undefined (fills remainder)
```

**Dimension Calculation**:
1. First pass: Collect px and % values
2. Second pass: Distribute remaining space for empty dims
3. Third pass: Convert % to px
4. Enforce minimum sizes

**Shortcuts**:
```typescript
h("label", 5, cell1, cell2)  // horizontal
v("label", 5, cell1, cell2)  // vertical
```

### 4.3 Element_

**Purpose**: Wrapper around HTML div elements.

```typescript
const el = new Element_("myButton", "Click Me", "buttonCss");
el.addEvents({ onclick: () => console.log("clicked") });
```

**Features**:
- Manages HTML attributes
- Handles CSS classes
- Custom event types (ondrag, onholdclick)

### 4.4 DragBar

**Purpose**: Resizable divider between panels.

```typescript
const dragBar = new DragBar("resizer", 100, 500);  // min: 100px, max: 500px
```

**Behavior**:
- Appears between DisplayGroup children
- Dragging adjusts adjacent cell dimensions
- Automatically detects orientation (horizontal/vertical group)

### 4.5 Pages

**Purpose**: Tab/swipe system - show one child at a time.

```typescript
const pages = new Pages("tabs", tree, evalFunction);
pages.currentPage = 2;  // Switch to page 2
```

**Features**:
- Switch by index or evaluation function
- Integrates with Tree for navigation
- Only renders current page

### 4.6 ScrollBar

**Purpose**: Custom scrollbar for overflow content.

```typescript
const scrollbar = new ScrollBar("scroll", true);  // true = horizontal
```

**Features**:
- Auto-shows when content overflows
- Arrow buttons for fine control
- Click bar to jump, drag to scroll
- Auto-hides when not needed

### 4.7 Modal

**Purpose**: Draggable, resizable popup windows.

```typescript
const modal = new Modal("myModal", rootCell, startCoord);
modal.show();
modal.dragWith(titleBar);  // Drag by title bar
modal.closeWith(closeButton);
```

**Features**:
- Draggable by any element
- Optional resize handles (Stretch)
- Stays within screen bounds
- Z-index management

### 4.8 Context

**Purpose**: Right-click (context) menus with submenus.

```typescript
const contextMenu = new Context("menu", "oncontextmenu", true, contextNode);
contextMenu.onclick = (e, cell, node) => { /* handle selection */ };
```

**Features**:
- Triggered by any event (default: contextmenu)
- Supports nested submenus
- Auto-positioning (follows cursor or parent)
- Auto-dismiss on mouse leave

### 4.9 Tree_

**Purpose**: Expandable/collapsible tree view.

```typescript
const tree = new Tree_("fileTree", rootNode);
tree.indent = 20;
tree.height = 25;
```

**Features**:
- Auto scrollbars for overflow
- Custom icons (collapsed/expanded)
- Integration with Selected for highlighting
- Lazy rendering (only visible nodes)

### 4.10 Selected

**Purpose**: Manage selection state across components.

```typescript
const selected = new Selected("nav", 0, {
    getIndexerArray: () => [/* array of DisplayCells */],
    onselect: (index, cell) => { /* highlight */ },
    onunselect: (index, cell) => { /* unhighlight */ }
});
selected.select(2);  // Select item 2
```

---

## 5. Key Features

### 5.1 Dimension System

Supports mixed units:

```typescript
cell1.dim = "200px";     // Fixed pixels
cell2.dim = "50%";       // Percentage of available space
cell3.dim = undefined;   // Fills remainder
cell4.min = 100;         // Minimum size constraint
```

### 5.2 Automatic Layout Calculation

DisplayGroup handles complex distribution:

```
Container: 1000px
├─ Cell 1: 200px (fixed)
├─ Cell 2: 50% (of remaining 800px = 400px)
├─ Cell 3: ? (fills remainder = 400px)
└─ Margins: 5px between cells
```

### 5.3 Viewport Clipping

Elements automatically clip when outside view:

```typescript
// Coord checks if outside 'within' bounds
if (coord.isCoordCompletelyOutside()) {
    // Skip rendering, remove from DOM
}
```

### 5.4 Event Stacking

Multiple handlers for same event:

```typescript
// FunctionStack allows multiple onclick handlers
element.addEvents({ onclick: handler1 });
element.addEvents({ onclick: handler2 });
// Both fire on click
```

### 5.5 Custom Events

Built-in complex event types:

```typescript
// Drag with start/move/end
events({ ondrag: [onDown, onMove, onUp] })

// Hold-to-repeat click
events({ onholdclick: [handler, initialDelay, repeatDelay] })
```

---

## 6. Usage Patterns

### 6.1 Basic Layout

```typescript
import { h, v, I } from 'liefs-layout-manager';

// Simple 3-column layout
const layout = v("main", 0,
    h("header", 0, I("title", "My App")),
    h("content", 0,
        I("left", "200px", "Sidebar"),
        I("middle", "100%", "Main Content"),
        I("right", "150px", "Panel")
    ),
    h("footer", 0, I("copyright", "© 2021"))
);
```

### 6.2 Resizable Panels

```typescript
import { h, DragBar } from 'liefs-layout-manager';

const resizable = h("resizable", 5,  // 5px gap = drag bar width
    I("panel1", "300px", "Left Panel"),
    new DragBar("drag1", 100, 500),  // min 100px, max 500px
    I("panel2", "100%", "Right Panel")
);
```

### 6.3 Modal Dialog

```typescript
import { winModal, I } from 'liefs-layout-manager';

const dialog = new winModal("dialog", {
    titleText: "Settings",
    innerHTML: "<form>...</form>",
    headerHeight: 30,
    onclose: () => console.log("closed")
});
dialog.show();
```

### 6.4 Context Menu

```typescript
import { context, node_ } from 'liefs-layout-manager';

const menuNode = new node_("menu",
    new node_("Copy", () => copy()),
    new node_("Paste", () => paste()),
    new node_("Submenu",
        new node_("Option 1", () => opt1()),
        new node_("Option 2", () => opt2())
    )
);

const contextMenu = context("ctxMenu", "oncontextmenu", true, menuNode);
```

### 6.5 Tree View

```typescript
import { Tree_, node_ } from 'liefs-layout-manager';

const treeRoot = new node_("root",
    new node_("Parent 1",
        new node_("Child 1.1"),
        new node_("Child 1.2")
    ),
    new node_("Parent 2")
);

const tree = new Tree_("fileTree", treeRoot);
tree.indent = 20;
tree.height = 25;
```

---

## 7. Problems with Original

### 7.1 API Design Issues

1. **Argument Sorting Confusion**
   ```typescript
   // Unclear what each parameter does
   new DisplayGroup("label", 5, "50%", true)
   
   // Better with named parameters
   new DisplayGroup({ label: "main", margin: 5, dim: "50%", horizontal: true })
   ```

2. **No TypeScript Support (despite .d.ts files)**
   - Argument types not enforced
   - Return types often `any`
   - Complex inheritance hard to follow

3. **Inconsistent Naming**
   - `DisplayCell` vs `Element_` vs `node_`
   - Mixed camelCase and underscores
   - Abbreviations: `el`, `dim`, `coord`

### 7.2 Architecture Issues

1. **Global State**
   - Static `instances` objects everywhere
   - No dependency injection
   - Hard to test in isolation

2. **Manual DOM Management**
   - Direct `document.createElement` calls
   - Manual style string concatenation
   - No virtual DOM or diffing

3. **Render Performance**
   - Full re-render on any change
   - No memoization
   - `setTimeout(0)` for all updates

4. **Tight Coupling**
   - Components reference each other directly
   - Hard to extract/replace pieces
   - No clear boundaries

### 7.3 Missing Features

1. **No Animation Support**
   - Instant changes only
   - No transitions for resize/collapse

2. **No Touch Support**
   - Mouse events only
   - No mobile/touch device support

3. **No Accessibility**
   - No ARIA attributes
   - No keyboard navigation
   - No screen reader support

4. **No SSR Support**
   - Browser-only
   - No server-side rendering

### 7.4 Code Quality

1. **No Tests**
   - `npm test` → "Error: no test specified"
   - Manual testing only

2. **Inconsistent Documentation**
   - JSDoc comments present but incomplete
   - Examples not always up-to-date

3. **Dead Code**
   - Commented-out boilerplate left in source
   - Unused methods (`toCode`, `red()`)

---

## 8. Modern Rewrite Goals

### 8.1 API Improvements

1. **Named Parameters / Options Objects**
   ```typescript
   // Old
   new DisplayGroup("label", 5, "50%", true)
   
   // New
   createDisplayGroup({
     label: "main",
     margin: 5,
     dim: "50%",
     orientation: "horizontal"
   })
   ```

2. **Builder Pattern for Complex Structures**
   ```typescript
   const layout = createLayout()
     .horizontal({ margin: 5 })
       .panel({ dim: "200px", content: "Sidebar" })
       .panel({ dim: "100%", content: "Main" })
     .build();
   ```

3. **React/Vue/Angular Compatibility**
   ```tsx
   // React example
   <DisplayGroup orientation="horizontal" margin={5}>
     <Panel dim="200px">Sidebar</Panel>
     <Panel dim="100%">Main</Panel>
   </DisplayGroup>
   ```

### 8.2 Architecture Improvements

1. **Flexbox-Based Layout**
   - Replace absolute positioning with CSS Flexbox
   - Better browser support
   - Simpler code, better performance
   - Native responsiveness

2. **Component-Based Design**
   - True encapsulation
   - Props/children pattern
   - Lifecycle hooks (mount, update, unmount)

3. **State Management**
   - Centralized state store
   - Immutable updates
   - Predictable rendering

4. **Event System**
   - Use standard DOM events
   - Remove event stacking complexity
   - Better TypeScript support

### 8.3 Feature Additions

1. **Animations**
   - CSS transitions for resize
   - Spring animations for modals
   - Configurable animation curves

2. **Touch Support**
   - Pointer events instead of mouse
   - Touch gestures for mobile
   - Responsive touch targets

3. **Accessibility**
   - ARIA labels and roles
   - Keyboard navigation
   - Focus management
   - Screen reader testing

4. **Theming**
   - CSS custom properties
   - Built-in themes
   - Easy customization

5. **DevTools**
   - Layout visualization
   - Performance profiling
   - Debug mode

### 8.4 Quality Improvements

1. **Full Test Suite**
   - Unit tests for all components
   - Integration tests for layouts
   - E2E tests with Playwright

2. **TypeScript First**
   - Strict mode enabled
   - No `any` types
   - Full type inference

3. **Documentation**
   - Auto-generated API docs
   - Interactive examples
   - Migration guide from v3

4. **Performance**
   - Virtual rendering for large trees
   - Memoization of calculations
   - RequestAnimationFrame for updates

---

## 9. Proposed New Architecture

### 9.1 Core Concepts

```
┌─────────────────────────────────────────────────────┐
│                   Public API                        │
│  (Builder Pattern, React Components, Vanilla JS)   │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                 Layout Engine                       │
│  (Flexbox calculations, Size distribution)          │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│              Component System                       │
│  (Base classes, Lifecycle, Event handling)          │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│               Render Layer                          │
│  (DOM manipulation, CSS application)                │
└─────────────────────────────────────────────────────┘
```

### 9.2 Module Structure

```
@liefs/layout-manager/
├── core/
│   ├── LayoutEngine.ts      # Flexbox calculations
│   ├── Component.ts         # Base component class
│   ├── EventEmitter.ts      # Event system
│   └── types.ts             # TypeScript types
├── components/
│   ├── Panel.ts             # Basic panel (replaces DisplayCell)
│   ├── Layout.ts            # Container (replaces DisplayGroup)
│   ├── Divider.ts           # Resizable divider (replaces DragBar)
│   ├── Tabs.ts              # Tab system (replaces Pages)
│   ├── Modal.ts             # Modal dialogs
│   ├── Menu.ts              # Context menus
│   ├── Tree.ts              # Tree view
│   └── Scrollbar.ts         # Custom scrollbars
├── hooks/                   # React hooks (if React support)
│   ├── useLayout.ts
│   └── useResizable.ts
├── utils/
│   ├── dimensions.ts        # Dimension parsing
│   └── dom.ts               # DOM utilities
└── index.ts                 # Public exports
```

### 9.3 Flexbox Strategy

**Old Approach (Absolute Positioning)**:
```typescript
// Manual calculation
cell.coord.x = 0;
cell.coord.y = 0;
cell.coord.width = 200;
cell.coord.height = "100%";
```

**New Approach (Flexbox)**:
```css
.layout-horizontal {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.panel {
  flex: 0 0 200px;  /* flex-grow, flex-shrink, flex-basis */
}

.panel-fill {
  flex: 1 1 auto;  /* Fill remaining space */
}
```

**Benefits**:
- Browser handles layout calculations
- Automatic responsiveness
- Simpler code
- Better performance
- Native browser optimizations

### 9.4 Resizable Panels with Flexbox

```typescript
// Using modern CSS Grid + Resize Observer
class ResizablePanel {
  constructor(options: {
    minSize?: number;
    maxSize?: number;
    initialSize?: string;
  }) {}
  
  onResize(callback: (size: number) => void) {}
}

// Usage
const [left, divider, right] = createLayout({
  orientation: 'horizontal',
  children: [
    createPanel({ initialSize: '300px', minSize: 100 }),
    createDivider(),
    createPanel({ fill: true })
  ]
});
```

### 9.5 State Management

```typescript
// Centralized layout state
interface LayoutState {
  panels: Map<string, PanelState>;
  dividers: Map<string, DividerState>;
  modals: ModalState[];
}

// Immutable updates
const newState = produce(state, draft => {
  draft.panels.get('left').size = '400px';
});

// React integration
const [layout, dispatch] = useLayoutReducer(initialState);
```

### 9.6 Event System

```typescript
// Standard DOM events with better typing
interface LayoutEvents {
  resize: { panelId: string; newSize: number };
  collapse: { panelId: string };
  modalOpen: { modalId: string };
  modalClose: { modalId: string };
}

class EventEmitter {
  on<K extends keyof LayoutEvents>(
    event: K,
    callback: (data: LayoutEvents[K]) => void
  ): () => void;
  
  emit<K extends keyof LayoutEvents>(
    event: K,
    data: LayoutEvents[K]
  ): void;
}
```

---

## 10. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

- [ ] Set up modern TypeScript project
- [ ] Configure build system (Vite/Rollup)
- [ ] Set up testing (Vitest + Playwright)
- [ ] Create base Component class
- [ ] Implement EventEmitter
- [ ] Create dimension parsing utilities

### Phase 2: Core Layout (Week 3-4)

- [ ] Implement Layout component (Flexbox container)
- [ ] Implement Panel component
- [ ] Implement Divider component (resizable)
- [ ] Add Resize Observer support
- [ ] Create basic examples

### Phase 3: Advanced Components (Week 5-6)

- [ ] Implement Modal system
- [ ] Implement Tabs component
- [ ] Implement Menu/ContextMenu
- [ ] Implement Tree view
- [ ] Implement Scrollbar

### Phase 4: Polish (Week 7-8)

- [ ] Add animations
- [ ] Add touch support
- [ ] Add accessibility features
- [ ] Create themes
- [ ] Write documentation

### Phase 5: Framework Integration (Week 9-10)

- [ ] React components/hooks
- [ ] Vue components/composables
- [ ] Angular components
- [ ] Svelte components

### Phase 6: Release (Week 11-12)

- [ ] Beta testing
- [ ] Performance optimization
- [ ] Migration guide
- [ ] v4.0.0 release

---

## Appendix A: Original API Reference

### Shortcuts

| Function | Creates | Description |
|----------|---------|-------------|
| `I(label, content, css)` | DisplayCell + Element_ | Basic content cell |
| `h(label, margin, ...cells)` | DisplayCell + DisplayGroup (horizontal) | Horizontal layout |
| `v(label, margin, ...cells)` | DisplayCell + DisplayGroup (vertical) | Vertical layout |
| `H(label, ...args)` | DisplayCell + Handler | Event handler container |
| `P(...args)` | DisplayCell + Pages | Tab/swipe system |

### Dimension Format

```typescript
type Dim = `${number}px` | `${number}%`;

// Examples
"200px"   // Fixed 200 pixels
"50%"     // 50 percent of parent
"100%"    // Fill parent
```

### Component Lifecycle

```
1. Constructor → buildBase() → apply arguments
2. onConnect() → parent discovered
3. preRender() → modify before render
4. Render() → calculate coordinates, return children
5. (repeat 3-4 on updates)
6. delete() → cleanup
```

---

## Appendix B: Key Learnings from Original

### What Worked Well

1. **Clean DOM**: Only rendering visible elements kept performance good
2. **Dimension System**: Mixed px/% was powerful and flexible
3. **Drag Events**: Custom ondrag/onholdclick were useful
4. **Modal System**: Flexible dragging/resizing worked well
5. **Context Menus**: Nested menus with auto-positioning

### What Didn't Work

1. **Absolute Positioning**: Too much manual calculation
2. **Argument Sorting**: Confusing API, hard to maintain
3. **Global State**: Hard to test, debug, and reason about
4. **Render System**: Full re-renders were inefficient
5. **No Tests**: Bugs discovered by users, not developers

### What to Keep

1. Philosophy of clean DOM
2. Mixed dimension system (px + %)
3. Component hierarchy concept
4. Event handling (but simplified)
5. Modal/drag behavior

### What to Change

1. Use Flexbox/Grid instead of absolute positioning
2. Named parameters / options objects
3. Proper state management
4. Incremental rendering with memoization
5. Full test coverage

---

## Appendix C: Migration Considerations

### Breaking Changes (v3 → v4)

1. **Argument System**: All constructors use options objects
2. **Positioning**: Flexbox replaces coordinate system
3. **Events**: Standard DOM events replace custom stacking
4. **Naming**: Consistent naming conventions
5. **Modules**: ES modules only (no UMD/IIFE)

### Backwards Compatibility

- Provide v3 compatibility layer?
- Migration scripts/codemods?
- Detailed migration guide

---

**Document Version**: 1.0  
**Created**: 2026-02-28  
**Based On**: liefs-layout-manager v3.0.0 (2021)  
**Purpose**: Enable complete modern rewrite
