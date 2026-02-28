# TODO - Liefs Layout Manager v4.0.0 Rewrite

**Status Tracking**: ✅ Complete | 🔄 In Progress | ⏳ Pending | ❌ Blocked

---

## Phase 1: Foundation (Week 1-2)

### 1.1 Project Setup
- [x] Create intent.md architecture document
- [x] Create QWEN.md memory file
- [x] Create todo.md task tracking
- [x] Initialize git repository
- [x] Create package.json with modern config
- [x] Set up TypeScript (strict mode, tsconfig.json)
- [x] Configure ESLint + Prettier
- [x] Set up .gitignore

### 1.2 Build System
- [x] Install Vite for dev server + build
- [x] Configure Rollup for library bundling
- [x] Set up multiple entry points (core, components, full)
- [x] Configure sourcemaps
- [x] Add build scripts to package.json

### 1.3 Testing Infrastructure
- [x] Install Vitest (unit test framework)
- [x] Install jsdom (DOM testing environment)
- [x] Install Playwright (E2E testing)
- [x] Configure vitest.config.ts
- [x] Set up test directory structure (tests/unit, tests/integration, tests/e2e)
- [x] Create first test (sanity check)
- [x] Configure test coverage reporting

### 1.4 Core Types
- [x] Create src/core/types.ts
  - [x] Dim type (px | % strings)
  - [x] Orientation type (horizontal | vertical)
  - [x] Size interface
  - [x] Position interface
  - [x] Component options base interface
- [x] Write tests for types (type checking)

### 1.5 Base Component Class
- [x] Create src/core/Component.ts
  - [x] Base class with lifecycle hooks
  - [x] mount() hook
  - [x] update() hook
  - [x] unmount() hook
  - [x] Basic event handling
- [x] Write tests for Component lifecycle
- [x] Write tests for Component event handling

### 1.6 Event Emitter
- [x] Create src/core/EventEmitter.ts
  - [x] on() method
  - [x] off() method
  - [x] emit() method
  - [x] once() method
  - [x] Typed events
- [x] Write tests for EventEmitter
  - [x] Test subscribe/emit
  - [x] Test unsubscribe
  - [x] Test once()
  - [x] Test typed events

### 1.7 Dimension Utilities
- [x] Create src/utils/dimensions.ts
  - [x] parseDim() - parse "100px" or "50%"
  - [x] isPx() - check if string is px
  - [x] isPercent() - check if string is percent
  - [x] pxToNumber() - extract number from px
  - [x] percentToNumber() - extract number from percent
  - [x] normalizeDim() - normalize to consistent format
- [x] Write tests for ALL dimension functions
  - [x] Test parseDim with px
  - [x] Test parseDim with %
  - [x] Test parseDim with invalid input
  - [x] Test isPx
  - [x] Test isPercent
  - [x] Test pxToNumber
  - [x] Test percentToNumber
  - [x] Test normalizeDim

### 1.8 DOM Utilities
- [x] Create src/utils/dom.ts
  - [x] createElement() - safe element creation
  - [x] setStyles() - apply styles object
  - [x] getStyles() - read computed styles
  - [x] addClass() - add CSS class
  - [x] removeClass() - remove CSS class
  - [x] hasClass() - check for class
  - [x] setAttrs() - set multiple attributes
  - [x] getBounds() - get element bounds
- [x] Write tests for ALL DOM functions

### 1.9 Phase 1 Review
- [x] All tests passing (82/82)
- [x] Coverage > 90% (90.6%)
- [x] Build produces correct output
- [x] TypeScript compiles without errors
- [x] Lint passes
- [x] Documentation for Phase 1 APIs

---

## Phase 2: Core Layout (Week 3-4)

### 2.1 Layout Component (DisplayGroup replacement)
- [x] Create src/components/Layout.ts
  - [x] Options interface (orientation, margin, gap, children)
  - [x] Flexbox container creation
  - [x] Horizontal layout support
  - [x] Vertical layout support
  - [x] Margin/gap handling
  - [x] Child component management
- [x] Write tests for Layout
  - [x] Test horizontal layout
  - [x] Test vertical layout
  - [x] Test margin/gap
  - [x] Test child addition
  - [x] Test child removal
  - [x] Test re-render on change

### 2.2 Panel Component (DisplayCell replacement)
- [x] Create src/components/Panel.ts
  - [x] Options interface (dim, minSize, maxSize, content, children)
  - [x] Dimension handling (px, %, auto)
  - [x] Min/max size constraints
  - [x] Content rendering
  - [x] Child component support
- [x] Write tests for Panel
  - [x] Test fixed px dimension
  - [x] Test percentage dimension
  - [x] Test minSize constraint
  - [x] Test maxSize constraint
  - [x] Test content rendering
  - [x] Test child panels

### 2.3 Divider Component (DragBar replacement)
- [x] Create src/components/Divider.ts
  - [x] Options interface (size, minSize, maxSize, onResize)
  - [x] Visual divider rendering
  - [x] Pointer event handling (drag)
  - [x] Resize callback
  - [x] Orientation detection
- [x] Write tests for Divider
  - [x] Test divider rendering
  - [x] Test drag start
  - [x] Test drag move
  - [x] Test drag end
  - [x] Test minSize enforcement
  - [x] Test maxSize enforcement
  - [x] Test onResize callback

### 2.4 Resize Observer Integration
- [ ] Create src/utils/resize-observer.ts
- [ ] Integrate with Panel component
- [ ] Write tests for ResizeObserver utils

### 2.5 Layout Engine
- [x] Create src/core/LayoutEngine.ts
  - [x] calculateFlexValues() - distribute space
  - [x] applyConstraints() - enforce min/max
  - [x] resolveDimensions() - convert % to px
- [x] Write tests for LayoutEngine
  - [x] Test flex value calculation
  - [x] Test constraint application
  - [x] Test dimension resolution

### 2.6 Basic Examples
- [ ] Create examples/basic-layout.html
- [ ] Create examples/resizable-panels.html
- [ ] Create examples/mixed-dimensions.html

### 2.7 Phase 2 Review
- [x] All tests passing (192/192)
- [x] Coverage > 90% (90.87%)
- [ ] Examples work correctly
- [ ] Documentation for Phase 2 APIs
- [ ] Performance check (no layout thrashing)

---

## Phase 3: Advanced Components (Week 5-6)

### 3.1 Modal Component
- [ ] Create src/components/Modal.ts
  - [ ] Options interface (title, content, draggable, resizable, onClose)
  - [ ] Modal overlay
  - [ ] Modal container
  - [ ] Drag handling
  - [ ] Resize handling (optional)
  - [ ] Close button
  - [ ] show() / hide() methods
- [ ] Write tests for Modal
  - [ ] Test modal creation
  - [ ] Test show/hide
  - [ ] Test drag functionality
  - [ ] Test resize functionality
  - [ ] Test close callback
  - [ ] Test keyboard escape

### 3.2 Tabs Component (Pages replacement)
- [ ] Create src/components/Tabs.ts
  - [ ] Options interface (tabs, activeTab, onChange)
  - [ ] Tab bar rendering
  - [ ] Tab panel rendering
  - [ ] Active tab tracking
  - [ ] Change callback
- [ ] Write tests for Tabs
  - [ ] Test tab creation
  - [ ] Test tab switching
  - [ ] Test onChange callback
  - [ ] Test keyboard navigation

### 3.3 Menu Component (Context replacement)
- [ ] Create src/components/Menu.ts
  - [ ] Options interface (items, position, onClose)
  - [ ] Menu item rendering
  - [ ] Submenu support
  - [ ] Position calculation
  - [ ] Click outside detection
  - [ ] Keyboard navigation
- [ ] Write tests for Menu
  - [ ] Test menu rendering
  - [ ] Test submenu rendering
  - [ ] Test position calculation
  - [ ] Test click outside
  - [ ] Test keyboard navigation
  - [ ] Test item selection

### 3.4 Tree Component
- [ ] Create src/components/Tree.ts
  - [ ] Options interface (nodes, expanded, onSelect, onExpand)
  - [ ] TreeNode interface
  - [ ] Recursive node rendering
  - [ ] Expand/collapse handling
  - [ ] Selection handling
  - [ ] Indentation
- [ ] Write tests for Tree
  - [ ] Test tree rendering
  - [ ] Test expand/collapse
  - [ ] Test node selection
  - [ ] Test nested nodes
  - [ ] Test keyboard navigation

### 3.5 Scrollbar Component
- [ ] Create src/components/Scrollbar.ts
  - [ ] Options interface (orientation, onScroll)
  - [ ] Scrollbar track
  - [ ] Scrollbar thumb
  - [ ] Scroll handling
  - [ ] Auto-hide when not needed
- [ ] Write tests for Scrollbar
  - [ ] Test scrollbar rendering
  - [ ] Test thumb dragging
  - [ ] Test scroll callback
  - [ ] Test auto-hide

### 3.6 Phase 3 Review
- [ ] All tests passing
- [ ] Coverage > 90%
- [ ] All components documented
- [ ] Examples updated with new components

---

## Phase 4: Polish (Week 7-8)

### 4.1 Animations
- [ ] Add CSS transitions for resize
- [ ] Add spring animations for modals
- [ ] Add collapse/expand animations for Tree
- [ ] Create src/utils/animation.ts
- [ ] Write tests for animations

### 4.2 Touch Support
- [ ] Replace mouse events with pointer events
- [ ] Add touch gesture support
- [ ] Test on mobile devices
- [ ] Add touch-friendly hit targets

### 4.3 Accessibility
- [ ] Add ARIA labels to all components
- [ ] Implement keyboard navigation
- [ ] Add focus management
- [ ] Test with screen readers
- [ ] Create accessibility documentation

### 4.4 Themes
- [ ] Create CSS custom properties
- [ ] Add default theme
- [ ] Add dark theme
- [ ] Create theme switching API
- [ ] Document theming

### 4.5 Documentation
- [ ] Set up TypeDoc for API docs
- [ ] Create interactive examples
- [ ] Write migration guide from v3
- [ ] Create getting started guide
- [ ] Add component galleries

### 4.6 Phase 4 Review
- [ ] All features complete
- [ ] All tests passing
- [ ] Documentation complete
- [ ] Accessibility audit passed

---

## Phase 5: Framework Integration (Week 9-10)

### 5.1 React Bindings
- [ ] Create React components
- [ ] Create useLayout hook
- [ ] Create useResizable hook
- [ ] Write React tests
- [ ] Create React examples

### 5.2 Vue Bindings
- [ ] Create Vue components
- [ ] Create composables
- [ ] Write Vue tests
- [ ] Create Vue examples

### 5.3 Angular Bindings
- [ ] Create Angular module
- [ ] Create Angular components
- [ ] Write Angular tests
- [ ] Create Angular examples

### 5.4 Svelte Bindings
- [ ] Create Svelte components
- [ ] Write Svelte tests
- [ ] Create Svelte examples

### 5.5 Phase 5 Review
- [ ] All framework bindings complete
- [ ] All tests passing
- [ ] Framework-specific docs complete

---

## Phase 6: Release (Week 11-12)

### 6.1 Beta Testing
- [ ] Release beta version to npm
- [ ] Gather feedback from users
- [ ] Fix reported bugs
- [ ] Update documentation based on feedback

### 6.2 Performance Optimization
- [ ] Profile bundle size
- [ ] Optimize tree shaking
- [ ] Profile runtime performance
- [ ] Fix performance bottlenecks

### 6.3 Final Documentation
- [ ] Complete API reference
- [ ] Finalize migration guide
- [ ] Create FAQ
- [ ] Add troubleshooting guide

### 6.4 Release
- [ ] Final code review
- [ ] Update CHANGELOG.md
- [ ] Create release notes
- [ ] Publish v4.0.0 to npm
- [ ] Announce release

### 6.5 Post-Release
- [ ] Monitor for bugs
- [ ] Respond to issues
- [ ] Plan v4.1.0 features

---

## Notes

- **Test Requirement**: Every function MUST have matching test(s)
- **Coverage Goal**: > 90% for all phases
- **TypeScript**: Strict mode, no `any` types
- **Accessibility**: Required from Phase 4, considered in all phases

---

**Last Updated**: 2026-02-28
**Current Phase**: Phase 1 ✅ COMPLETE - 90.6% coverage, 82 tests passing
**Next Phase**: Phase 2 - Core Layout (Layout, Panel, Divider)
