import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import BirthdayMessage from '.';
import { useIsAuthenticated } from '@azure/msal-react';
import userService from 'services/user';
import GordonConfetti from 'components/GordonConfetti';
import useWindowSize from 'hooks/useWindowSize';

// Mock all dependencies
jest.mock('@azure/msal-react', () => ({
  useIsAuthenticated: jest.fn(),
}));
jest.mock('services/user', () => ({
  isBirthdayToday: jest.fn(),
}));
jest.mock('components/GordonConfetti', () => jest.fn(() => <div data-testid="confetti" />));
jest.mock('hooks/useWindowSize', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('./HBDBanner.png', () => 'HBDBanner.png');
jest.mock('./HBDBannerLarge.png', () => 'HBDBannerLarge.png');

beforeEach(() => {
  jest.clearAllMocks();
  sessionStorage.clear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('BirthdayMessage', () => {
  it('renders nothing if not authenticated', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);
    (useWindowSize as jest.Mock).mockReturnValue([1300]);

    let container;

    await act(async () => {
      ({ container } = render(<BirthdayMessage />)); // Assign inside act
    });

    // Now you can use `container` here
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing if authenticated but not user birthday', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (userService.isBirthdayToday as jest.Mock).mockResolvedValue(false);
    (useWindowSize as jest.Mock).mockReturnValue([1300]);

    await act(async () => {
      render(<BirthdayMessage />);
    });

    expect(screen.queryByAltText(/Happy Birthday Banner/i)).not.toBeInTheDocument();
  });

  it("shows birthday banner and pops confetti if it is the user's birthday", async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (userService.isBirthdayToday as jest.Mock).mockResolvedValue(true);
    (useWindowSize as jest.Mock).mockReturnValue([1300]);

    await act(async () => {
      render(<BirthdayMessage />);
    });

    // Wait for banner
    await waitFor(() => {
      expect(screen.getByAltText(/Happy Birthday Banner/i)).toBeInTheDocument();
    });

    // Initial confetti should be inactive
    expect(GordonConfetti).toHaveBeenCalledWith(
      expect.objectContaining({ active: false }),
      expect.anything(),
    );

    // Fast-forward 1000ms to trigger confetti
    await act(() => {
      jest.advanceTimersByTime(1000);
      return Promise.resolve();
    });

    expect(GordonConfetti).toHaveBeenLastCalledWith(
      expect.objectContaining({ active: true }),
      expect.anything(),
    );

    // After 5000ms it turns off
    await act(() => {
      jest.advanceTimersByTime(5000);
      return Promise.resolve();
    });

    expect(GordonConfetti).toHaveBeenLastCalledWith(
      expect.objectContaining({ active: false }),
      expect.anything(),
    );
  });

  it('clicking the card triggers confetti pop', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (userService.isBirthdayToday as jest.Mock).mockResolvedValue(true);
    (useWindowSize as jest.Mock).mockReturnValue([1300]);

    await act(async () => {
      render(<BirthdayMessage />);
    });

    const img = await screen.findByAltText(/Happy Birthday Banner/i);
    const card = img.closest('div.MuiCard-root');
    expect(card).toBeTruthy();

    // Confetti initially off
    expect(GordonConfetti).toHaveBeenCalledWith(
      expect.objectContaining({ active: false }),
      expect.anything(),
    );

    act(() => {
      fireEvent.click(card!);
    });

    expect(GordonConfetti).toHaveBeenLastCalledWith(
      expect.objectContaining({ active: true }),
      expect.anything(),
    );
  });

  it('does not auto-pop confetti again if already popped in session', async () => {
    sessionStorage.setItem('birthdayConfettiHasPopped', JSON.stringify(true));

    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (userService.isBirthdayToday as jest.Mock).mockResolvedValue(true);
    (useWindowSize as jest.Mock).mockReturnValue([1300]);

    await act(async () => {
      render(<BirthdayMessage />);
    });

    await act(() => {
      jest.advanceTimersByTime(2000); // Should not trigger popConfetti
      return Promise.resolve();
    });

    // Confetti should still be inactive
    expect(GordonConfetti).toHaveBeenCalledWith(
      expect.objectContaining({ active: false }),
      expect.anything(),
    );
  });
});
