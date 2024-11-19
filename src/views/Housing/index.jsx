import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';

import RDView from './components/RDView';
import RAView from './components/RAView';
import ResidentView from './components/ResidentView';

const Housing = () => {
  const isFaculty = useAuthGroups(AuthGroup.Staff);
  const isStudent = useAuthGroups(AuthGroup.Student);
  const isRA = useAuthGroups(AuthGroup.ResidentAdvisor);
  const isRD = useAuthGroups(AuthGroup.HousingAdmin);

  if (isFaculty) {
    return <RDView />;
  } else if (isStudent) {
    return <ResidentView />;
  } else if (isRA) {
    return <RAView />;
  } else {
    return null;
  }
};

export default Housing;
