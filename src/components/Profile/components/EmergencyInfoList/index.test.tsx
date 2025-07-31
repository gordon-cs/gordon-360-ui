import { render, screen, waitFor } from '@testing-library/react';
import EmergencyInfoList from '.';
import user from 'services/user';
import '@testing-library/jest-dom';

// Mocks
jest.mock('services/user', () => ({
  getEmergencyInfo: jest.fn(),
}));

jest.mock('../ProfileInfoListItem', () => ({
  __esModule: true,
  default: jest.fn(({ title, contentText }) => (
    <div data-testid="profile-info-item">
      <span data-testid="item-title">{title}</span>
      <span data-testid="item-content">{contentText}</span>
    </div>
  )),
}));

describe('EmergencyInfoList', () => {
  const mockUsername = 'testuser';
  const mockContacts = [
    {
      FirstName: 'Anthony',
      LastName: 'Aardvark',
      Relationship: 'Father',
      MobilePhone: '1234567890',
      HomePhone: '0987654321',
      WorkPhone: '5551234567',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and display emergency contacts', async () => {
    (user.getEmergencyInfo as jest.Mock).mockResolvedValue(mockContacts);

    render(<EmergencyInfoList username={mockUsername} />);
    await waitFor(() => {
      expect(user.getEmergencyInfo).toHaveBeenCalledWith(mockUsername);
      expect(screen.getByText('Emergency Contact Information')).toBeInTheDocument();
      expect(screen.getByText('Anthony Aardvark (Father)')).toBeInTheDocument();
      expect(screen.getByText('(123) 456-7890')).toBeInTheDocument();
      expect(screen.getByText('(098) 765-4321')).toBeInTheDocument();
      expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
    });
  });

  it('should display the privacy disclaimer', async () => {
    (user.getEmergencyInfo as jest.Mock).mockResolvedValue(mockContacts);

    render(<EmergencyInfoList username={mockUsername} />);

    await waitFor(() => {
      expect(screen.getByText('Private: visible only to Gordon Police')).toBeInTheDocument();
    });
  });

  it('should handle empty contact list', async () => {
    (user.getEmergencyInfo as jest.Mock).mockResolvedValue([]);

    render(<EmergencyInfoList username={mockUsername} />);

    await waitFor(() => {
      expect(screen.getByText('Emergency Contact Information')).toBeInTheDocument();
      expect(screen.queryByTestId('profile-info-item')).not.toBeInTheDocument();
    });
  });
});
