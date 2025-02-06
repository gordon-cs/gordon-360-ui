import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';
import { fetchHousingAccessInfo } from 'services/residentLife/HousingAccess';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import { useIsAuthenticated } from '@azure/msal-react';

import RDView from './components/RDView';
import RAView from './components/RAView';
import ResidentView from './components/ResidentView';
import StaffView from './components/StaffView';
import Page404 from '/src/views/Page404';

const Housing = () => {
  const [HousingAccess, setCanAccessHousing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { profile } = useUser();
  const isAuthenticated = useIsAuthenticated();
  const [selectedView, setSelectedView] = useState(null);
  const [isStudent, isRA, isResLifeStaff, isRD, isPolice, isHallInfoViewer, isHousingDeveloper] =
    useAuthGroups(
      AuthGroup.Student,
      AuthGroup.ResidentAdvisor,
      AuthGroup.HousingAdmin,
      AuthGroup.ResidentDirector,
      AuthGroup.Police,
      AuthGroup.HallInfoViewer,
      AuthGroup.HousingDeveloper,
    );
  const GetsRDView = isResLifeStaff || isRD;
  const hasStandardAccess = isPolice || isHallInfoViewer;

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      if (isAuthenticated) {
        const { canAccessHousing } = await fetchHousingAccessInfo(profile);
        setCanAccessHousing(canAccessHousing);
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, [isAuthenticated, profile]);

  useEffect(() => {
    if (isHousingDeveloper && !selectedView) {
      const selectPage = prompt('Enter the view you want to access (RD, RA, Res, Staff):');
      setSelectedView(selectPage?.toLowerCase() || '');
    }
  }, [isHousingDeveloper, selectedView]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isHousingDeveloper) {
    switch (selectedView) {
      case 'rd':
        return <RDView />;
      case 'ra':
        return <RAView />;
      case 'res':
        return <ResidentView />;
      case 'staff':
        return <StaffView />;
      default:
        return <Page404 />;
    }
  } else if (GetsRDView) {
    return <RDView />;
  } else if (isRA) {
    // RA check first as RA's will also show as students
    return <RAView />;
  } else if (isStudent && HousingAccess) {
    return <ResidentView />;
  } else if (hasStandardAccess) {
    return <StaffView />;
  } else {
    return <Page404 />; // user has no access to page
  }
};

export default Housing;
