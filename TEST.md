# Frontend Testing Guide

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
