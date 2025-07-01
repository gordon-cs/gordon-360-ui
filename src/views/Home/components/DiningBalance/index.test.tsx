import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useIsAuthenticated } from '@azure/msal-react';
import DiningBalance from '.';
import user from 'services/user';
import session from 'services/session';
import { theme360 } from 'theme';
import { act } from 'react';

// Mocks
jest.mock('@azure/msal-react', () => ({
  useIsAuthenticated: jest.fn(),
}));

jest.mock('components/Loader', () => () => <div>Loading...</div>);
jest.mock('services/user');
jest.mock('services/session');

describe('<DiningBalance />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loader while loading', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (user.getDiningInfo as jest.Mock).mockResolvedValue('30');
    (session.getDaysLeft as jest.Mock).mockResolvedValue([5, 10]);

    render(<DiningBalance />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
  });

  it('renders dollar-only fallback if diningInfo is a string', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (user.getDiningInfo as jest.Mock).mockResolvedValue('42');
    (session.getDaysLeft as jest.Mock).mockResolvedValue([5, 10]);

    render(<DiningBalance />);
    await waitFor(() => {
      expect(screen.getByText('$42')).toBeInTheDocument();
    });
  });

  it('renders balance with warning color when balance is low', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (user.getDiningInfo as jest.Mock).mockResolvedValue('15');
    (session.getDaysLeft as jest.Mock).mockResolvedValue([5, 10]);

    render(<DiningBalance />);
    const balanceEl = await screen.findByText('$15');
    expect(balanceEl).toBeInTheDocument();
    expect(balanceEl).toHaveStyle(`color: ${theme360.colorSchemes.light.palette.warning.main}`); // replace with actual warning.main color
  });

  it('renders balance with error color when balance is really low', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (user.getDiningInfo as jest.Mock).mockResolvedValue('5');
    (session.getDaysLeft as jest.Mock).mockResolvedValue([5, 10]);

    render(<DiningBalance />);
    const balanceEl = await screen.findByText('$5');
    expect(balanceEl).toBeInTheDocument();
    expect(balanceEl).toHaveStyle(`color: ${theme360.colorSchemes.light.palette.error.main}`);
  });

  it('renders balance with neutral color when balance is zero', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (user.getDiningInfo as jest.Mock).mockResolvedValue('0');
    (session.getDaysLeft as jest.Mock).mockResolvedValue([5, 10]);

    render(<DiningBalance />);
    const balanceEl = await screen.findByText('$0');
    expect(balanceEl).toBeInTheDocument();
    expect(balanceEl).toHaveStyle(`color: ${theme360.colorSchemes.light.palette.neutral.dark}`);
  });

  it('renders full chart and details when diningInfo is an object', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    const diningInfo = {
      ChoiceDescription: '21 Meal Plan',
      Swipes: { PlanDescription: '', PlanID: '', InitialBalance: 100, CurrentBalance: 50 },
      DiningDollars: {
        PlanDescription: '',
        PlanID: '',
        InitialBalance: 200,
        CurrentBalance: '150',
      },
      GuestSwipes: { PlanDescription: '', PlanID: '', InitialBalance: 10, CurrentBalance: '5' },
    };

    (user.getDiningInfo as jest.Mock).mockResolvedValue(diningInfo);
    (session.getDaysLeft as jest.Mock).mockResolvedValue([3, 15]);

    render(<DiningBalance />);
    await waitFor(() => {
      expect(screen.getByText(/21 Meal Plan/i)).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('$150')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  it('renders meal plan edit link with correct href', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    const diningInfo = {
      ChoiceDescription: 'Anytime Plan',
      Swipes: { PlanDescription: '', PlanID: '', InitialBalance: 50, CurrentBalance: 25 },
      DiningDollars: { PlanDescription: '', PlanID: '', InitialBalance: 100, CurrentBalance: '80' },
      GuestSwipes: { PlanDescription: '', PlanID: '', InitialBalance: 10, CurrentBalance: '8' },
    };

    (user.getDiningInfo as jest.Mock).mockResolvedValue(diningInfo);
    (session.getDaysLeft as jest.Mock).mockResolvedValue([4, 10]);

    render(<DiningBalance />);
    await waitFor(() => {
      const link = screen.getByTitle(/change meal plan/i);
      expect(link).toHaveAttribute('href', 'https://www.gordon.edu/mealplan');
    });
  });

  it("renders TODAY'S MENU button with correct link", async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (user.getDiningInfo as jest.Mock).mockResolvedValue('30');
    (session.getDaysLeft as jest.Mock).mockResolvedValue([5, 10]);

    render(<DiningBalance />);
    await waitFor(() => {
      const button = screen.getByRole('link', { name: /today's menu/i });
      expect(button).toHaveAttribute('href', 'https://www.nutritics.com/menu/ma4080');
    });
  });

  it('renders ∞ when swipeInit is 0', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    const diningInfo = {
      ChoiceDescription: 'Unlimited Plan',
      Swipes: { PlanDescription: '', PlanID: '', InitialBalance: 0, CurrentBalance: 0 },
      DiningDollars: {
        PlanDescription: '',
        PlanID: '',
        InitialBalance: 100,
        CurrentBalance: '100',
      },
      GuestSwipes: { PlanDescription: '', PlanID: '', InitialBalance: 5, CurrentBalance: '5' },
    };

    (user.getDiningInfo as jest.Mock).mockResolvedValue(diningInfo);
    (session.getDaysLeft as jest.Mock).mockResolvedValue([2, 10]);

    render(<DiningBalance />);
    await waitFor(() => {
      expect(screen.getByText('∞')).toBeInTheDocument();
    });
  });
});
