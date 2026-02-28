# TODO - Liefs Layout Manager v4.0.0 Rewrite

**Status Tracking**: ✅ Complete | 🔄 In Progress | ⏳ Pending | ❌ Blocked

---

## Phase 1: Foundation (Week 1-2)

### 1.1 Project Setup
- [x] Create intent.md architecture document
- [x] Create QWEN.md memory file
- [x] Create todo.md task tracking
- [ ] Initialize git repository
- [ ] Create package.json with modern config
- [ ] Set up TypeScript (strict mode, tsconfig.json)
- [ ] Configure ESLint + Prettier
- [ ] Set up .gitignore

### 1.2 Build System
- [ ] Install Vite for dev server + build
- [ ] Configure Rollup for library bundling
- [ ] Set up multiple entry points (core, components, full)
- [ ] Configure sourcemaps
- [ ] Add build scripts to package.json

### 1.3 Testing Infrastructure
- [ ] Install Vitest (unit test framework)
- [ ] Install @testing-library/dom (DOM testing)
- [ ] Install Playwright (E2E testing)
- [ ] Configure vitest.config.ts
- [ ] Set up test directory structure (tests/unit, tests/integration, tests/e2e)
- [ ] Create first test (sanity check)
- [ ] Configure test coverage reporting

### 1.4 Core Types
- [ ] Create src/core/types.ts
  - [ ] Dim type (px | % strings)
  - [ ] Orientation type (horizontal | vertical)
  - [ ] Size interface
  - [ ] Position interface
  - [ ] Component options base interface
- [ ] Write tests for types (type checking)

### 1.5 Base Component Class
- [ ] Create src/core/Component.ts
  - [ ] Base class with lifecycle hooks
  - [ ] mount() hook
  - [ ] update() hook
  - [ ] unmount() hook
  - [ ] Basic event handling
- [ ] Write tests for Component lifecycle
- [ ] Write tests for Component event handling

### 1.6 Event Emitter
- [ ] Create src/core/EventEmitter.ts
  - [ ] on() method
  - [ ] off() method
  - [ ] emit() method
  - [ ] once() method
  - [ ] Typed events
- [ ] Write tests for EventEmitter
  - [ ] Test subscribe/emit
  - [ ] Test unsubscribe
  - [ ] Test once()
  - [ ] Test typed events

### 1.7 Dimension Utilities
- [ ] Create src/utils/dimensions.ts
  - [ ] parseDim() - parse "100px" or "50%"
  - [ ] isPx() - check if string is px
  - [ ] isPercent() - check if string is percent
  - [ ] pxToNumber() - extract number from px
  - [ ] percentToNumber() - extract number from percent
  - [ ] normalizeDim() - normalize to consistent format
- [ ] Write tests for ALL dimension functions
  - [ ] Test parseDim with px
  - [ ] Test parseDim with %
  - [ ] Test parseDim with invalid input
  - [ ] Test isPx
  - [ ] Test isPercent
  - [ ] Test pxToNumber
  - [ ] Test percentToNumber
  - [ ] Test normalizeDim

### 1.8 DOM Utilities
- [ ] Create src/utils/dom.ts
  - [ ] createElement() - safe element creation
  - [ ] setStyles() - apply styles object
  - [ ] getStyles() - read computed styles
  - [ ] addClass() - add CSS class
  - [ ] removeClass() - remove CSS class
  - [ ] hasClass() - check for class
  - [ ] setAttrs() - set multiple attributes
  - [ ] getBounds() - get element bounds
- [ ] Write tests for ALL DOM functions

### 1.9 Phase 1 Review
- [ ] All tests passing
- [ ] Coverage > 90%
- [ ] Build produces correct output
- [ ] TypeScript compiles without errors
- [ ] Lint passes
- [ ] Documentation for Phase 1 APIs

---

## Phase 2: Core Layout (Week 3-4)

### 2.1 Layout Component (DisplayGroup replacement)
- [ ] Create src/components/Layout.ts
  - [ ] Options interface (orientation, margin, gap, children)
  - [ ] Flexbox container creation
  - [ ] Horizontal layout support
  - [ ] Vertical layout support
  - [ ] Margin/gap handling
  - [ ] Child component management
- [ ] Write tests for Layout
  - [ ] Test horizontal layout
  - [ ] Test vertical layout
  - [ ] Test margin/gap
  - [ ] Test child addition
  - [ ] Test child removal
  - [ ] Test re-render on change

### 2.2 Panel Component (DisplayCell replacement)
- [ ] Create src/components/Panel.ts
  - [ ] Options interface (dim, minSize, maxSize, content, children)
  - [ ] Dimension handling (px, %, auto)
  - [ ] Min/max size constraints
  - [ ] Content rendering
  - [ ] Child component support
- [ ] Write tests for Panel
  - [ ] Test fixed px dimension
  - [ ] Test percentage dimension
  - [ ] Test minSize constraint
  - [ ] Test maxSize constraint
  - [ ] Test content rendering
  - [ ] Test child panels

### 2.3 Divider Component (DragBar replacement)
- [ ] Create src/components/Divider.ts
  - [ ] Options interface (size, minSize, maxSize, onResize)
  - [ ] Visual divider rendering
  - [ ] Pointer event handling (drag)
  - [ ] Resize callback
  - [ ] Orientation detection
- [ ] Write tests for Divider
  - [ ] Test divider rendering
  - [ ] Test drag start
  - [ ] Test drag move
  - [ ] Test drag end
  - [ ] Test minSize enforcement
  - [ ] Test maxSize enforcement
  - [ ] Test onResize callback

### 2.4 Resize Observer Integration
- [ ] Create src/utils/resize-observer.ts
  - [ ] observeElement() - watch for size changes
  - [ ] unobserveElement() - stop watching
  - [ ] ResizeCallback type
- [ ] Integrate with Panel component
- [ ] Write tests for ResizeObserver utils

### 2.5 Layout Engine
- [ ] Create src/core/LayoutEngine.ts
  - [ ] calculateFlexValues() - distribute space
  - [ ] applyConstraints() - enforce min/max
  - [ ] resolveDimensions() - convert % to px
- [ ] Write tests for LayoutEngine
  - [ ] Test flex value calculation
  - [ ] Test constraint application
  - [ ] Test dimension resolution

### 2.6 Basic Examples
- [ ] Create examples/basic-layout.html
  - [ ] Simple horizontal layout
  - [ ] Simple vertical layout
- [ ] Create examples/resizable-panels.html
  - [ ] Two panels with divider
  - [ ] Three panels with two dividers
- [ ] Create examples/mixed-dimensions.html
  - [ ] Mix of px and % dimensions
- [ ] Test all examples manually

### 2.7 Phase 2 Review
- [ ] All tests passing
- [ ] Coverage > 90%
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
**Current Phase**: Phase 1 (Pending Start)
