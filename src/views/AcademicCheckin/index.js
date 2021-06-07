import React, { useState, useEffect } from 'react';

import GordonLoader from 'components/Loader';
import Login from 'views/Login';
import user from 'services/user';
import checkIn from 'services/checkIn';
import './index.css';

const AcademicCheckIn = ({ authentication, onLogIn }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(authentication);

  // we can keep this cause all this is is just a way of saving information
  const [checkInStatus, setCheckInStatus] = useState(null);
  const [username, setUsername] = useState(null);

  // do we need image? would it be nice touch
  // prob gordon logo or something

  useEffect(() => {
    if (authentication) {
      loadPage();
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [authentication, checkInStatus]);

  const loadPage = async () => {
    setLoading(true);

    const status = await checkIn.getStatus();

    if (status && status.IsValid) {
        setCheckInStatus(status.Status);
        const [
          { FirstName, LastName },
        ] = await Promise.all(user.getProfileInfo());

        setUsername(`${FirstName} ${LastName}`);
      }

    setLoading(false);
  }

  if (loading) {
    return <GordonLoader />;
  } else if (!isAuthenticated) {
    return (
      <div className="gordon-login">
        <Login onLogIn={onLogIn} />
      </div>
    );
  }
}
