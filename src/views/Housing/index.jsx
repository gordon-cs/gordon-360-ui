import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';

import RDView from './components/RDView';
import RAView from './components/RAView';
import ResidentView from './components/ResidentView';
import StaffView from './components/StaffView';

const Housing = () => {
  const isStudent = useAuthGroups(AuthGroup.Student);
  const isRA = useAuthGroups(AuthGroup.ResidentAdvisor);
  const isResLifeStaff = useAuthGroups(AuthGroup.HousingAdmin);
  const GetsRDView = isResLifeStaff || isRD;
  const isRD = useAuthGroups(AuthGroup.ResidentDirector);
  // need to call hooks separately then join into one variable
  const isPolice = useAuthGroups(AuthGroup.Police);
  const isHallInfoViewer = useAuthGroups(AuthGroup.HallInfoViewer);
  const hasStandardAccess = isPolice || isHallInfoViewer;

  if (GetsRDView) {
    return <RDView />;
  } else if (isRA) {
    //need RA check first as RA's will also show as students
    return <RAView />;
  } else if (isStudent) {
    return <ResidentView />;
  } else if (hasStandardAccess) {
    return <StaffView />;
  } else {
    return null;
  }
};

export default Housing;
