import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import EnrollmentCheckIn from '.';
import checkInService from 'services/checkIn';
import { useUser } from 'hooks';
import { MemoryRouter } from 'react-router-dom';

// src/views/EnrollmentCheckIn/index.test.tsx
jest.mock('services/auth', () => ({
  msalInstance: {
    initialize: jest.fn().mockResolvedValue(undefined),
    getActiveAccount: jest.fn().mockReturnValue(null),
    getAllAccounts: jest.fn().mockReturnValue([]),
    setActiveAccount: jest.fn(),
  },
}));

jest.mock('@azure/msal-react', () => ({
  useIsAuthenticated: jest.fn(),
}));

// Auto-mock checkInService and useUser
jest.mock('services/checkIn');
jest.mock('hooks', () => ({
  useUser: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

const mockProfile = {
  ID: 123,
  AD_Username: 'jdoe',
  PersonType: 'student',
  MobilePhone: '5551234567',
  IsMobilePhonePrivate: false,
};

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders loader when loading', () => {
  (useUser as jest.Mock).mockReturnValue({ loading: true, profile: null });

  render(<EnrollmentCheckIn />, { wrapper: MemoryRouter });

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
