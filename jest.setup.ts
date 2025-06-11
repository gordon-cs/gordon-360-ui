import '@testing-library/jest-dom';

// jest.setup.js
global.importMeta = {
  env: {
    VITE_API_KEY: 'mock-api-key',
    VITE_BASE_URL: 'mock-base-url',
    // Add mocked values for your environment variables
  },
};
