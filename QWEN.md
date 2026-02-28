# QWEN.md - Project Memory

## Project: liefs-layout-manager v4.0.0 (Complete Rewrite)

**Started**: 2026-02-28  
**User**: Stacy Lief Kelly (Lief / Sigma One)  
**GitHub**: https://github.com/electriclief/liefs-layout-manager  
**Original npm**: https://www.npmjs.com/package/liefs-layout-manager

---

## Context

Lief created the original `liefs-layout-manager` v3.0.0 five years ago (2017-2021 era). It was a coordinate-based dynamic layout manager with:
- Absolute positioning system
- Custom argument sorting by type
- Components: DisplayCell, DisplayGroup, DragBar, Pages, ScrollBar, Modal, Context, Tree, Selected
- Clean DOM management

**Problem**: The original was written while still learning. It has:
- Confusing API (positional arguments sorted by type)
- Manual coordinate calculations
- No tests
- No touch/accessibility support
- Global state everywhere
- Inefficient full re-renders

**Goal**: Complete modern rewrite using Flexbox, proper TypeScript, test-driven development, and modern best practices.

---

## What I Asked Qwen To Do

1. **Familiarize** with the original package (extracted from npm)
2. **Create intent.md** - Complete architecture document capturing original intent + rewrite plan
3. **Create this QWEN.md** - Project memory for continuity
4. **Create todo.md** - Phased task tree for tracking progress
5. **Initialize git repository**
6. **Execute the rewrite** following the phases in todo.md

---

## Key Principles to Remember

### Development Workflow
- **Test-Driven**: Every function should have matching test(s) in `tests/`
- **TypeScript First**: Strict mode, no `any` types
- **Flexbox-Based**: Use CSS Flexbox/Grid instead of absolute positioning
- **Modern API**: Named parameters/options objects, not positional argument sorting
- **Documentation**: Auto-generate docs, include interactive examples

### Architecture Decisions
- **Modular**: Break into small, digestible components
- **Framework Agnostic**: Core in vanilla TS, then add React/Vue/Angular bindings
- **Accessible**: ARIA labels, keyboard navigation from day one
- **Touch Support**: Pointer events, not mouse events
- **Performance**: RequestAnimationFrame, memoization, virtual rendering for large trees

### What to Preserve from v3
- Clean DOM philosophy (only render visible)
- Mixed dimension system (px + %)
- Component hierarchy concept
- Modal/drag behavior
- Context menu nesting

### What to Eliminate from v3
- Argument sorting system (use options objects)
- Absolute positioning (use Flexbox)
- Global state (use proper state management)
- Full re-renders (use incremental rendering)
- No tests (full test coverage required)

---

## Project Structure (Planned)

```
liefs-layout-manager/
├── src/
│   ├── core/           # Foundation (Component, EventEmitter, types)
│   ├── components/     # Panel, Layout, Divider, Modal, Tabs, Menu, Tree, Scrollbar
│   ├── utils/          # dimension parsing, DOM helpers
│   └── index.ts        # Public exports
├── tests/              # ALL tests - matched to functions
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── examples/           # Working demos
├── docs/               # Documentation
├── intent.md           # Architecture & intent document
├── todo.md             # Phase tracking
└── QWEN.md             # This memory file
```

---

## Phase Status

See `todo.md` for detailed breakdown. Summary:

| Phase | Status | Focus |
|-------|--------|-------|
| Phase 1 | ✅ Complete | Foundation (TypeScript, build, tests) - 90.6% coverage, 82 tests |
| Phase 2 | ⏳ Pending | Core Layout (Layout, Panel, Divider) |
| Phase 3 | ⏳ Pending | Advanced Components (Modal, Tabs, Menu, Tree, Scrollbar) |
| Phase 4 | ⏳ Pending | Polish (animations, touch, a11y, themes) |
| Phase 5 | ⏳ Pending | Framework bindings (React, Vue, Angular) |
| Phase 6 | ⏳ Pending | Release (beta, optimize, docs, v4.0.0) |

---

## Commands & Workflows

### User Preferences
- **HATES background jobs**: Always run commands in foreground (`is_background: false`)
- **Talk mode**: TTS plays at END of responses (toggle with "talk on/off")
- **Documentation**: Use ComfyUI (192.168.1.100:8188) to generate images for docs
- **Testing**: Every function must have matching test(s)

### Development Commands (once set up)
```bash
# Install
npm install

# Test (all)
npm test

# Test (watch)
npm run test:watch

# Build
npm run build

# Lint
npm run lint

# Examples dev server
npm run dev
```

---

## Important Files

| File | Purpose |
|------|---------|
| `intent.md` | Complete architecture document - original + rewrite plan |
| `todo.md` | Phased task tree for progress tracking |
| `QWEN.md` | This memory file - context for AI continuity |
| `README.md` | User-facing documentation (to be created) |
| `CHANGELOG.md` | Version history (to be created) |
| `docs/` | Documentation directory with viewer |
| `docs/index.html` | Markdown documentation viewer (open in browser) |
| `docs/ImageGen_For_Qwen.json` | ComfyUI workflow for generating doc images |

---

## Documentation Image Generation

**File**: `docs/ImageGen_For_Qwen.json`

**Purpose**: ComfyUI workflow JSON for generating illustrative images for documentation

**Configuration**:
- **ComfyUI API**: `192.168.1.100:8188`
- **Image Size**: 640x512 (adjust width/height in JSON nodes 68)
- **Model**: z-image-turbo-Q3_K_M.gguf (fast image generation)
- **CLIP**: Qwen_3_4b-Q8_0.gguf (stable_diffusion type)
- **VAE**: ae.safetensors
- **Steps**: 4 (fast, low step count for speed)
- **Sampler**: res_multistep
- **CFG**: 1 (minimal guidance for creative freedom)

**Usage**:
1. Open docs `.md` files that need visual explanations
2. Create image prompt based on concept (e.g., "flexbox layout diagram horizontal panels")
3. POST JSON to ComfyUI API with updated prompt in node 58
4. Download generated image to `docs/images/`
5. Reference in markdown: `![Description](images/filename.png)`

**Example Prompts for This Project**:
- "modern flexbox layout horizontal panels with resize handles"
- "collapsible tree view file explorer dark theme"
- "modal dialog window with close button and title bar"
- "context menu right-click nested submenus"
- "tab interface multiple panels switching"
- "resizable divider between two content panels"

---

## Documentation Requirements

### Test Documentation (docs/tests.md)

**Lief prefers a comprehensive test index at `docs/tests.md`** that lists all tested functions with this format:

```
## Test File: [filename.test.ts]
_Brief description of what this test file covers_

### Function: functionName()
- test description
  - `testFunctionName()` - Why this test exists (one line)
```

**Update this file at the end of each phase** to reflect newly added tests.

---

## End-of-Phase Workflow

**When completing any phase, Qwen MUST**:

1. **Verify All Tests Pass**
   ```bash
   npm test
   ```
   - All tests must pass
   - No errors or warnings

2. **Verify Coverage > 90%**
   ```bash
   npm run test:coverage
   ```
   - Check coverage report
   - Ensure all files meet 90% threshold

3. **Update todo.md**
   - Mark all completed tasks with `[x]`
   - Update phase status table
   - Update "Last Updated" date

4. **Git Stage & Commit**
   ```bash
   git add -A
   git commit -m "Phase XX Completed - All tests Passed - Sincerly QWEN"
   ```

5. **Push to GitHub**
   ```bash
   git push
   ```

6. **Update QWEN.md**
   - Update phase status table
   - Update "Last Updated" date
   - Add any new learnings or notes

---

## When Resuming After Break

1. Read `todo.md` to see current phase and next action
2. Check git status for any uncommitted work
3. Continue from where we left off - phases are independent

---

## Contact / Links

- **User**: Stacy Lief Kelly (Lief / Sigma One)
- **Email**: electriclief@gmail.com
- **GitHub**: https://github.com/electriclief
- **Original Package**: https://www.npmjs.com/package/liefs-layout-manager
- **Original Docs**: https://leafdriving.github.io/liefs-layout-manager-3.0.0/Manual/Manual.html

---

**Last Updated**: 2026-02-28
**Version**: 4.0.0-dev.0
**Phase 1 Status**: ✅ COMPLETE - 90.6% coverage, 82 tests passing
