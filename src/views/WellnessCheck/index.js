import GordonLoader from 'components/Loader';
import Login from 'components/LoginDialogue';
import WellnessQuestion from 'components/WellnessQuestion';
import { useAuth } from 'hooks';
import { useEffect, useState } from 'react';
import wellness from 'services/wellness';
import HealthStatus from './components/HealthStatus';

const WellnessCheck = () => {
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(null);
  const authenticated = useAuth();

  useEffect(() => {
    const loadPage = async () => {
      if (authenticated) {
        setLoading(true);

        const status = await wellness.getStatus();
        if (status && status.IsValid) {
          setCurrentStatus(status.Status);
        }

        setLoading(false);
      }
    };

    loadPage();
  }, [authenticated, currentStatus]);

  if (loading) {
    return <GordonLoader />;
  } else if (!authenticated) {
    return <Login />;
  } else if (currentStatus === null) {
    return <WellnessQuestion setStatus={setCurrentStatus} />;
  } else {
    return <HealthStatus currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} />;
  }
};

export default WellnessCheck;
