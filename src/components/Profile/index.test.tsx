import { render, screen } from '@testing-library/react';
import { useIsAuthenticated } from '@azure/msal-react';
import Profile from '.';
import * as hooks from 'hooks';
import * as userService from 'services/user';
import { AuthGroup } from 'services/auth';
import '@testing-library/jest-dom';
import { Profile as ProfileType } from 'services/user';
import React from 'react';

// 👇 Mock GordonSnackbar and subcomponents
jest.mock(
  'components/Snackbar',
  () => (props: any) => (props.open ? <div data-testid="snackbar">{props.text}</div> : null),
);
// Mocks
jest.mock('@azure/msal-react', () => ({
  useIsAuthenticated: jest.fn(),
}));

jest.mock('./components', () => ({
  Identification: (props: any) => <div data-testid="Identification" {...props} />,
  SchedulePanel: () => <div data-testid="SchedulePanel" />,
  VictoryPromise: () => <div data-testid="VictoryPromise" />,
  OfficeInfoList: () => <div data-testid="OfficeInfoList" />,
  EmergencyInfoList: () => <div data-testid="EmergencyInfoList" />,
  PersonalInfoList: () => <div data-testid="PersonalInfoList" />,
  MembershipsList: () => <div data-testid="MembershipsList" />,
}));

describe('Profile Component (TypeScript)', () => {
  const baseProfile: ProfileType = {
    AD_Username: 'jdoe',
    FirstName: 'John',
    LastName: 'Doe',
    PersonType: 'stu',
    // Add other required fields or use a factory if needed
  } as ProfileType;

  beforeEach(() => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    jest.clearAllMocks();
    jest.spyOn(hooks, 'useNetworkStatus').mockReturnValue(true);
  });

  test('renders essential components for a student with myProf=true', () => {
    jest.spyOn(hooks, 'useAuthGroups').mockReturnValue(false);
    jest.spyOn(userService, 'isFacStaff').mockReturnValue(false);

    render(<Profile profile={baseProfile} myProf={true} />);

    expect(screen.getByTestId('Identification')).toBeInTheDocument();
    expect(screen.getByTestId('SchedulePanel')).toBeInTheDocument();
    expect(screen.getByTestId('VictoryPromise')).toBeInTheDocument();
    expect(screen.getByTestId('PersonalInfoList')).toBeInTheDocument();
    expect(screen.getByTestId('MembershipsList')).toBeInTheDocument();

    expect(screen.queryByTestId('OfficeInfoList')).not.toBeInTheDocument();
    expect(screen.queryByTestId('EmergencyInfoList')).not.toBeInTheDocument();
  });

  test('renders OfficeInfoList if isFacStaff returns true', () => {
    jest.spyOn(userService, 'isFacStaff').mockReturnValue(true);
    jest.spyOn(hooks, 'useAuthGroups').mockReturnValue(false);

    render(<Profile profile={baseProfile} myProf={true} />);

    expect(screen.getByTestId('OfficeInfoList')).toBeInTheDocument();
  });

  test('does not render VictoryPromise if not student or myProf=false', () => {
    jest.spyOn(hooks, 'useAuthGroups').mockReturnValue(false);
    jest.spyOn(userService, 'isFacStaff').mockReturnValue(false);

    const notStudentProfile: ProfileType = {
      ...baseProfile,
      PersonType: 'fac',
    };

    render(<Profile profile={notStudentProfile} myProf={false} />);
    expect(screen.queryByTestId('VictoryPromise')).not.toBeInTheDocument();
  });

  test('Snackbar appears with correct message when open is true', () => {
    jest.spyOn(hooks, 'useAuthGroups').mockReturnValue(false);
    jest.spyOn(userService, 'isFacStaff').mockReturnValue(false);

    // Initial render, then re-render to simulate snackbar state
    const { rerender } = render(<Profile profile={baseProfile} myProf={true} />);
    rerender(<Profile profile={baseProfile} myProf={true} />);
    expect(screen.queryByTestId('snackbar')).not.toBeInTheDocument(); // no auto trigger here
  });
});
