// tests/views/PhotoCropper.test.tsx
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PhotoCropper from '.';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import React from 'react';

// Mocks
jest.mock('hooks', () => ({
  useWindowSize: jest.fn(() => [1024, 768]),
}));

const renderWithTheme = (ui) => {
  const theme = createTheme(); // optionally pass custom options
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('PhotoCropper component', () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders upload prompt when no preview', () => {
    render(<PhotoCropper open={true} onClose={onClose} onSubmit={onSubmit} />);

    expect(screen.getByText(/Choose a Photo to Upload/i)).toBeInTheDocument();
    expect(screen.getByText(/Drag & Drop a picture/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  test('calls onClose when Cancel is clicked', () => {
    render(<PhotoCropper open={true} onClose={onClose} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });

  test('shows error when image is too small', async () => {
    render(<PhotoCropper open={true} onClose={onClose} onSubmit={onSubmit} />);

    const file = new File([''], 'small.jpg', { type: 'image/jpeg' });
    Object.defineProperty(file, 'width', { value: 1000 });
    Object.defineProperty(file, 'height', { value: 1000 });

    const img = new Image();
    img.width = 1000;
    img.height = 1000;
    jest.spyOn(global, 'Image').mockImplementation(() => img);

    const dropzone = screen.getByRole('dialog').querySelector('input[type="file"]');

    if (dropzone) {
      await act(async () => {
        fireEvent.change(dropzone, { target: { files: [file] } });
      });

      expect(await screen.findByText(/Image is too small/i)).toBeInTheDocument();
    }
  });

  test('shows error when file is not image', async () => {
    render(<PhotoCropper open={true} onClose={onClose} onSubmit={onSubmit} />);

    const invalidFile = new File(['text content'], 'text.txt', { type: 'text/plain' });
    const dropzone = screen.getByRole('dialog').querySelector('input[type="file"]');

    if (dropzone) {
      await act(async () => {
        fireEvent.change(dropzone, { target: { files: [invalidFile] } });
      });

      expect(await screen.findByText(/only png and jpeg/i)).toBeInTheDocument();
    }
  });

  test('disables submit if preview is not set', () => {
    render(<PhotoCropper open={true} onClose={onClose} onSubmit={onSubmit} />);
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    expect(submitBtn).toBeDisabled();
  });
});
