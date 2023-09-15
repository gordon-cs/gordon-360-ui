import { MsalProvider } from '@azure/msal-react';
import {
  AuthenticationResult,
  Configuration,
  EventMessage,
  EventType,
  PublicClientApplication,
} from '@azure/msal-browser';

const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_AD_CLIENT as string,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_AD_TENANT}`,
    postLogoutRedirectUri: window.location.origin,
    redirectUri: window.location.origin,
    // After being redirected to the "redirectUri" page, should user
    // be redirected back to the Url where their login originated from?
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

// this will update account state if a user signs in from another tab or window
msalInstance.enableAccountStorageEvents();

// Update msalInstance when user logs in successfully
msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    msalInstance.setActiveAccount(account);
  }
});

const AuthProvider = ({ children }: { children: JSX.Element }) => (
  <MsalProvider instance={msalInstance}>{children}</MsalProvider>
);

export default AuthProvider;
