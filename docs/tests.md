# Test Documentation - Phase 1 & 2

**Coverage**: 90.87% | **Tests**: 192 passing | **Files**: 8 test files

---

## Phase 2: Core Layout Components

### Test File: Layout.test.ts
_Flexbox container for horizontal or vertical layouts with gap and padding support_

### Function: constructor()
_Create a new Layout component with options_
- should create layout with default options
  - `it('should create layout with default options')` - Verify default values (horizontal, gap: 0, padding: 0)
- should create layout with custom gap
  - `it('should create layout with custom gap')` - Support custom gap between children
- should create layout with custom padding
  - `it('should create layout with custom padding')` - Support custom padding
- should create layout with vertical orientation
  - `it('should create layout with vertical orientation')` - Support vertical layout

### Function: mount()
_Mount layout to DOM container_
- should create flexbox element on mount
  - `it('should create flexbox element on mount')` - Create flex container element
- should apply gap style on mount
  - `it('should apply gap style on mount')` - Apply gap CSS property
- should apply padding style on mount
  - `it('should apply padding style on mount')` - Apply padding CSS property
- should mount children on mount
  - `it('should mount children on mount')` - Mount all child components
- should set isMounted to true
  - `it('should set isMounted to true')` - Track mount state

### Function: update()
_Update layout properties dynamically_
- should update orientation
  - `it('should update orientation')` - Switch between horizontal/vertical
- should update gap
  - `it('should update gap')` - Change gap dynamically
- should update padding
  - `it('should update padding')` - Change padding dynamically

### Function: addChild()
_Add child component to layout_
- should add child to children array
  - `it('should add child to children array')` - Basic child addition
- should set child parent
  - `it('should set child parent')` - Establish parent reference
- should mount child if already mounted
  - `it('should mount child if already mounted')` - Immediate mount for mounted layouts
- should insert at specific index
  - `it('should insert at specific index')` - Support ordered insertion

### Function: removeChild()
_Remove child component from layout_
- should remove child from children array
  - `it('should remove child from children array')` - Basic child removal
- should unmount child when removed
  - `it('should unmount child when removed')` - Cleanup on removal

### Function: getChildElements()
_Get array of child DOM elements_
- should return array of child elements
  - `it('should return array of child elements')` - Access child DOM nodes
- should return empty array if not mounted
  - `it('should return empty array if not mounted')` - Handle unmounted state

### Function: clearChildren()
_Remove all children from layout_
- should remove all children
  - `it('should remove all children')` - Clear all children and DOM

### Function: flexDirection getter
_Get CSS flex direction string_
- should return "row" for horizontal orientation
  - `it('should return "row" for horizontal orientation')` - Map to CSS value
- should return "column" for vertical orientation
  - `it('should return "column" for vertical orientation')` - Map to CSS value

---

### Test File: Panel.test.ts
_Content panel with flexible dimension support (px, %, fill)_

### Function: constructor()
_Create a new Panel component with options_
- should create panel with default options
  - `it('should create panel with default options')` - Verify defaults
- should create panel with dim option
  - `it('should create panel with dim option')` - Support dimension string
- should create panel with fill option
  - `it('should create panel with fill option')` - Support fill remaining space
- should create panel with content option
  - `it('should create panel with content option')` - Support initial content
- should create panel with minSize option
  - `it('should create panel with minSize option')` - Support minimum size
- should create panel with maxSize option
  - `it('should create panel with maxSize option')` - Support maximum size

### Function: mount()
_Mount panel to DOM container_
- should create element on mount
  - `it('should create element on mount')` - Create panel element
- should apply flex styles on mount
  - `it('should apply flex styles on mount')` - Apply flexbox CSS
- should create content element if content provided
  - `it('should create content element if content provided')` - Create content wrapper
- should not create content element if no content
  - `it('should not create content element if no content')` - Skip content wrapper
- should mount children on mount
  - `it('should mount children on mount')` - Mount child components

### Function: update()
_Update panel properties dynamically_
- should update dim property
  - `it('should update dim property')` - Change dimension
- should update fill property
  - `it('should update fill property')` - Change fill state
- should update content
  - `it('should update content')` - Update content HTML
- should update minSize
  - `it('should update minSize')` - Update minimum constraint
- should update maxSize
  - `it('should update maxSize')` - Update maximum constraint

### Function: setContent()
_Set panel content HTML_
- should set content property
  - `it('should set content property')` - Update content property
- should update DOM if mounted
  - `it('should update DOM if mounted')` - Update live DOM
- should create content element if not exists
  - `it('should create content element if not exists')` - Create on demand

### Function: getContent()
_Get panel content HTML_
- should return content
  - `it('should return content')` - Get content string
- should return empty string if no content
  - `it('should return empty string if no content')` - Default empty

### Function: setDimension()
_Set panel dimension string_
- should set dim property
  - `it('should set dim property')` - Update dimension
- should update DOM if mounted
  - `it('should update DOM if mounted')` - Apply to live DOM

### Function: getDimension()
_Get current dimension_
- should return dim
  - `it('should return dim')` - Get dimension string
- should return undefined if no dim
  - `it('should return undefined if no dim')` - Handle undefined

### Function: applyDimensionStyles() (private)
_Apply dimension-based flex styles_
- should apply flex for fill panel
  - `it('should apply flex for fill panel')` - Fill: 1 1 auto
- should apply flex for px dimension
  - `it('should apply flex for px dimension')` - Fixed: 0 0 Npx
- should apply flex for percentage dimension
  - `it('should apply flex for percentage dimension')` - Percent: 0 0 N%
- should apply minSize constraint
  - `it('should apply minSize constraint')` - minWidth CSS
- should apply maxSize constraint
  - `it('should apply maxSize constraint')` - maxWidth CSS

---

### Test File: Divider.test.ts
_Resizable divider with pointer event handling for drag-to-resize_

### Function: constructor()
_Create a new Divider component with options_
- should create divider with default options
  - `it('should create divider with default options')` - Default size 5px
- should create divider with custom size
  - `it('should create divider with custom size')` - Custom width
- should create divider with minSize
  - `it('should create divider with minSize')` - Minimum constraint
- should create divider with maxSize
  - `it('should create divider with maxSize')` - Maximum constraint
- should create divider with onResizeStart callback
  - `it('should create divider with onResizeStart callback')` - Start callback
- should create divider with onResize callback
  - `it('should create divider with onResize callback')` - Drag callback
- should create divider with onResizeEnd callback
  - `it('should create divider with onResizeEnd callback')` - End callback

### Function: mount()
_Mount divider to DOM container_
- should create divider element on mount
  - `it('should create divider element on mount')` - Create element
- should apply size style on mount
  - `it('should apply size style on mount')` - Apply width/flex
- should apply default background color
  - `it('should apply default background color')` - Gray background
- should apply resize cursor
  - `it('should apply resize cursor')` - ew-resize cursor
- should add pointerdown event listener
  - `it('should add pointerdown event listener')` - Start drag on click

### Function: update()
_Update divider properties_
- should update size
  - `it('should update size')` - Change width dynamically
- should update minSize
  - `it('should update minSize')` - Update minimum constraint
- should update maxSize
  - `it('should update maxSize')` - Update maximum constraint

### Function: setSize()
_Set divider size in pixels_
- should set size property
  - `it('should set size property')` - Update size value
- should update DOM if mounted
  - `it('should update DOM if mounted')` - Apply to live DOM

### Function: getSize()
_Get current divider size_
- should return size
  - `it('should return size')` - Get size value

### Function: isDraggingNow()
_Check if divider is currently being dragged_
- should return false initially
  - `it('should return false initially')` - Not dragging initially
- should return true during drag
  - `it('should return true during drag')` - Set during pointerdown

### Function: constrainSize() (private)
_Constrain size to min/max bounds_
- should constrain to minSize
  - `it('should constrain to minSize')` - Enforce minimum
- should constrain to maxSize
  - `it('should constrain to maxSize')` - Enforce maximum
- should respect both min and max
  - `it('should respect both min and max')` - Both constraints
- should return size if no constraints
  - `it('should return size if no constraints')` - No limits

### Function: hover effects
_Visual feedback on mouse hover_
- should change background on mouseenter
  - `it('should change background on mouseenter')` - Darker on hover
- should restore background on mouseleave
  - `it('should restore background on mouseleave')` - Restore on leave

### Function: resize callbacks
_Callback execution during resize operations_
- should call onResizeStart on pointerdown
  - `it('should call onResizeStart on pointerdown')` - Notify start
- should call onResize during drag
  - `it('should call onResize during drag')` - Notify during drag
- should call onResizeEnd on pointerup
  - `it('should call onResizeEnd on pointerup')` - Notify end

---

### Test File: LayoutEngine.test.ts
_Utility functions for flexbox calculations and dimension resolution_

### Function: calculateFlexValues()
_Calculate flex values for dimension array_
- should return flex values for px dimensions
  - `it('should return flex values for px dimensions')` - Fixed: 0 0 Npx
- should return flex values for percentage dimensions
  - `it('should return flex values for percentage dimensions')` - Percent: 0 0 N%
- should return auto for undefined dimensions
  - `it('should return auto for undefined dimensions')` - Flexible: 1 1 auto
- should handle mixed dimensions
  - `it('should handle mixed dimensions')` - Mixed types

### Function: applyConstraints()
_Apply min/max constraints to size_
- should return size if within constraints
  - `it('should return size if within constraints')` - No change needed
- should apply minSize constraint
  - `it('should apply minSize constraint')` - Enforce minimum
- should apply maxSize constraint
  - `it('should apply maxSize constraint')` - Enforce maximum
- should handle only minSize
  - `it('should handle only minSize')` - Min only
- should handle only maxSize
  - `it('should handle only maxSize')` - Max only
- should handle no constraints
  - `it('should handle no constraints')` - No limits

### Function: resolveDimension()
_Convert dimension string to pixels_
- should resolve px dimension to number
  - `it('should resolve px dimension to number')` - Parse px
- should resolve percentage dimension to pixels
  - `it('should resolve percentage dimension to pixels')` - Calculate from total
- should handle decimal percentages
  - `it('should handle decimal percentages')` - Fractional percent

### Function: calculateRemainingSpace()
_Calculate space after fixed dimensions_
- should calculate remaining space after px dimensions
  - `it('should calculate remaining space after px dimensions')` - Subtract fixed
- should subtract gaps from remaining space
  - `it('should subtract gaps from remaining space')` - Account for gaps
- should handle percentage dimensions (ignore for calculation)
  - `it('should handle percentage dimensions')` - Ignore %
- should handle undefined dimensions (ignore)
  - `it('should handle undefined dimensions')` - Ignore flexible
- should return 0 if used exceeds available
  - `it('should return 0 if used exceeds available')` - No negative space
- should handle empty array
  - `it('should handle empty array')` - Full space available

### Function: distributeRemainingSpace()
_Distribute space equally among flexible items_
- should distribute space equally
  - `it('should distribute space equally')` - Equal division
- should return 0 if no flexible items
  - `it('should return 0 if no flexible items')` - Nothing to distribute
- should handle decimal results
  - `it('should handle decimal results')` - Fractional division

### Function: isFlexible()
_Check if dimension is flexible (undefined)_
- should return true for undefined
  - `it('should return true for undefined')` - Undefined is flexible
- should return false for px dimension
  - `it('should return false for px dimension')` - Fixed not flexible
- should return false for percentage dimension
  - `it('should return false for percentage dimension')` - Percent not flexible

### Function: countFlexibleItems()
_Count flexible (undefined) dimensions in array_
- should count undefined dimensions
  - `it('should count undefined dimensions')` - Count flexible
- should return 0 if no flexible items
  - `it('should return 0 if no flexible items')` - All fixed
- should return count for all flexible
  - `it('should return count for all flexible')` - All flexible

---

## Phase 1 Tests (Previous)

### Test File: EventEmitter.test.ts
_Type-safe event handling with subscribe, emit, and unsubscribe functionality_

### Function: on()
_Subscribe to an event with type-safe callback_
- should subscribe to an event
  - `it('should subscribe to an event')` - Verify basic event subscription works
- should return an unsubscribe function
  - `it('should return an unsubscribe function')` - Ensure cleanup is possible
- should allow multiple subscribers to the same event
  - `it('should allow multiple subscribers to the same event')` - Support multiple listeners

### Function: once()
_Subscribe to an event that auto-unsubscribes after first call_
- should call callback only once
  - `it('should call callback only once')` - Verify one-time subscription behavior

### Function: emit()
_Emit events to all subscribed callbacks_
- should emit an event to all subscribers
  - `it('should emit an event to all subscribers')` - Verify event delivery
- should handle errors in callbacks gracefully
  - `it('should handle errors in callbacks gracefully')` - Prevent one bad callback from breaking others
- should not throw when emitting to non-existent event
  - `it('should not throw when emitting to non-existent event')` - Safe to emit without listeners

### Function: off()
_Unsubscribe a specific callback from an event_
- should unsubscribe a specific callback
  - `it('should unsubscribe a specific callback')` - Verify targeted unsubscription

### Function: clear()
_Remove all listeners for an event or all events_
- should clear all listeners for a specific event
  - `it('should clear all listeners for a specific event')` - Event-specific cleanup
- should clear all listeners when no event specified
  - `it('should clear all listeners when no event specified')` - Global cleanup

### Function: listenerCount()
_Get the number of listeners for an event_
- should return the number of listeners for an event
  - `it('should return the number of listeners for an event')` - Introspection support
- should return 0 for non-existent event
  - `it('should return 0 for non-existent event')` - Handle missing events

---

## Test File: Component.test.ts
_Base component class with lifecycle hooks (mount, update, unmount) and child management_

### Constructor
_Create a new component with type and options_
- should create component with type
  - `it('should create component with type')` - Verify type assignment
- should generate unique ID
  - `it('should generate unique ID')` - Ensure unique identifiers
- should use provided ID
  - `it('should use provided ID')` - Support custom IDs
- should set className from options
  - `it('should set className from options')` - CSS class support
- should initialize isMounted to false
  - `it('should initialize isMounted to false')` - Correct initial state
- should initialize element to null
  - `it('should initialize element to null')` - No DOM element initially
- should initialize parent to null
  - `it('should initialize parent to null')` - No parent initially
- should initialize children to empty array
  - `it('should initialize children to empty array')` - Empty children array

### Function: mount()
_Mount component to DOM container_
- should set isMounted to true
  - `it('should set isMounted to true')` - Track mount state
- should emit mount event
  - `it('should emit mount event')` - Notify listeners of mount

### Function: update()
_Update component with new properties_
- should emit expand event (default implementation)
  - `it('should emit expand event')` - Default update behavior

### Function: unmount()
_Unmount component and cleanup resources_
- should set isMounted to false
  - `it('should set isMounted to false')` - Track unmount state
- should remove element from DOM
  - `it('should remove element from DOM')` - Cleanup DOM
- should unmount all children
  - `it('should unmount all children')` - Recursive cleanup
- should emit unmount event
  - `it('should emit unmount event')` - Notify listeners of unmount
- should clear all event listeners
  - `it('should clear all event listeners')` - Prevent memory leaks

### Function: addChild()
_Add a child component to this component_
- should add child to children array
  - `it('should add child to children array')` - Basic child addition
- should set child parent
  - `it('should set child parent')` - Establish parent reference
- should insert at specific index
  - `it('should insert at specific index')` - Support ordered children

### Function: removeChild()
_Remove a child component from this component_
- should remove child from children array
  - `it('should remove child from children array')` - Basic child removal
- should set child parent to null
  - `it('should set child parent to null')` - Clear parent reference

### Function: getChild()
_Get a child component by ID_
- should find child by ID
  - `it('should find child by ID')` - Child lookup by ID
- should return undefined for non-existent child
  - `it('should return undefined for non-existent child')` - Handle missing children

### Function: applyStyles() (protected)
_Apply CSS styles to component element_
- should apply styles to element
  - `it('should apply styles to element')` - Style application

### Function: addClass() (protected)
_Add CSS class to component element_
- should add class to element
  - `it('should add class to element')` - Class addition

### Function: removeClass() (protected)
_Remove CSS class from component element_
- should remove class from element
  - `it('should remove class from element')` - Class removal

---

## Test File: dimensions.test.ts
_Dimension string parsing and conversion utilities (px, %)_

### Function: isPx()
_Check if string is a pixel dimension_
- should return true for pixel dimensions
  - `it('should return true for pixel dimensions')` - Identify px format
- should return false for non-pixel dimensions
  - `it('should return false for non-pixel dimensions')` - Reject non-px

### Function: isPercent()
_Check if string is a percentage dimension_
- should return true for percentage dimensions
  - `it('should return true for percentage dimensions')` - Identify % format
- should return false for non-percentage dimensions
  - `it('should return false for non-percentage dimensions')` - Reject non-%

### Function: parseDim()
_Parse dimension string to structured format_
- should parse pixel dimensions correctly
  - `it('should parse pixel dimensions correctly')` - Parse px values
- should parse percentage dimensions correctly
  - `it('should parse percentage dimensions correctly')` - Parse % values
- should handle decimal values
  - `it('should handle decimal values')` - Support fractional dimensions
- should throw for invalid pixel dimension
  - `it('should throw for invalid pixel dimension')` - Validate negative/NaN px
- should throw for invalid percentage dimension
  - `it('should throw for invalid percentage dimension')` - Validate % range
- should throw for invalid format
  - `it('should throw for invalid format')` - Reject unknown formats

### Function: pxToNumber()
_Extract numeric value from pixel dimension string_
- should extract number from pixel dimension
  - `it('should extract number from pixel dimension')` - Convert px to number
- should throw for non-pixel dimension
  - `it('should throw for non-pixel dimension')` - Type safety

### Function: percentToNumber()
_Extract numeric value from percentage dimension string_
- should extract number from percentage dimension
  - `it('should extract number from percentage dimension')` - Convert % to number
- should throw for non-percentage dimension
  - `it('should throw for non-percentage dimension')` - Type safety

### Function: percentToPx()
_Convert percentage to pixels based on available space_
- should convert percentage to pixels
  - `it('should convert percentage to pixels')` - Basic % to px conversion
- should handle decimal percentages
  - `it('should handle decimal percentages')` - Fractional percentages

### Function: pxToPercent()
_Convert pixels to percentage based on available space_
- should convert pixels to percentage
  - `it('should convert pixels to percentage')` - Basic px to % conversion
- should handle decimal results
  - `it('should handle decimal results')` - Fractional percentages

### Function: normalizeDim()
_Normalize dimension to consistent pixel value_
- should normalize pixel dimension to number
  - `it('should normalize pixel dimension to number')` - Handle px input
- should normalize percentage dimension to pixels
  - `it('should normalize percentage dimension to pixels')` - Handle % input
- should return number as-is
  - `it('should return number as-is')` - Handle number input

### Function: numberToPx()
_Convert number to pixel dimension string_
- should convert number to pixel dimension string
  - `it('should convert number to pixel dimension string')` - Format as px

### Function: numberToPercent()
_Convert number to percentage dimension string_
- should convert number to percentage dimension string
  - `it('should convert number to percentage dimension string')` - Format as %

---

## Test File: dom.test.ts
_DOM manipulation utilities for safe element creation and modification_

### Function: createElement()
_Create HTML element with optional configuration_
- should create element with tag name
  - `it('should create element with tag name')` - Basic element creation
- should set id if provided
  - `it('should set id if provided')` - ID assignment
- should set className if provided
  - `it('should set className if provided')` - Class assignment
- should set styles if provided
  - `it('should set styles if provided')` - Inline styles
- should set attributes if provided
  - `it('should set attributes if provided')` - Custom attributes
- should add children if provided
  - `it('should add children if provided')` - Child elements

### Function: setStyles()
_Set multiple CSS styles on element_
- should set multiple styles
  - `it('should set multiple styles')` - Batch style application

### Function: getStyles()
_Get computed styles from element_
- should get computed styles
  - `it('should get computed styles')` - Read computed values

### Function: addClass()
_Add CSS class to element_
- should add a class to element
  - `it('should add a class to element')` - Single class addition
- should add multiple classes
  - `it('should add multiple classes')` - Multiple additions

### Function: removeClass()
_Remove CSS class from element_
- should remove a class from element
  - `it('should remove a class from element')` - Class removal

### Function: hasClass()
_Check if element has CSS class_
- should return true if element has class
  - `it('should return true if element has class')` - Class presence check
- should return false if element does not have class
  - `it('should return false if element does not have class')` - Class absence check

### Function: setAttrs()
_Set multiple HTML attributes on element_
- should set multiple attributes
  - `it('should set multiple attributes')` - Batch attribute assignment

### Function: getBounds()
_Get element bounds relative to offset parent_
- should return element bounds
  - `it('should return element bounds')` - Verify bounds properties exist (jsdom limitation)

### Function: getViewportBounds()
_Get element bounds relative to viewport_
- should return viewport-relative bounds
  - `it('should return viewport-relative bounds')` - Verify viewport properties (jsdom limitation)

### Function: removeElement()
_Remove element from DOM safely_
- should remove element from DOM
  - `it('should remove element from DOM')` - Element removal
- should handle null element
  - `it('should handle null element')` - Null safety

### Function: clearChildren()
_Remove all children from element_
- should remove all children from element
  - `it('should remove all children from element')` - Clear child nodes

### Function: setText()
_Set text content of element safely_
- should set text content
  - `it('should set text content')` - Safe text setting

### Function: setHtml()
_Set HTML content of element (use with caution)_
- should set HTML content
  - `it('should set HTML content')` - HTML insertion

---

## Summary

| File | Functions Tested | Tests | Coverage |
|------|-----------------|-------|----------|
| EventEmitter.test.ts | 7 | 12 | 98.7% |
| Component.test.ts | 14 | 26 | 99.2% |
| dimensions.test.ts | 11 | 23 | 100% |
| dom.test.ts | 13 | 21 | 100% |
| **Total** | **45** | **82** | **90.6%** |

---

**Phase**: 1 (Foundation)  
**Last Updated**: 2026-02-28  
**Next Phase**: Phase 2 - Core Layout (Layout, Panel, Divider)
