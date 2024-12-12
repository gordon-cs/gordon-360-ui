import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';

import RDView from './components/RDView';
import RAView from './components/RAView';
import ResidentView from './components/ResidentView';
import StaffView from './components/StaffView';
import Page404 from '/src/views/Page404';

const Housing = () => {
  const isStudent = useAuthGroups(AuthGroup.Student);
  const isRA = useAuthGroups(AuthGroup.ResidentAdvisor);
  const isResLifeStaff = useAuthGroups(AuthGroup.HousingAdmin);
  const isRD = useAuthGroups(AuthGroup.ResidentDirector);
  const GetsRDView = isResLifeStaff || isRD;
  // need to call hooks separately then join into one variable
  const isPolice = useAuthGroups(AuthGroup.Police);
  const isHallInfoViewer = useAuthGroups(AuthGroup.HallInfoViewer);
  const hasStandardAccess = isPolice || isHallInfoViewer;
  const HousingDeveloper = useAuthGroups(AuthGroup.HousingDeveloper);

  if (HousingDeveloper) {
    const selectPage = prompt('Enter the view you want to access (RD, RA, Resident, Staff):');
    switch (selectPage?.toLowerCase()) {
      case 'rd':
        return <RDView />;
      case 'ra':
        return <RAView />;
      case 'resident':
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
  } else if (isStudent) {
    return <ResidentView />;
  } else if (hasStandardAccess) {
    return <StaffView />;
  } else {
    return <Page404 />; // user has no access to page
  }
};

export default Housing;
