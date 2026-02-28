/**
 * Test setup - Mock browser APIs not available in jsdom
 */

// Mock ResizeObserver
class MockResizeObserver {
  callback: any;
  
  constructor(callback: any) {
    this.callback = callback;
  }
  
  observe() {
    // Mock implementation
  }
  
  unobserve() {
    // Mock implementation
  }
  
  disconnect() {
    // Mock implementation
  }
}

(global as any).ResizeObserver = MockResizeObserver;
