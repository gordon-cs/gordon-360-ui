import { useIsAuthenticated } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router';
import checkInService from 'services/checkIn';

const AppRedirect = () => {
  const [enrollmentCheckinComplete, setEnrollmentCheckinComplete] = useState(true);
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      checkInService.getStatus().then((status) => setEnrollmentCheckinComplete(status ?? true));
    }
  }, [isAuthenticated]);

  if (
    isAuthenticated &&
    !enrollmentCheckinComplete &&
    location.pathname !== '/enrollmentcheckin' &&
    location.pathname !== '/wellness'
  ) {
    return <Redirect to="/enrollmentcheckin" />;
  }

  return null;
};

export default AppRedirect;
