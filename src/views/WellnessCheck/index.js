import { useState, useEffect } from 'react';

import GordonLoader from 'components/Loader';
import WellnessQuestion from 'components/WellnessQuestion';
import HealthStatus from './components/HealthStatus';
import Login from 'components/LoginDialogue';
import wellness from 'services/wellness';
import user from 'services/user';

const WellnessCheck = ({ authentication, onLogIn }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(authentication);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [username, setUsername] = useState(null);
  const [image, setImage] = useState(null);

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

    const status = await wellness.getStatus();

    if (status && status.IsValid) {
      setCurrentStatus(status.Status);
      const [{ FirstName, LastName }, { def: defaultImage, pref: preferredImage }] =
        await Promise.all([user.getProfileInfo(), user.getImage()]);

      setUsername(`${FirstName} ${LastName}`);
      setImage(preferredImage ?? defaultImage);
    }

    setLoading(false);
  };

  if (loading) {
    return <GordonLoader />;
  } else if (!isAuthenticated) {
    return (
      <div>
        <Login onLogIn={onLogIn} />
      </div>
    );
  } else if (currentStatus === null) {
    return <WellnessQuestion setStatus={setCurrentStatus} />;
  } else {
    return (
      <HealthStatus
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
        username={username}
        image={image}
      />
    );
  }
};

export default WellnessCheck;
