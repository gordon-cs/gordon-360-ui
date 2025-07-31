# Frontend Testing Guide

[Test Plans](/TEST_PLANS.md)

## Overview

This project uses **Jest** with **React Testing Library** to test React components in our frontend application, which is backed by an ASP.NET backend. Tests are colocated with components for better maintainability and clearer context.

Each component typically lives in its own directory (e.g., `components/ComponentName/index.tsx`), and its corresponding test file is named `index.test.tsx` and placed in the same directory.

## How to Write a Test

1. **Import the necessary tools**  
   Use `@testing-library/react` for rendering components and querying the DOM.
   
2. **Mock external dependencies**  
   Use `jest.mock()` for any services, hooks, or modules your component depends on (e.g., MSAL authentication, API services).

3. **Render the component**  
   If your component relies on routing, wrap it in a `MemoryRouter` with the appropriate route setup.

4. **Use `waitFor()` when testing asynchronous behavior**  
   This ensures that expectations involving API calls or delayed updates resolve correctly.

---

## Example: `AppRedirect` Component

Here’s a real test written for the `AppRedirect` component. It checks conditional redirects based on authentication and check-in status:

### Component Behavior

- If a user is **authenticated** and their **check-in is incomplete**, they are redirected to `/enrollmentcheckin`.
- If the check-in is **complete**, or the user is **unauthenticated**, they stay on their current page.

### Test Setup

```tsx
// Mocks
jest.mock('@azure/msal-react', () => ({
  useIsAuthenticated: jest.fn(),
}));

jest.mock('services/checkIn', () => ({
  getStatus: jest.fn(),
}));
```

### Rendering with Routing Context

We use `MemoryRouter` to simulate navigation:

```tsx
const renderWithRouter = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="*" element={<AppRedirect />} />
        <Route path="/enrollmentcheckin" element={<div data-testid="redirect-page" />} />
      </Routes>
    </MemoryRouter>,
  );
```

### Example Test Case

```tsx
it('redirects to /enrollmentcheckin when check-in is incomplete and not on the check-in page', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  (checkInService.getStatus as jest.Mock).mockResolvedValue(false);

  const { getByTestId } = renderWithRouter('/dashboard');

  await waitFor(() => {
    expect(getByTestId('redirect-page')).toBeInTheDocument();
  });
});
```

### Additional Cases Covered

- No redirect if check-in is **complete**
- No redirect if user is **unauthenticated**

---

## Tips

- Keep your tests scoped to a single concern (e.g., redirection logic, rendering based on props).
- Use `data-testid` sparingly—prefer semantic queries like `getByRole()` or `getByText()` when possible.
- Use `jest.clearAllMocks()` in `beforeEach()` to avoid cross-test contamination.
- Prefer `async/await` with `waitFor` when working with side effects or async logic.

---

## Next Steps

To write your own tests:

1. Copy an existing test (like `AppRedirect/index.test.tsx`) as a template.
2. Update the mocks and test cases for your component's logic.
3. Run the tests using:

```bash
npm test
```

Or for a specific file:

```bash
npm test -- components/YourComponent/index.test.tsx
```


# Testing Setup Notes - Jest Configuration and Environment Setup

## Overview
This document outlines the changes made to configure Jest for testing and ensure both the test environment and the app's production environment work correctly.

## Jest Configuration

### jest.config.ts
Created a Jest configuration file to set up the testing environment properly. Key configurations include:

- **testEnvironment**: Set to `jsdom` to simulate a browser environment for testing React components. jsdom provides a JavaScript implementation of the DOM and HTML standards, allowing tests to run in a Node.js environment while having access to browser-like APIs.

- **moduleNameMapper**: Configured to handle various module types:
  ```typescript
  moduleNameMapper: {
    // TypeScript path aliases
    ...(compilerOptions.paths
      ? pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' })
      : {}),
    "^envVar$": '<rootDir>/src/envVarJest.ts',
    // CSS module mocking
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Image and other static file mocking
    '\\.(png|jpg|jpeg|gif|svg)$': 'jest-transform-stub'
  }
  ```

- **transform**: Configured to handle TypeScript, JavaScript, and static files:
  ```typescript
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    // Transform images for test environments
    '^.+\\.(png|jpg|jpeg|gif|svg)$': 'jest-transform-stub'
  }
  ```

- **setupFilesAfterEnv**: Points to `jest.setup.ts` for additional test setup

### jest.setup.ts
This file handles environment setup and mocking that needs to be available across all tests:

```typescript
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
```

**Key setup items:**
- **dotenv configuration**: Required because .env files weren't being picked up during testing
- **localStorage mocking**: The services/storage file uses localStorage, which needs to be mocked for the testing environment

**Other mocks in test files**
- **useWindowSize mocking**: Custom hooks that rely on browser APIs need mocking
- **Image import mocking**: Image imports that work like JS files in the app don't work well in Jest

### matchMedia.mock.ts
Created a separate file for matchMedia mocking since this mock needed to be imported before the files that use it. This prevents having random mock code scattered before imports in test files.

## Environment Variable Handling

### The Problem
- `import.meta.env` works in browsers but causes syntax errors in Jest test environment
- `process.env` works in Jest but not in browsers
- Try-catch blocks don't work because syntax errors break before runtime

### The Solution
Created two separate files with a `getEnvVar` function:
- One for the browser environment (using `import.meta.env`)
- One for the Jest environment (using `process.env`)
- Used moduleNameMapper in jest.config.ts to decide which file to use during testing

## Authentication Configuration Changes

### msalConfig Issue
The msalConfig was originally defined directly in the React index file:

```typescript
export const msalConfig = {
  // configuration
};
```

### The Problem
- Originally used `new PublicClientApplication(msalConfig)` directly in index file
- Files being tested needed to import index to get msalInstance
- Index file uses DOM manipulation to get root element and create React elements
- Jest doesn't handle DOM operations in index files well

### The Solution
Created a separate file (`msalInstantiation.ts`) to create the MSAL instance and import it into index, separating concerns and avoiding Jest conflicts.

## PWA Configuration
Updated pwa.js to use `export default` instead of just `export` to resolve import errors in the test environment.

## TypeScript Configuration Changes

### tsconfig.json Updates
Updated path configuration since src was set as root, but this doesn't apply in the test environment:

```json
{
  "baseUrl": "src",
  "paths": {
    "services/*": ["services/*"],
    "components/*": ["components/*"],
    "hooks/*": ["hooks/*"],
    "hooks": ["hooks"],
    "contexts/*": ["contexts/*"],
    "views/*": ["views/*"],
    "index": ["."],
    "app.global.css": ["."],
    "matchMedia.mock": ["matchMedia.mock.ts"],
    "pwa": ["."],
    "theme": ["theme.ts"],
    "msalInstantiation": ["msalInstantiation.ts"],
    "./app": ["./"],
    "./app.global.css": ["./"]
  }
}
```

## Required Dependencies

### Babel Dependencies
- **@babel/core**: Core Babel compiler - transforms modern JavaScript/TypeScript
- **@babel/preset-env**: Babel preset for compiling modern JS to compatible versions
- **@babel/preset-react**: Babel preset for React JSX transformation
- **@babel/preset-typescript**: Babel preset for TypeScript compilation
- **babel-jest**: Jest transformer for Babel
- **babel-plugin-transform-import-meta**: Transforms import.meta syntax for Jest compatibility

### Testing Libraries
- **@testing-library/jest-dom**: Custom Jest matchers for DOM elements
- **@testing-library/react**: React component testing utilities
- **@testing-library/user-event**: User interaction simulation for tests
- **@types/jest**: TypeScript definitions for Jest
- **jest**: JavaScript testing framework
- **jest-environment-jsdom**: jsdom environment for Jest to simulate browser DOM

### Utility Libraries
- **identity-obj-proxy**: Proxy object for CSS module mocking
- **jest-transform-stub**: Stub transformer for static assets (images, etc.)
- **ts-jest**: TypeScript preprocessor for Jest
- **ts-node**: TypeScript execution environment for Node.js
- **dotenv**: Environment variable loader
- **@types/dotenv**: TypeScript definitions for dotenv

## Additional Notes

### React Import Requirements
In many test cases, React needed to be explicitly imported because the test environment would throw errors when trying to render components without it.

### File Organization
The testing setup required careful organization of mocks and configuration files to ensure proper loading order and avoid conflicts between test and production environments.