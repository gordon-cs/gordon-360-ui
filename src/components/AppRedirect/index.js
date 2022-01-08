import { useAuth } from 'hooks';
import { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import checkInService from 'services/checkIn';

const AppRedirect = () => {
  const [enrollmentCheckinComplete, setEnrollmentCheckinComplete] = useState(true);
  const history = useHistory();
  const authenticated = useAuth();

  useEffect(() => {
    if (authenticated) {
      checkInService.getStatus().then((status) => setEnrollmentCheckinComplete(status ?? true));
    }
  }, [authenticated]);

  if (
    authenticated &&
    !enrollmentCheckinComplete &&
    history.location.pathname !== '/enrollmentcheckin'
  ) {
    return <Redirect to="/enrollmentcheckin" />;
  }

  return null;
};

export default AppRedirect;
