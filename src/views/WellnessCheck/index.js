import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import WellnessQuestion from 'components/WellnessQuestion';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import wellness from 'services/wellness';
import HealthStatus from './components/HealthStatus';

const WellnessCheck = () => {
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(null);
  const { profile } = useUser();

  useEffect(() => {
    const loadPage = async () => {
      if (profile) {
        setLoading(true);

        const status = await wellness.getStatus();
        if (status && status.IsValid) {
          setCurrentStatus(status);
        }
      }
      setLoading(false);
    };

    loadPage();
  }, [profile]);

  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    return <GordonUnauthorized feature="the wellness check in" />;
  } else if (currentStatus === null) {
    return <WellnessQuestion setStatus={setCurrentStatus} />;
  } else {
    return <HealthStatus currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} />;
  }
};

export default WellnessCheck;
