import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SpreadsheetUploader from './index';

// Mock dependencies
jest.mock('services/logging', () => ({
  __esModule: true,
  default: {
    logError: jest.fn(),
  },
}));

jest.mock('react-dropzone', () => ({
  __esModule: true,
  default: jest.fn(({ onDropAccepted, children }) => {
    const getRootProps = jest.fn(() => ({
      onClick: jest.fn(),
    }));
    const getInputProps = jest.fn(() => ({}));

    return (
      <div
        data-testid="dropzone"
        onClick={() => onDropAccepted([new File([''], 'test.xlsx')] as any)}
      >
        {children({ getRootProps, getInputProps })}
      </div>
    );
  }),
}));

jest.mock('xlsx', () => ({
  read: jest.fn(() => ({
    SheetNames: ['Sheet1'],
    Sheets: {
      Sheet1: {},
    },
  })),
  utils: {
    sheet_to_json: jest.fn(() => [{ name: 'Test', value: 123 }]),
  },
}));

describe('SpreadsheetUploader', () => {
  const mockProps = {
    open: true,
    setOpen: jest.fn(),
    onSubmitData: jest.fn(),
    title: 'Test Uploader',
    maxColumns: 5,
    requiredColumns: ['name'],
    otherColumns: ['value'],
    buttonName: 'Submit',
    template: 'template.xlsx',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the upload dialog with correct title', () => {
    render(<SpreadsheetUploader {...mockProps} />);
    expect(screen.getByText('Test Uploader')).toBeInTheDocument();
  });

  it('shows the dropzone when no file is uploaded', () => {
    render(<SpreadsheetUploader {...mockProps} />);
    expect(screen.getByText('Upload a Spreadsheet')).toBeInTheDocument();
    expect(screen.getByText('Accepted file types: CSV, XLSX')).toBeInTheDocument();
    expect(screen.getByText('Download Template')).toBeInTheDocument();
  });

  it('disables submit button when no data is uploaded', () => {
    render(<SpreadsheetUploader {...mockProps} />);
    expect(screen.getByText('Submit')).toBeDisabled();
  });

  it('closes the dialog when cancel is clicked', async () => {
    render(<SpreadsheetUploader {...mockProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockProps.setOpen).toHaveBeenCalledWith(false);
  });
});
