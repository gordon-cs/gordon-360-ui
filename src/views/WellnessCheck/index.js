import { useIsAuthenticated } from '@azure/msal-react';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import WellnessQuestion from 'components/WellnessQuestion';
import { useEffect, useState } from 'react';
import wellness from 'services/wellness';
import HealthStatus from './components/HealthStatus';

const WellnessCheck = () => {
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(null);
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    const loadPage = async () => {
      if (isAuthenticated) {
        setLoading(true);

        const status = await wellness.getStatus();
        if (status && status.IsValid) {
          setCurrentStatus(status);
        }
      }
      setLoading(false);
    };

    loadPage();
  }, [isAuthenticated]);

  if (loading) {
    return <GordonLoader />;
  } else if (!isAuthenticated) {
    return <GordonUnauthorized feature="the wellness check in" />;
  } else if (currentStatus === null) {
    return <WellnessQuestion setStatus={setCurrentStatus} />;
  } else {
    return <HealthStatus currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} />;
  }
};

export default WellnessCheck;
