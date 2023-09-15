import { InteractionRequiredAuthError, SilentRequest } from '@azure/msal-browser';
import { msalInstance } from 'components/Providers/components/AuthProvider';
import storage from './storage';

const apiRequest = {
  scopes: ['api://b19c300a-00dc-4adc-bcd1-b678b25d7ad1/access_as_user'],
};

const authenticate = () => msalInstance.loginRedirect(apiRequest);

const acquireAccessToken = async () => {
  const activeAccount = msalInstance.getActiveAccount();
  const accounts = msalInstance.getAllAccounts();

  const request: SilentRequest = {
    ...apiRequest,
  };

  if (activeAccount || accounts.length === 1) {
    // Acquire token for active or only available account
    request.account = activeAccount || accounts[0];
  } else if (accounts.length > 1) {
    /*
     * No active account, and multiple available accounts.
     * Ask user which account should be used.
     */
    request.prompt = 'select_account';
  } else {
    /*
     * No active account and list of accounts is empty.
     * User is not signed in. Throw error or wait for user to login.
     * Do not attempt to log a user in outside of the context of MsalProvider
     */
  }

  const authResult = await msalInstance.acquireTokenSilent(request).catch((error) => {
    if (error instanceof InteractionRequiredAuthError) {
      return msalInstance.acquireTokenRedirect(request);
    } else {
      throw error;
    }
  });

  return authResult?.accessToken;
};

/**
 * Check if current session is authenticated
 *
 * @description This is a naive check. The session is considered authenticated if
 * @returns Whether session is authenticated or not
 */
const isAuthenticated = () => {
  const account = msalInstance.getActiveAccount();

  return account !== null;
};

/**
 * Sign a user out
 *
 * @description Removes all data from storage and cache
 */
const signOut = async () => {
  await msalInstance.logoutPopup();

  // Checks to see if Cache API is available before attempting to access it
  if ('caches' in window) {
    // Checks to see if Service Worker is available since these values would not exist
    // if the service worker was unavailable
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage('cancel-fetches');
      storage.remove('status');
      storage.remove('currentTerm');
    }
  }
};

const getAuthGroups = (): AuthGroup[] => {
  const claims = msalInstance.getActiveAccount()?.idTokenClaims;

  if (claims && claims.hasOwnProperty('groups')) {
    return (claims as { groups: AuthGroup[] }).groups;
  } else {
    return [];
  }
};

const userIsInAuthGroup = (group: AuthGroup) => getAuthGroups().some((g) => g === group);

export enum AuthGroup {
  Alumni = '360-Alumni-SG',
  FacStaff = '360-FacStaff-SG',
  Faculty = '360-Faculty-SG',
  HousingAdmin = '360-HousingAdmin-SG',
  NewsAdmin = '360-NewsAdmin-SG',
  Police = '360-Police-SG',
  RecIMAdmin = '360-RecIMAdmin-SG',
  SensitiveInfoView = '360-SensitiveInfoView-SG',
  SiteAdmin = '360-SiteAdmin-SG',
  Staff = '360-Staff-SG',
  Student = '360-Student-SG',
  AcademicInfoView = '360-AcademicInfoView-SG',
}

export {
  isAuthenticated,
  acquireAccessToken as getToken,
  authenticate,
  signOut,
  getAuthGroups,
  userIsInAuthGroup,
};
