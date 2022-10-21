import { useIsAuthenticated } from '@azure/msal-react';
import { useMemo } from 'react';
import { AuthGroup, getAuthGroups } from 'services/auth';

function useAuthGroups(): AuthGroup[];
function useAuthGroups(group: AuthGroup): boolean;
function useAuthGroups(...groups: AuthGroup[]): boolean[];

function useAuthGroups(
  group?: AuthGroup,
  ...otherGroups: AuthGroup[]
): AuthGroup[] | boolean | boolean[] {
  const isAuthenticated = useIsAuthenticated();
  const groups = useMemo(getAuthGroups, [isAuthenticated]);

  const groupsIncludes = (g: AuthGroup) => groups.some((authGroup) => g === authGroup);

  if (group && otherGroups.length > 0) {
    return [group, ...otherGroups].map(groupsIncludes);
  } else if (group) {
    return groupsIncludes(group);
  } else {
    return groups;
  }
}

export default useAuthGroups;
