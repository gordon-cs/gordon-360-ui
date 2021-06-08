import React, { useState, useEffect } from 'react';

import GordonLoader from 'components/Loader';
import Login from 'views/Login';
import CheckInQuestion from 'components/CheckInQuestion';
import user from 'services/user';
import checkIn from 'services/checkIn';
//import './index.css';
// import CheckInStatus from 'views/AcademicCheckIn/components/status';

const AcademicCheckIn = ({ authentication, onLogIn }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(authentication);

  const [currentStatus, setCurrentStatus] = useState(null);
  const [username, setUsername] = useState(null);


  useEffect(() => {
    if (authentication) {
      loadPage();
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [authentication, currentStatus]);

  const loadPage = async () => {
    setLoading(true);

    /*const status = await checkIn.getStatus();

    if (status && status.IsValid) {
        setCurrentStatus(status.Status);
        const [
          { FirstName, LastName },
        ] = await Promise.all(user.getProfileInfo());

        setUsername(`${FirstName} ${LastName}`);
      }
    */

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
  } else if (currentStatus === null) {
    return <CheckInQuestion setStatus={setCurrentStatus} />;
  } else {
    return (
      <p> not Hi</p>
    )
  }
}

export default AcademicCheckIn;
