import { render, waitFor } from '@testing-library/react';
import { useIsAuthenticated } from '@azure/msal-react';
import checkInService from 'services/checkIn';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AppRedirect from '.';
import React from 'react';

// Mocks
jest.mock('@azure/msal-react', () => ({
  useIsAuthenticated: jest.fn(),
}));

jest.mock('services/checkIn', () => ({
  getStatus: jest.fn(),
}));

// Wrapper with router context
const renderWithRouter = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="*" element={<AppRedirect />} />
        <Route path="/enrollmentcheckin" element={<div data-testid="redirect-page" />} />
      </Routes>
    </MemoryRouter>,
  );

describe('AppRedirect', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to /enrollmentcheckin when check-in is incomplete and not on the check-in page', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (checkInService.getStatus as jest.Mock).mockResolvedValue(false);

    const { getByTestId } = renderWithRouter('/dashboard');

    await waitFor(() => {
      expect(getByTestId('redirect-page')).toBeInTheDocument();
    });
  });

  it('does not redirect if check-in is complete', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (checkInService.getStatus as jest.Mock).mockResolvedValue(true);

    const { queryByTestId } = renderWithRouter('/dashboard');

    await waitFor(() => {
      expect(queryByTestId('redirect-page')).not.toBeInTheDocument();
    });
  });

  it('does not redirect if not authenticated', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);

    const { queryByTestId } = renderWithRouter('/dashboard');

    await waitFor(() => {
      expect(queryByTestId('redirect-page')).not.toBeInTheDocument();
    });
  });
});
