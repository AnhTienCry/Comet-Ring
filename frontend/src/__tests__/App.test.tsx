import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { describe, test, expect } from 'vitest';
import { render } from '../test/test-utils'; // Import custom render
import App from '../App';

// Cleanup sau mỗi test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('App Component', () => {
  test('should render without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  test('should have main element', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeTruthy();
  });
});