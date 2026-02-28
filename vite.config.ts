import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
      entryRoot: 'src',
      outDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LiefsLayoutManager',
      fileName: 'liefs-layout-manager',
      formats: ['es', 'umd'],
    },
    sourcemap: true,
    // Minification optional - requires terser package
    // minify: 'terser',
    rollupOptions: {
      output: {
        globals: {
          // No external dependencies
        },
        // Fix for named+default exports warning
        exports: 'named',
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/unit/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules', 'dist', 'tests'],
      thresholds: {
        global: {
          statements: 90,
          branches: 90,
          functions: 90,
          lines: 90,
        },
      },
    },
    // Mock ResizeObserver for tests
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    // Add extensions for resolution
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  // Handle TypeScript path resolution
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        useDefineForClassFields: false,
      },
    },
  },
});
