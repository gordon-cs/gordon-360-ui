import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';
import { fetchHousingAccessInfo } from 'services/residentLife/HousingAccess';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import { Outlet, Routes, Route } from 'react-router-dom';

import RDView from './components/RDView';
import RAView from './components/RAView';
import ResidentView from './components/ResidentView';
import StaffView from './components/StaffView';
import Page404 from '../Page404';
import RoomRanges from 'views/ResLife/components/RDView/components/RoomRanges';
import TaskList from 'views/ResLife/components/RDView/components/TaskList';
import RDOnCallForm from 'views/ResLife/components/RDView/components/RDOnCallForm';
import StatusManager from 'views/ResLife/components/RAView/components/StatusManager';

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
  const GetsRDView = isResLifeStaff || isRD || isHousingDeveloper;
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

  return (
    <Routes>
      {/* ResLife landing page determines the correct view to show */}
      <Route
        path="/"
        element={
          isHousingDeveloper ? (
            selectedView === 'rd' ? (
              <RDView />
            ) : selectedView === 'ra' ? (
              <RAView />
            ) : selectedView === 'res' ? (
              <ResidentView />
            ) : selectedView === 'staff' ? (
              <StaffView />
            ) : (
              <Page404 />
            )
          ) : GetsRDView ? (
            <RDView />
          ) : isRA ? (
            <RAView />
          ) : isStudent && HousingAccess ? (
            <ResidentView />
          ) : hasStandardAccess ? (
            <StaffView />
          ) : (
            <Page404 />
          )
        }
      />

      {/* Sub-pages remain separate */}
      <Route path="roomranges" element={GetsRDView ? <RoomRanges /> : <Page404 />} />
      <Route path="tasklist" element={GetsRDView ? <TaskList /> : <Page404 />} />
      <Route path="rd-oncall" element={GetsRDView ? <RDOnCallForm /> : <Page404 />} />
      <Route
        path="statusmanager"
        element={isRA | isHousingDeveloper ? <StatusManager /> : <Page404 />}
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Housing;
