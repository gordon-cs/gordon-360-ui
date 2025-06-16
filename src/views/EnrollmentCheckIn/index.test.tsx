import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import EnrollmentCheckIn from '.';
import checkInService from 'services/checkIn';
import { EmergencyContact } from 'services/checkIn';
import { useUser } from 'hooks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';

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

const mockEmergencyContacts: EmergencyContact[] = [
  {
    SEQ_NUMBER: 1,
    FirstName: 'John',
    LastName: 'Doe',
    Relationship: 'Father',
    HomePhone: '+1234567890',
    HomePhoneIN: false,
    MobilePhone: '+1987654321',
    MobilePhoneIN: false,
  },
  {
    SEQ_NUMBER: 2,
    FirstName: 'Jane',
    LastName: 'Doe',
    Relationship: 'Mother',
    HomePhone: '+1231231234',
    HomePhoneIN: false,
    MobilePhone: '+4321432143',
    MobilePhoneIN: false,
  },
];

beforeEach(() => {
  jest.clearAllMocks();

  (checkInService.getEmergencyContacts as jest.Mock).mockResolvedValue(mockEmergencyContacts);
});

test('renders loader when loading', async () => {
  (useUser as jest.Mock).mockReturnValue({ loading: true, profile: null });

  await act(async () => {
    render(<EnrollmentCheckIn />, { wrapper: MemoryRouter });
  });

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('renders unauthenticated if no profile', async () => {
  (useUser as jest.Mock).mockReturnValue({ loading: false, profile: null });

  await act(async () => {
    render(<EnrollmentCheckIn />, { wrapper: MemoryRouter });
  });

  expect(screen.getByText(/Enrollment Check-in/i)).toBeInTheDocument();
});

test('renders form if profile exists after navigating to page 1', async () => {
  (useUser as jest.Mock).mockReturnValue({ loading: false, profile: mockProfile });

  await act(async () => {
    render(<EnrollmentCheckIn />, { wrapper: MemoryRouter });
  });

  // Simulate clicking the button that moves to page 1
  const beginButton = screen.getByRole('button', { name: /Begin Check-In/i });
  await act(async () => {
    fireEvent.click(beginButton);
  });

  screen.debug();

  // Now expect the form to be there
  expect(screen.getByText(/Enrollment Check In/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(mockEmergencyContacts[0].MobilePhone)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
});

test('disables next button if emergency contact info is incomplete', async () => {
  (useUser as jest.Mock).mockReturnValue({ loading: false, profile: mockProfile });
  (checkInService.getEmergencyContacts as jest.Mock).mockResolvedValue([]);

  await act(async () => {
    render(<EnrollmentCheckIn />, { wrapper: MemoryRouter });
  });

  const beginButton = screen.getByRole('button', { name: /Begin Check-In/i });

  await act(async () => {
    fireEvent.click(beginButton);
  });

  const nextButton = screen.getByRole('button', { name: /next/i });
  expect(nextButton).toBeDisabled();
});

test('goes through all steps and submits check-in', async () => {
  (useUser as jest.Mock).mockReturnValue({ loading: false, profile: mockProfile });

  await act(async () => {
    render(<EnrollmentCheckIn />, { wrapper: MemoryRouter });
  });

  // Step 0: Welcome
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: /begin check-in/i }));
  });

  // Simulate valid emergency contact info
  await act(async () => {
    fireEvent.change(screen.getAllByRole('textbox', { name: /First Name/i })[0], {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getAllByRole('textbox', { name: /Last Name/i })[0], {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getAllByRole('textbox', { name: /Relationship/i })[0], {
      target: { value: 'Friend' },
    });
    fireEvent.change(screen.getAllByRole('textbox', { name: /Mobile Phone/i })[0], {
      target: { value: '1234567890' },
    });
  });

  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
  });

  // Step 2: Phone (you might need to fill SMSOptedIn and phone number)
  await act(async () => {
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: '5555555555' },
    });
    const radios = screen.getAllByRole('radio');
    const yesRadio = radios[0];
    fireEvent.click(yesRadio);
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
  });

  // Step 3: Privacy agreement
  await act(async () => {
    fireEvent.click(screen.getByLabelText(/FERPA/i));
    fireEvent.click(screen.getByLabelText(/data usage/i));
    fireEvent.click(screen.getByLabelText(/photography statement/i));
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
  });

  // Step 4: Confirm
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  });

  expect(screen.getByText(/enrollment checkin!/i)).toBeInTheDocument();
});

//it('handles forward and backward navigation', async () => {
//    const user = userEvent.setup();
//
//    const TestRouter = () => (
//      <MemoryRouter initialEntries={['/enrollmentcheckin']}>
//        <Routes>
//          <Route path="/enrollmentcheckin" element={<EnrollmentCheckIn />} />
//        </Routes>
//      </MemoryRouter>
//    );
//
//    render(<TestRouter />);
//
//    // Wait for initial render
//    await waitFor(() =>
//      expect(screen.getByRole('heading', { name: /enrollment check in/i })).toBeInTheDocument()
//    );
//
//    // Click next
//    const nextButton = screen.getByRole('button', { name: /begin check-in/i });
//    await user.click(nextButton);
//
//    // Should now be on Emergency Contact step
//    await waitFor(() =>
//      expect(screen.getAllByText(/emergency contact information/i).length).toBeGreaterThan(0)
//    );
//
//    act(() => {
//  window.history.pushState({ state: { step: 1 } }, '', '/enrollmentcheckin');
//  window.dispatchEvent(new PopStateEvent('popstate', { state: { step: 1 } }));
//});
//
//
//    // Simulate browser "back" button
//    window.history.back();
//
//    const logSpy = jest.spyOn(console, 'log');
//
//expect(logSpy).toHaveBeenCalledWith('the event', 1);
//
//    await waitFor(() =>
//      expect(screen.getByText(/welcome/i)).toBeInTheDocument()
//    );
//
//
//
//
//    // Simulate forward button
//    window.history.forward();
//
//    await waitFor(() =>
//      expect(screen.getAllByText(/emergency contact information/i).length).toBeGreaterThan(0)
//    );
//  });
