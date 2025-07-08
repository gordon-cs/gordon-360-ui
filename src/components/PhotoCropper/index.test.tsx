// tests/views/PhotoCropper.test.tsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PhotoCropper from '.';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useWindowSize } from 'hooks';

// Mocks
jest.mock('hooks', () => ({
  useWindowSize: jest.fn(() => [1024, 768]),
}));

const renderWithTheme = (ui: React.ReactElement) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('PhotoCropper component', () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders upload prompt when no preview', () => {
    renderWithTheme(<PhotoCropper open={true} onClose={onClose} onSubmit={onSubmit} />);
    expect(screen.getByText(/Choose a Photo to Upload/i)).toBeInTheDocument();
    expect(screen.getByText(/Drag & Drop a picture/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  test('calls onClose when Cancel is clicked', () => {
    renderWithTheme(<PhotoCropper open={true} onClose={onClose} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });

  test('shows error when image is too small', async () => {
    renderWithTheme(<PhotoCropper open={true} onClose={onClose} onSubmit={onSubmit} />);

    const file = new File([''], 'small.jpg', { type: 'image/jpeg' });

    // Mock Image instance with small dimensions
    const mockImage = {
      width: 1000,
      height: 1000,
      onload: () => {},
      src: '',
    } as unknown as HTMLImageElement;

    jest.spyOn(global, 'Image').mockImplementation(() => mockImage);

    const input = screen
      .getByRole('dialog')
      ?.querySelector('input[type="file"]') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, { target: { files: [file] } });
      if (mockImage.onload) mockImage.onload(new Event('load')); // Trigger onload manually
    });

    expect(await screen.findByText(/Image is too small/i)).toBeInTheDocument();
  });

  test('shows error when file is not an image', async () => {
    renderWithTheme(<PhotoCropper open={true} onClose={onClose} onSubmit={onSubmit} />);

    const invalidFile = new File(['text content'], 'text.txt', { type: 'text/plain' });
    const input = screen
      .getByRole('dialog')
      ?.querySelector('input[type="file"]') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, { target: { files: [invalidFile] } });
    });

    expect(await screen.findByText(/only png and jpeg/i)).toBeInTheDocument();
  });

  test('disables submit if preview is not set', () => {
    renderWithTheme(<PhotoCropper open={true} onClose={onClose} onSubmit={onSubmit} />);
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    expect(submitBtn).toBeDisabled();
  });
});
