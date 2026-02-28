# Liefs Layout Manager v4.0.0

> **Status**: 🌱 Just Started - Foundation Phase

**Complete rewrite of the original liefs-layout-manager (v3.0.0, 2017-2021)**

---

## What This Is

A modern **dynamic layout management framework** for web applications - being rebuilt from the ground up with:

- ✅ **Flexbox-based** layouts (not absolute positioning)
- ✅ **TypeScript first** (strict mode, full types)
- ✅ **Test-driven** (every function has tests)
- ✅ **Modern API** (named parameters, not argument sorting)
- ✅ **Framework agnostic** (vanilla JS core + React/Vue/Angular bindings)
- ✅ **Accessible** (ARIA, keyboard navigation)
- ✅ **Touch support** (pointer events, mobile-friendly)

---

## Original Project (v3.0.0)

The original `liefs-layout-manager` was published to npm in 2017 by Stacy Lief Kelly:
- 📦 https://www.npmjs.com/package/liefs-layout-manager
- ⭐ Dynamic layouts with resizable panels, modals, trees, context menus
- 📏 Mixed dimension system (px + %)
- 🧹 Clean DOM management (only render visible elements)

**What didn't work**:
- Confusing API (arguments sorted by type, not named)
- Manual coordinate calculations
- No tests
- No touch/accessibility support
- Global state everywhere

---

## Rewrite Goals (v4.0.0)

| Aspect | v3 (Old) | v4 (New) |
|--------|----------|----------|
| **Layout** | Absolute positioning | CSS Flexbox/Grid |
| **API** | Positional args by type | Named parameters/options objects |
| **Language** | JavaScript/TypeScript hybrid | TypeScript strict mode |
| **Testing** | None | Full test coverage (Vitest + Playwright) |
| **Events** | Custom stacking system | Standard DOM events |
| **Accessibility** | None | ARIA labels, keyboard nav |
| **Touch** | Mouse events only | Pointer events |
| **State** | Global static objects | Proper state management |

---

## Planned Components

```
Layout (DisplayGroup replacement)  - Flexbox containers
Panel (DisplayCell replacement)    - Content panels with dimensions
Divider (DragBar replacement)      - Resizable dividers
Modal                              - Draggable dialogs
Tabs (Pages replacement)           - Tab/swipe system
Menu (Context replacement)         - Context menus with submenus
Tree                               - Expandable tree views
Scrollbar                          - Custom scrollbars
```

---

## Project Structure (Planned)

```
liefs-layout-manager/
├── src/
│   ├── core/           # Foundation (Component, EventEmitter, types)
│   ├── components/     # Panel, Layout, Divider, Modal, etc.
│   ├── utils/          # Dimension parsing, DOM helpers
│   └── index.ts        # Public exports
├── tests/              # ALL tests - matched to functions
├── docs/               # Documentation with viewer
├── examples/           # Working demos
├── intent.md           # Complete architecture document
├── todo.md             # Phased task tracking
└── QWEN.md             # Project memory
```

---

## Implementation Phases

| Phase | Status | Focus |
|-------|--------|-------|
| **Phase 1** | ⏳ Pending | Foundation (TypeScript, build, tests) |
| **Phase 2** | ⏳ Pending | Core Layout (Layout, Panel, Divider) |
| **Phase 3** | ⏳ Pending | Advanced Components (Modal, Tabs, Menu, Tree, Scrollbar) |
| **Phase 4** | ⏳ Pending | Polish (animations, touch, a11y, themes) |
| **Phase 5** | ⏳ Pending | Framework bindings (React, Vue, Angular) |
| **Phase 6** | ⏳ Pending | Release (beta, optimize, docs, v4.0.0) |

**See `todo.md` for detailed task breakdown.**

---

## Documentation

Open `docs/index.html` in your browser to view:
- `intent.md` - Complete architecture document (original analysis + rewrite plan)
- Future component docs with generated images

**Image Generation**: Uses ComfyUI (192.168.1.100:8188) for concept illustrations.
See `docs/ImageGen_For_Qwen.json` and `QWEN.md` for details.

---

## Links

- **GitHub**: https://github.com/electriclief/liefs-layout-manager-byqwen
- **Original npm**: https://www.npmjs.com/package/liefs-layout-manager
- **Original Docs**: https://leafdriving.github.io/liefs-layout-manager-3.0.0/Manual/Manual.html

---

## License

ISC (same as original v3.0.0)

**Author**: Stacy Lief Kelly  
**Rewrite Started**: 2026-02-28

---

> 🚧 **This is a work in progress.** No npm package available yet.
> Check back after Phase 6 for v4.0.0 release!
