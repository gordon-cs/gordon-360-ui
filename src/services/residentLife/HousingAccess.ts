import { getAuthGroups } from 'services/auth';
import http from '../http';

// Allowed groups for housing access
const ALLOWED_GROUPS = [
  '360-ResLifeStudentWorker-SG',
  '360-ResidentDirector',
  '360-HousingAdmin-SG',
  '360-HallInfoViewer-SG',
  //'360-Staff-SG',
];

const checkIfResidentialStudent = async (idNum: string): Promise<boolean> => {
  try {
    const response = await http.get<{ IsResidential: boolean }>(
      `Housing/student/is-residential/${idNum}`,
    );
    return response.IsResidential; // Extract the IsResidential property
  } catch (error) {
    console.error('Error checking residential status:', error);
    return false; // Default to false if an error occurs
  }
};

// Get user info and determine if access needed
export const fetchHousingAccessInfo = async (profile: { ID: string } | null) => {
  try {
    const groups = getAuthGroups(); //gets groups for user

    const isResidential = profile?.ID ? await checkIfResidentialStudent(profile.ID) : false; // default residential status to false

    // Check if user in any allowed groups or is residential
    const canAccessHousing =
      isResidential || groups.some((group) => ALLOWED_GROUPS.includes(group));

    return { canAccessHousing, isResidential, groups };
  } catch (error) {
    console.error('Error fetching housing access info:', error);
    return { canAccessHousing: false, isResidential: false, groups: [] }; // return info
  }
};
