import {
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionRequiredAuthError,
  PublicClientApplication,
  SilentRequest,
} from '@azure/msal-browser';
import { msalInstance } from 'index';
import storage from './storage';

export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_AD_CLIENT,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_AD_TENANT}`,
    postLogoutRedirectUri: window.location.origin,
    redirectUri: window.location.origin,
    validateAuthority: true,
    // After being redirected to the "redirectUri" page, should user
    // be redirected back to the Url where their login originated from?
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

const apiRequest = {
  scopes: ['api://b19c300a-00dc-4adc-bcd1-b678b25d7ad1/access_as_user'],
};

export const configureMSAL = (msalInstance: PublicClientApplication) => {
  if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  // this will update account state if a user signs in from another tab or window
  msalInstance.enableAccountStorageEvents();

  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    } else if (event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS && event.payload) {
    }
  });

  return msalInstance;
};

const authenticate = async () => {
  const tokenResponse = await msalInstance.loginPopup(apiRequest);
  const accountResponse = tokenResponse.account;
  msalInstance.setActiveAccount(accountResponse);
};

const acquireAccessToken = async () => {
  const activeAccount = msalInstance.getActiveAccount();
  const accounts = msalInstance.getAllAccounts();

  if (!activeAccount && accounts.length === 0) {
    /*
     * User is not signed in. Throw error or wait for user to login.
     * Do not attempt to log a user in outside of the context of MsalProvider
     */
  }
  const request: SilentRequest = {
    ...apiRequest,
    account: activeAccount || accounts[0],
  };

  const authResult = await msalInstance.acquireTokenSilent(request).catch(async (error) => {
    if (error instanceof InteractionRequiredAuthError) {
      return await msalInstance.acquireTokenPopup(apiRequest);
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

  console.log(claims);

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
  SiteAdmin = '360-SiteAdmin-SG',
  Staff = '360-Staff-SG',
  Student = '360-Student-SG',
}

export {
  isAuthenticated,
  acquireAccessToken as getToken,
  authenticate,
  signOut,
  getAuthGroups,
  userIsInAuthGroup,
};
