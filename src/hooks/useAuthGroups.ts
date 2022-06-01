import { useIsAuthenticated } from '@azure/msal-react';
import { useMemo } from 'react';
import { AuthGroup, getAuthGroups } from 'services/auth';

function useAuthGroups(): AuthGroup[];
function useAuthGroups(group: AuthGroup): boolean;

function useAuthGroups(group?: AuthGroup): AuthGroup[] | boolean {
  const isAuthenticated = useIsAuthenticated();
  const groups = useMemo(getAuthGroups, [isAuthenticated]);

  return group ? groups.some((g) => g === group) : groups;
}

export default useAuthGroups;
