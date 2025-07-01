// DaysLeft.test.tsx
import { render, screen, act } from '@testing-library/react';
import DaysLeft from '.';
import session from 'services/session';
import React from 'react';

jest.mock('services/session');

const mockedGetAll = session.getAll as jest.Mock;

const today = (dateStr: string) => {
  jest.useFakeTimers().setSystemTime(new Date(dateStr));
};

afterEach(() => {
  jest.useRealTimers();
  jest.clearAllMocks();
});

describe('DaysLeft component', () => {
  it('displays days since end of last session', async () => {
    today('2025-08-15');
    mockedGetAll.mockResolvedValue([
      {
        SessionBeginDate: '2025-05-15',
        SessionEndDate: '2025-08-10',
        SessionDescription: 'Summer 2025',
      },
    ]);

    await act(async () => render(<DaysLeft />));
    expect(screen.getAllByText(/5 days since the end of Summer Term/i)).toBeTruthy();
  });

  it('displays days remaining in current session', async () => {
    today('2025-05-16');
    mockedGetAll.mockResolvedValue([
      {
        SessionBeginDate: '2025-05-15',
        SessionEndDate: '2025-08-10',
        SessionDescription: 'Summer 2025',
      },
    ]);

    await act(async () => render(<DaysLeft />));
    expect(screen.getAllByText(/87 days remaining in Summer Term/i)).toBeTruthy();
  });

  it('displays days until next session when in break', async () => {
    today('2025-08-12');
    mockedGetAll.mockResolvedValue([
      {
        SessionBeginDate: '2025-09-01',
        SessionEndDate: '2025-12-15',
        SessionDescription: 'Fall 2025',
      },
      {
        SessionBeginDate: '2025-05-15',
        SessionEndDate: '2025-08-10',
        SessionDescription: 'Summer 2025',
      },
    ]);

    await act(async () => render(<DaysLeft />));
    expect(screen.getAllByText(/20 days until Fall Term/i)).toBeTruthy();
  });

  it('handles edge case: today is exactly session start', async () => {
    today('2025-05-15');
    mockedGetAll.mockResolvedValue([
      {
        SessionBeginDate: '2025-05-15',
        SessionEndDate: '2025-08-10',
        SessionDescription: 'Summer 2025',
      },
    ]);

    await act(async () => render(<DaysLeft />));
    expect(screen.getAllByText(/88 days remaining in Summer Term/i)).toBeTruthy();
  });

  it('handles edge case: today is exactly session end', async () => {
    today('2025-08-10');
    mockedGetAll.mockResolvedValue([
      {
        SessionBeginDate: '2025-05-15',
        SessionEndDate: '2025-08-10',
        SessionDescription: 'Summer 2025',
      },
    ]);

    await act(async () => render(<DaysLeft />));
    expect(screen.getAllByText(/1 day remaining in Summer Term/i)).toBeTruthy();
  });

  it('renders nothing if session list is empty', async () => {
    today('2025-08-11');
    mockedGetAll.mockResolvedValue([]);

    await act(async () => render(<DaysLeft />));
    expect(screen.queryByText(/remaining|until|since/i)).not.toBeInTheDocument();
  });

  it('renders nothing if session is undefined (null result)', async () => {
    today('2025-08-11');
    mockedGetAll.mockResolvedValue(null);

    await act(async () => render(<DaysLeft />));
    expect(screen.queryByText(/remaining|until|since/i)).not.toBeInTheDocument();
  });
});
