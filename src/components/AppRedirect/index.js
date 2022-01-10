import { useAuth } from 'hooks';
import { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router';
import checkInService from 'services/checkIn';

const AppRedirect = () => {
  const [enrollmentCheckinComplete, setEnrollmentCheckinComplete] = useState(true);
  const location = useLocation();
  const authenticated = useAuth();

  useEffect(() => {
    if (authenticated) {
      checkInService.getStatus().then((status) => setEnrollmentCheckinComplete(status ?? true));
    }
  }, [authenticated]);

  if (authenticated && !enrollmentCheckinComplete && location.pathname !== '/enrollmentcheckin') {
    return <Redirect to="/enrollmentcheckin" />;
  }

  return null;
};

export default AppRedirect;
