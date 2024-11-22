import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';

import RDView from './components/RDView';
import RAView from './components/RAView';
import ResidentView from './components/ResidentView';
import StaffView from './components/StaffView';

const Housing = () => {
  const isFaculty = useAuthGroups(AuthGroup.Faculty);
  const isStudent = useAuthGroups(AuthGroup.Student);
  const isRA = useAuthGroups(AuthGroup.ResidentAdvisor);
  const isRD = useAuthGroups(AuthGroup.HousingAdmin);
  const isPolice = useAuthGroups(AuthGroup.Police);
  const isPlantStaff = useAuthGroups(AuthGroup.PLTStaff);
  const hasStandardAccess = isPolice || isPlantStaff;

  if (isFaculty) {
    return <RDView />;
  } else if (isStudent) {
    return <ResidentView />;
  } else if (isRA) {
    return <RAView />;
  } else if (hasStandardAccess) {
    return <StaffView />;
  } else {
    return null;
  }
};

export default Housing;
