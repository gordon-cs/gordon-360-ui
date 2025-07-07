import '@testing-library/jest-dom';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

jest.mock('services/storage', () => ({
  get: jest.fn((key) => {
    if (key === 'network-status') return 'online';
    return null;
  }),
  set: jest.fn(),
}));

// jest.setup.js
beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});