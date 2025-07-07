import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import 'matchMedia.mock';

import { useUser, useUserActions, useWindowSize } from 'hooks';
import user from 'services/user';
import IDUploader from '.';

// Mocks
jest.mock('@azure/msal-react', () => ({
  useIsAuthenticated: jest.fn(),
}));

jest.mock('hooks', () => ({
  useUser: jest.fn(),
  useUserActions: jest.fn(),
  useWindowSize: jest.fn(),
}));

jest.mock('services/user', () => ({
  postIDImage: jest.fn(),
}));

jest.mock('services/logging', () => ({
  post: jest.fn(),
}));

jest.mock('./image-default.png', () => 'default.png');
jest.mock('./image-green.png', () => 'green.png');
jest.mock('./image-top.png', () => 'top.png');

// 🧪 MOCK PhotoCropper to trigger submit manually
jest.mock('components/PhotoCropper', () => (props) => {
  if (!props.open) return null;
  return (
    <div>
      <p>Crop your photo</p>
      <button onClick={() => props.onSubmit('mock-image')}>Submit Image</button>
    </div>
  );
});

describe('IDUploader component', () => {
  const mockUser = {
    profile: {
      AD_Username: 'jdoe',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useWindowSize as jest.Mock).mockReturnValue([1024, 768]);
  });

  test('renders guidelines and preview card when authenticated', () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (useUser as jest.Mock).mockReturnValue(mockUser);
    (useUserActions as jest.Mock).mockReturnValue(null);

    render(<IDUploader />);

    expect(screen.getByText(/ID Photo Guidelines/i)).toBeInTheDocument();
    expect(screen.getByText(/Preview your ID Card/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument();
  });

  test('renders unauthenticated message when not authenticated', () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);

    render(<IDUploader />);

    expect(screen.getByText(/please login to view the ID Upload page/i)).toBeInTheDocument();
  });

  test('opens PhotoCropper on upload click', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (useUser as jest.Mock).mockReturnValue(mockUser);
    (useUserActions as jest.Mock).mockReturnValue(null);

    render(<IDUploader />);
    fireEvent.click(screen.getByRole('button', { name: /upload/i }));

    expect(screen.getByText(/crop your photo/i)).toBeInTheDocument();
  });

  test('handles successful photo submission', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (useUser as jest.Mock).mockReturnValue(mockUser);
    const updateImage = jest.fn();
    (useUserActions as jest.Mock).mockReturnValue({ updateImage });
    (user.postIDImage as jest.Mock).mockResolvedValue({});

    render(<IDUploader />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /upload/i }));
    expect(screen.getByText(/crop your photo/i)).toBeInTheDocument();

    // Trigger submit from mocked PhotoCropper
    await act(async () => {
      fireEvent.click(screen.getByText(/submit image/i));
    });

    expect(user.postIDImage).toHaveBeenCalledWith('mock-image');
    expect(updateImage).toHaveBeenCalled();
    expect(screen.getByText(/photo submitted/i)).toBeInTheDocument();
  });

  test('shows error snackbar on failed image submission', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    (useUser as jest.Mock).mockReturnValue(mockUser);
    (useUserActions as jest.Mock).mockReturnValue({});
    (user.postIDImage as jest.Mock).mockRejectedValue(new Error('fail'));

    render(<IDUploader />);

    fireEvent.click(screen.getByRole('button', { name: /upload/i }));
    expect(screen.getByText(/crop your photo/i)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText(/submit image/i));
    });

    expect(user.postIDImage).toHaveBeenCalled();
    expect(screen.getByText(/there was a problem submitting your photo/i)).toBeInTheDocument();
  });
});
