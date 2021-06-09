import React, { useState, useEffect } from 'react';

import GordonLoader from 'components/Loader';
import Login from 'views/Login';
import CheckInQuestion from 'components/CheckInQuestion';
import user from 'services/user';
import checkIn from 'services/checkIn';
import './index.css';
// import CheckInStatus from 'views/AcademicCheckIn/components/status';

const AcademicCheckIn = ({ authentication, onLogIn }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(authentication);

  const [currentStatus, setCurrentStatus] = useState(null);
  const [username, setUsername] = useState(null);

  // Every time the page is updated, verify the user is logged in, and update any necessary info
  useEffect(() => {
    if (authentication) {
      loadPage();
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [authentication, currentStatus]);

  // Load the user's checkIn status from the API and update accordingly
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

  // If loadPage has not finished, display loader
  if (loading) {
    return <GordonLoader />;
  } else if (!isAuthenticated) { // Else if the user is not logged in, display login page
    return (
      <div className="gordon-login">
        <Login onLogIn={onLogIn} />
      </div>
    );
  } else if (currentStatus === null) { // Else if the user has not completed checkIn, prompt them
    return <CheckInQuestion setStatus={setCurrentStatus} />;
  } else { // Otherwise display a default appearance
    return (
      <p> not Hi</p>
    )
  }
}

export default AcademicCheckIn;
