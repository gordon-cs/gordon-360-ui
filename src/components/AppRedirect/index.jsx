import { useIsAuthenticated } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import checkInService from 'services/checkIn';

const AppRedirect = () => {
  const [enrollmentCheckinComplete, setEnrollmentCheckinComplete] = useState(true);
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      checkInService
        .getStatus()
        .then(setEnrollmentCheckinComplete)
        .catch((error) => {
          console.error(error);
          setEnrollmentCheckinComplete(true);
        });
    }
  }, [isAuthenticated, location]);

  if (
    isAuthenticated &&
    !enrollmentCheckinComplete &&
    location.pathname !== '/enrollmentcheckin' &&
    location.pathname !== '/wellness'
  ) {
    return <Navigate to="/enrollmentcheckin" />;
  }

  return null;
};

export default AppRedirect;
