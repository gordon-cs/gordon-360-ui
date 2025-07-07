import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import BirthdayMessage from '.';
import { useIsAuthenticated } from '@azure/msal-react';
import userService from 'services/user';
import GordonConfetti from 'components/GordonConfetti';
import useWindowSize from 'hooks/useWindowSize';

// Type-safe mocking
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

    let container: HTMLElement;

    await act(async () => {
      const result = render(<BirthdayMessage />);
      container = result.container;
      expect(container?.firstChild).toBeNull();
    });
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

    await waitFor(() => {
      expect(screen.getByAltText(/Happy Birthday Banner/i)).toBeInTheDocument();
    });

    expect(GordonConfetti).toHaveBeenCalledWith(
      expect.objectContaining({ active: false }),
      expect.anything(),
    );

    await act(() => {
      jest.advanceTimersByTime(1000);
      return Promise.resolve();
    });

    expect(GordonConfetti).toHaveBeenLastCalledWith(
      expect.objectContaining({ active: true }),
      expect.anything(),
    );

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
      jest.advanceTimersByTime(2000);
      return Promise.resolve();
    });

    expect(GordonConfetti).toHaveBeenCalledWith(
      expect.objectContaining({ active: false }),
      expect.anything(),
    );
  });
});
